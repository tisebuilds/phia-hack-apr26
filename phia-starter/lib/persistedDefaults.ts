import { DEFAULT_TWEAKS } from "./defaultTweaks";
import type { PersistedStateV1, QuizAnswers, ScreenId, Tweaks } from "./types";

export const STORAGE_KEY = "phia-starter-state-v1";

function normalizeQuiz(raw: Record<string, unknown>): QuizAnswers {
  const out: QuizAnswers = {};
  Object.entries(raw).forEach(([k, v]) => {
    if (v === "a" || v === "b") out[Number(k)] = v;
  });
  return out;
}

function isScreenId(v: unknown): v is ScreenId {
  return (
    v === "home" ||
    v === "company" ||
    v === "datebudget" ||
    v === "quiz" ||
    v === "loading" ||
    v === "capsule" ||
    v === "item" ||
    v === "outfits" ||
    v === "summary"
  );
}

export function createDefaultPersistedState(): PersistedStateV1 {
  return {
    version: 1,
    screen: "home",
    flow: "A",
    date: 18,
    quiz: {},
    tweaks: DEFAULT_TWEAKS,
    selectedItemId: null,
  };
}

export function mergePersistedState(parsed: unknown, initial: PersistedStateV1): PersistedStateV1 {
  if (!parsed || typeof parsed !== "object") return initial;
  const p = parsed as Partial<PersistedStateV1> & {
    budget?: number;
    companyId?: string;
  };

  const tweaks: Tweaks = {
    ...DEFAULT_TWEAKS,
    ...(p.tweaks ?? {}),
  };

  if (typeof p.budget === "number") tweaks.budget = p.budget;
  if (typeof p.companyId === "string") tweaks.company = p.companyId;

  return {
    version: 1,
    screen: isScreenId(p.screen) ? p.screen : initial.screen,
    flow: p.flow === "A" || p.flow === "B" ? p.flow : initial.flow,
    date: typeof p.date === "number" ? p.date : initial.date,
    quiz: normalizeQuiz((p.quiz ?? {}) as Record<string, unknown>),
    tweaks,
    selectedItemId:
      typeof p.selectedItemId === "number" || p.selectedItemId === null
        ? (p.selectedItemId as number | null)
        : initial.selectedItemId,
  };
}
