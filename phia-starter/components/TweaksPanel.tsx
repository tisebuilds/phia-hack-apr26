"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Caption } from "@/components/primitives/Caption";
import { ACCENTS } from "@/lib/accents";
import { STARTER_DATA } from "@/lib/data";
import type { Tweaks } from "@/lib/types";

export function TweaksPanel({
  tweaks,
  onChange,
}: {
  tweaks: Tweaks;
  onChange: (next: Tweaks) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const update = (k: keyof Tweaks, v: string | number) => {
    onChange({ ...tweaks, [k]: v });
  };

  const close = () => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.delete("tweaks");
    const q = sp.toString();
    router.replace(q ? `${pathname}?${q}` : pathname);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "max(16px, env(safe-area-inset-bottom))",
        right: "max(16px, env(safe-area-inset-right))",
        left: "auto",
        width: "min(300px, calc(100vw - 32px - env(safe-area-inset-left) - env(safe-area-inset-right)))",
        maxWidth: "calc(100vw - 32px)",
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        padding: 18,
        zIndex: 200,
        color: "#1a1a1a",
        fontFamily: "var(--font-sans), sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 20 }}>Tweaks</div>
        <button
          type="button"
          onClick={close}
          style={{
            background: "none",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
            color: "rgba(0,0,0,0.5)",
          }}
        >
          ×
        </button>
      </div>

      <Caption style={{ marginBottom: 6 }}>Budget · ${tweaks.budget}</Caption>
      <input
        type="range"
        min={200}
        max={1500}
        step={50}
        value={tweaks.budget}
        onChange={(e) => update("budget", +e.target.value)}
        style={{ width: "100%", accentColor: tweaks.accent, marginBottom: 14 }}
      />

      <Caption style={{ marginBottom: 6 }}>Vibe</Caption>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {STARTER_DATA.vibes.map((v) => (
          <button
            type="button"
            key={v.id}
            onClick={() => update("vibe", v.id)}
            style={{
              flex: 1,
              padding: "8px 4px",
              borderRadius: 8,
              border: `1px solid ${tweaks.vibe === v.id ? tweaks.accent : "rgba(0,0,0,0.12)"}`,
              background: tweaks.vibe === v.id ? tweaks.accent : "#fff",
              color: tweaks.vibe === v.id ? "#fff" : "#1a1a1a",
              fontSize: 11,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      <Caption style={{ marginBottom: 6 }}>Company</Caption>
      <select
        value={tweaks.company}
        onChange={(e) => update("company", e.target.value)}
        style={{
          width: "100%",
          padding: "8px 10px",
          borderRadius: 8,
          marginBottom: 14,
          border: "1px solid rgba(0,0,0,0.12)",
          fontSize: 12,
          fontFamily: "inherit",
        }}
      >
        {STARTER_DATA.companies.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <Caption style={{ marginBottom: 6 }}>Resale mix · {tweaks.resaleMix}%</Caption>
      <input
        type="range"
        min={0}
        max={100}
        step={10}
        value={tweaks.resaleMix}
        onChange={(e) => update("resaleMix", +e.target.value)}
        style={{ width: "100%", accentColor: tweaks.accent, marginBottom: 14 }}
      />

      <Caption style={{ marginBottom: 6 }}>Accent</Caption>
      <div style={{ display: "flex", gap: 6 }}>
        {Object.entries(ACCENTS).map(([name, hex]) => (
          <button
            type="button"
            key={name}
            title={name}
            onClick={() => update("accent", hex)}
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              background: hex,
              border: tweaks.accent === hex ? "2px solid #000" : "2px solid transparent",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
