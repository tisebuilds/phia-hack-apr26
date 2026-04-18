import { DEFAULT_TWEAKS } from "./defaultTweaks";
import { coerceCompanyIdForMode, isStarterMode } from "./packs";
import type { PersistedStateV1, QuizAnswers, ScreenId, Season, StarterMode, Tweaks } from "./types";
import { SEASONS } from "./types";

export const STORAGE_KEY = "phia-starter-state-v1";

function normalizeQuiz(raw: Record<string, unknown>): QuizAnswers {
  const out: QuizAnswers = {};
  Object.entries(raw).forEach(([k, v]) => {
    if (v === "a" || v === "b" || v === "c" || v === "d") out[Number(k)] = v;
  });
  return out;
}

function isSeason(v: unknown): v is Season {
  return typeof v === "string" && (SEASONS as readonly string[]).includes(v);
}

function isScreenId(v: unknown): v is ScreenId {
  return (
    v === "home" ||
    v === "company" ||
    v === "datebudget" ||
    v === "quiz" ||
    v === "loading" ||
    v === "item" ||
    v === "summary"
  );
}

function normalizePersistedScreen(raw: unknown): ScreenId | null {
  if (raw === "capsule" || raw === "outfits") return "summary";
  if (isScreenId(raw)) return raw;
  return null;
}

export function createDefaultPersistedState(): PersistedStateV1 {
  return {
    version: 1,
    starterMode: "work",
    screen: "home",
    season: "spring",
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
    date?: number;
  };

  const starterMode: StarterMode = isStarterMode(p.starterMode) ? p.starterMode : initial.starterMode;

  const tweaks: Tweaks = {
    ...DEFAULT_TWEAKS,
    ...(p.tweaks ?? {}),
  };

  if (typeof p.budget === "number") tweaks.budget = p.budget;
  if (typeof p.companyId === "string") tweaks.company = p.companyId;

  tweaks.company = coerceCompanyIdForMode(starterMode, tweaks.company);

  const screen = normalizePersistedScreen(p.screen) ?? initial.screen;

  return {
    version: 1,
    starterMode,
    screen,
    season: isSeason(p.season)
      ? p.season
      : typeof p.date === "number"
        ? "spring"
        : initial.season,
    quiz: normalizeQuiz((p.quiz ?? {}) as Record<string, unknown>),
    tweaks,
    selectedItemId:
      typeof p.selectedItemId === "number" || p.selectedItemId === null
        ? (p.selectedItemId as number | null)
        : initial.selectedItemId,
  };
}
