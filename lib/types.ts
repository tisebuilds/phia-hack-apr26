export type Company = {
  id: string;
  name: string;
  role: string;
  vibe: string;
  /** Shown on company pick card: "Sourced from N current employees …" */
  sourceEmployeeCount: number;
};

export type Item = {
  id: number;
  brand: string;
  name: string;
  category: string;
  retail: number;
  price: number;
  resale: boolean;
  source: string;
  condition?: string;
  tone: string;
};

export type Outfit = {
  day: string;
  note: string;
  items: number[];
};

export type Vibe = {
  id: string;
  label: string;
  note: string;
};

export type QuizChoice = {
  label: string;
  hint: string;
  /** Path under `public/`, e.g. `/quiz/matte-leather.png` */
  image?: string;
};

export type QuizCard = {
  q: string;
  a: QuizChoice;
  b: QuizChoice;
  c: QuizChoice;
  d: QuizChoice;
};

export type StarterData = {
  companies: Company[];
  items: Item[];
  outfits: Outfit[];
  vibes: Vibe[];
  quiz: QuizCard[];
};

export type Tweaks = {
  budget: number;
  vibe: string;
  company: string;
  resaleMix: number;
  accent: string;
};

export type ScreenId =
  | "home"
  | "company"
  | "datebudget"
  | "quiz"
  | "loading"
  | "item"
  | "summary";

export type QuizAnswers = Record<number, "a" | "b" | "c" | "d">;

export const SEASONS = ["spring", "summer", "fall", "winter"] as const;
export type Season = (typeof SEASONS)[number];

export const STARTER_MODES = ["work", "concert", "campus", "halloween", "workParty"] as const;
export type StarterMode = (typeof STARTER_MODES)[number];

export type PersistedStateV1 = {
  version: 1;
  starterMode: StarterMode;
  /** User picked what they're prepping for on home; unlocks hero + flow. */
  homeMilestoneChosen: boolean;
  screen: ScreenId;
  season: Season;
  quiz: QuizAnswers;
  tweaks: Tweaks;
  selectedItemId: number | null;
};
