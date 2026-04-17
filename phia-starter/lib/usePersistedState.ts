"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Setter<T> = (value: T | ((prev: T) => T)) => void;

type Options<T> = {
  merge?: (parsed: unknown, initial: T) => T;
};

/**
 * Mirrors state into localStorage after hydration. First client render uses `initial`
 * to avoid SSR/client mismatches. Optional `merge` can coerce partial legacy blobs.
 */
export function usePersistedState<T>(key: string, initial: T, options?: Options<T>): [T, Setter<T>, { hydrated: boolean }] {
  const merge = options?.merge;
  const initialRef = useRef(initial);
  initialRef.current = initial;

  const [hydrated, setHydrated] = useState(false);
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        setHydrated(true);
        return;
      }
      const parsed: unknown = JSON.parse(raw);
      const base = initialRef.current;
      setValue(merge ? merge(parsed, base) : (parsed as T));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, [key, merge]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota / private mode
    }
  }, [hydrated, key, value]);

  const set: Setter<T> = useCallback((next) => {
    setValue((prev) => (typeof next === "function" ? (next as (p: T) => T)(prev) : next));
  }, []);

  return useMemo(() => [value, set, { hydrated }] as const, [value, set, hydrated]);
}
