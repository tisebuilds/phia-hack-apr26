export type Company = {
  id: string;
  name: string;
  role: string;
  vibe: string;
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

export type QuizCard = {
  q: string;
  a: { label: string; hint: string };
  b: { label: string; hint: string };
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
  | "capsule"
  | "item"
  | "outfits"
  | "summary";

export type FlowId = "A" | "B";

export type QuizAnswers = Record<number, "a" | "b">;

export type PersistedStateV1 = {
  version: 1;
  screen: ScreenId;
  flow: FlowId;
  date: number;
  quiz: QuizAnswers;
  tweaks: Tweaks;
  selectedItemId: number | null;
};
