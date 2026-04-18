import { STARTER_DATA } from "@/lib/data";
import type { Company, Item, Outfit, QuizCard, StarterMode, Vibe } from "@/lib/types";

export type ContextOption = { id: string; label: string; companyId: string };

/** Hero card on the Phia home screen (mode-specific). */
export type StarterHomeHero = {
  badge: string;
  headline: string;
  body: string;
  cta: string;
};

export type StarterPack = {
  id: StarterMode;
  /** Short name for settings */
  label: string;
  homeHero: StarterHomeHero;
  companies: Company[];
  contextOptions: ContextOption[];
  items: Item[];
  vibes: Vibe[];
  quiz: QuizCard[];
  outfits: Outfit[];
  contextStepTitle: string;
  contextDetailTitle: string;
  contextSourceLine: (company: Company) => string;
  seasonCaption: string;
  dateBudgetHeadline: { type: "split"; before: string; italic: string; after: string } | { type: "plain"; text: string };
  summaryTitleBefore: string;
  summaryTitleItalic: string;
  summaryTitleAfter: string;
  summaryBudgetBlurb: string;
  loadingLines: (company: Company) => readonly [string, string, string];
};

const WORK_CONTEXT_OPTIONS: ContextOption[] = [
  { id: "banking_finance", label: "Banking & finance", companyId: "goldman" },
  { id: "consulting", label: "Consulting", companyId: "mckinsey" },
  { id: "law", label: "Law", companyId: "law" },
  { id: "healthcare", label: "Healthcare", companyId: "healthcare" },
  { id: "tech", label: "Tech", companyId: "google" },
  { id: "marketing_pr", label: "Marketing & PR", companyId: "marketing_pr" },
  { id: "media", label: "Media & journalism", companyId: "media" },
  { id: "nonprofit_gov", label: "Nonprofit & government", companyId: "nonprofit_gov" },
  { id: "education", label: "Education", companyId: "education" },
  { id: "startups_creative", label: "Startups & creative", companyId: "startups_creative" },
];

const SHARED_VIBES = STARTER_DATA.vibes;
const SHARED_ITEMS = STARTER_DATA.items;

/** Same images as work quiz; different prompts per milestone. */
const CONCERT_QUIZ: QuizCard[] = [
  {
    q: "What energy are you chasing?",
    a: { label: "Plaster + oak", hint: "warm, grounded crowd", image: "/quiz/plaster-oak.png" },
    b: { label: "Steel + glass", hint: "strobes, clean lines", image: "/quiz/steel-glass.png" },
    c: { label: "Linen + stone", hint: "golden hour, open air", image: "/quiz/linen-stone.png" },
    d: { label: "Velvet + brass", hint: "late set, velvet rope", image: "/quiz/velvet-brass.png" },
  },
  {
    q: "How do you want to move?",
    a: { label: "Relaxed trouser", hint: "dance-floor friendly", image: "/quiz/relaxed-trouser.png" },
    b: { label: "Sharp tailoring", hint: "photo-ready lines", image: "/quiz/sharp-tailoring.png" },
    c: { label: "Column line", hint: "sleek, minimal", image: "/quiz/column-line.png" },
    d: { label: "Boxy layer", hint: "layers for temp swings", image: "/quiz/boxy-layer.png" },
  },
  {
    q: "Which finish fits the night?",
    a: { label: "Matte leather", hint: "hands-free, low fuss", image: "/quiz/matte-leather.png" },
    b: { label: "Polished gold", hint: "a little flash", image: "/quiz/polished-gold.png" },
    c: { label: "Brushed silver", hint: "cool, understated", image: "/quiz/brushed-silver.png" },
    d: { label: "Patina bronze", hint: "lived-in warmth", image: "/quiz/patina-bronze.png" },
  },
];

const CAMPUS_QUIZ: QuizCard[] = [
  {
    q: "Which campus day feels most like you?",
    a: { label: "Plaster + oak", hint: "library + coffee", image: "/quiz/plaster-oak.png" },
    b: { label: "Steel + glass", hint: "lab + hackathon", image: "/quiz/steel-glass.png" },
    c: { label: "Linen + stone", hint: "quad + seminar", image: "/quiz/linen-stone.png" },
    d: { label: "Velvet + brass", hint: "gallery opening", image: "/quiz/velvet-brass.png" },
  },
  {
    q: "How do you want to show up?",
    a: { label: "Relaxed trouser", hint: "easy cross-campus", image: "/quiz/relaxed-trouser.png" },
    b: { label: "Sharp tailoring", hint: "career fair ready", image: "/quiz/sharp-tailoring.png" },
    c: { label: "Column line", hint: "clean, minimal", image: "/quiz/column-line.png" },
    d: { label: "Boxy layer", hint: "lecture hall layers", image: "/quiz/boxy-layer.png" },
  },
  {
    q: "Pick a texture story",
    a: { label: "Matte leather", hint: "durable, unfussy", image: "/quiz/matte-leather.png" },
    b: { label: "Polished gold", hint: "a little polish", image: "/quiz/polished-gold.png" },
    c: { label: "Brushed silver", hint: "quiet shine", image: "/quiz/brushed-silver.png" },
    d: { label: "Patina bronze", hint: "soft, organic", image: "/quiz/patina-bronze.png" },
  },
];

const HALLOWEEN_QUIZ: QuizCard[] = [
  {
    q: "What’s the vibe of the night?",
    a: { label: "Plaster + oak", hint: "cozy, low-key", image: "/quiz/plaster-oak.png" },
    b: { label: "Steel + glass", hint: "sleek, futuristic", image: "/quiz/steel-glass.png" },
    c: { label: "Linen + stone", hint: "whimsical, soft", image: "/quiz/linen-stone.png" },
    d: { label: "Velvet + brass", hint: "dramatic, after-dark", image: "/quiz/velvet-brass.png" },
  },
  {
    q: "How bold do you want to go?",
    a: { label: "Relaxed trouser", hint: "subtle costume", image: "/quiz/relaxed-trouser.png" },
    b: { label: "Sharp tailoring", hint: "character silhouette", image: "/quiz/sharp-tailoring.png" },
    c: { label: "Column line", hint: "one statement piece", image: "/quiz/column-line.png" },
    d: { label: "Boxy layer", hint: "layered, playful", image: "/quiz/boxy-layer.png" },
  },
  {
    q: "Pick a finishing accent",
    a: { label: "Matte leather", hint: "grounded accessories", image: "/quiz/matte-leather.png" },
    b: { label: "Polished gold", hint: "spark when lights hit", image: "/quiz/polished-gold.png" },
    c: { label: "Brushed silver", hint: "cool-toned edge", image: "/quiz/brushed-silver.png" },
    d: { label: "Patina bronze", hint: "warm vintage", image: "/quiz/patina-bronze.png" },
  },
];

const PARTY_QUIZ: QuizCard[] = [
  {
    q: "What’s the room’s energy?",
    a: { label: "Plaster + oak", hint: "warm, convivial", image: "/quiz/plaster-oak.png" },
    b: { label: "Steel + glass", hint: "sleek corporate tower", image: "/quiz/steel-glass.png" },
    c: { label: "Linen + stone", hint: "relaxed but sharp", image: "/quiz/linen-stone.png" },
    d: { label: "Velvet + brass", hint: "statement holiday", image: "/quiz/velvet-brass.png" },
  },
  {
    q: "How do you want to read in photos?",
    a: { label: "Relaxed trouser", hint: "approachable polish", image: "/quiz/relaxed-trouser.png" },
    b: { label: "Sharp tailoring", hint: "corner-office crisp", image: "/quiz/sharp-tailoring.png" },
    c: { label: "Column line", hint: "minimal, confident", image: "/quiz/column-line.png" },
    d: { label: "Boxy layer", hint: "modern, easy", image: "/quiz/boxy-layer.png" },
  },
  {
    q: "Pick a finish for the night",
    a: { label: "Matte leather", hint: "unfussy, grounded", image: "/quiz/matte-leather.png" },
    b: { label: "Polished gold", hint: "festive, intentional", image: "/quiz/polished-gold.png" },
    c: { label: "Brushed silver", hint: "quiet shine", image: "/quiz/brushed-silver.png" },
    d: { label: "Patina bronze", hint: "warm, classic", image: "/quiz/patina-bronze.png" },
  },
];

const CONCERT_COMPANIES: Company[] = [
  {
    id: "arena_pop",
    name: "Arena pop",
    role: "20k seats · standing",
    vibe: "Comfort shoes, crossbody or belt bag, layer for AC blast. Phone/cash secure.",
    sourceEmployeeCount: 1840,
  },
  {
    id: "club_intimate",
    name: "Club night",
    role: "500 cap · tight floor",
    vibe: "Breathable layers, minimal coat-check drama, dark-friendly textures.",
    sourceEmployeeCount: 920,
  },
  {
    id: "festival_field",
    name: "Festival field",
    role: "All day · weather swing",
    vibe: "Sun + mud logic: boots or closed toe, hat, packable shell, refillable bottle.",
    sourceEmployeeCount: 2400,
  },
  {
    id: "theater_seated",
    name: "Theater / seated",
    role: "Assigned seats · dressier",
    vibe: "Elevated casual to cocktail—check the venue’s posted guidance.",
    sourceEmployeeCount: 640,
  },
];

const CONCERT_OPTIONS: ContextOption[] = CONCERT_COMPANIES.map((c) => ({
  id: c.id,
  label: c.name,
  companyId: c.id,
}));

const CAMPUS_COMPANIES: Company[] = [
  {
    id: "large_public",
    name: "Large public university",
    role: "Undergrad · big campus",
    vibe: "Walkable shoes, layers for lecture halls, career-center polish when it counts.",
    sourceEmployeeCount: 5200,
  },
  {
    id: "liberal_arts",
    name: "Liberal arts college",
    role: "Small classes · quad life",
    vibe: "Smart casual default; a little more expressive on arts campus days.",
    sourceEmployeeCount: 1100,
  },
  {
    id: "stem_heavy",
    name: "STEM-heavy school",
    role: "Labs + recruiting",
    vibe: "Closed-toe ready, minimal logos for interviews, hoodie-to-blazer pivot.",
    sourceEmployeeCount: 3100,
  },
  {
    id: "commuter",
    name: "Commuter campus",
    role: "Parking + long days",
    vibe: "Packable layers, comfortable carry, one polished set for on-campus interviews.",
    sourceEmployeeCount: 890,
  },
];

const CAMPUS_OPTIONS: ContextOption[] = CAMPUS_COMPANIES.map((c) => ({
  id: c.id,
  label: c.name,
  companyId: c.id,
}));

const HALLOWEEN_COMPANIES: Company[] = [
  {
    id: "halloween_office",
    name: "Office-safe",
    role: "Workplace / daytime",
    vibe: "No trip hazards, meeting-ready if you shed one layer—think clever not chaotic.",
    sourceEmployeeCount: 2100,
  },
  {
    id: "halloween_friends",
    name: "Friends party",
    role: "Evening · indoor",
    vibe: "Full character allowed; still photo + transit practical.",
    sourceEmployeeCount: 1600,
  },
  {
    id: "halloween_family",
    name: "Family / neighborhood",
    role: "Kids + sidewalks",
    vibe: "Visible in low light, weather-ready, pockets for keys and phone.",
    sourceEmployeeCount: 980,
  },
  {
    id: "halloween_night_out",
    name: "Night out",
    role: "Bars · late crowd",
    vibe: "Statement outer layer, comfortable shoes for lines and stairs.",
    sourceEmployeeCount: 740,
  },
];

const HALLOWEEN_OPTIONS: ContextOption[] = HALLOWEEN_COMPANIES.map((c) => ({
  id: c.id,
  label: c.name,
  companyId: c.id,
}));

const PARTY_COMPANIES: Company[] = [
  {
    id: "party_big4",
    name: "Big firm holiday party",
    role: "Hotel ballroom · partners present",
    vibe: "Conservative glam: nothing louder than the managing partner’s tie.",
    sourceEmployeeCount: 1320,
  },
  {
    id: "party_startup",
    name: "Startup holiday",
    role: "Loft or restaurant buyout",
    vibe: "Elevated casual—interesting jacket, clean sneakers usually fine.",
    sourceEmployeeCount: 480,
  },
  {
    id: "party_client",
    name: "Client-facing firm",
    role: "Industry dinner dress code",
    vibe: "Default one notch above invitation language; avoid risky novelty.",
    sourceEmployeeCount: 760,
  },
  {
    id: "party_hybrid",
    name: "Hybrid / optional in-office",
    role: "Some teams remote",
    vibe: "Photo-ready top half, comfortable bottom if you’re on camera-heavy teams.",
    sourceEmployeeCount: 540,
  },
];

const PARTY_OPTIONS: ContextOption[] = PARTY_COMPANIES.map((c) => ({
  id: c.id,
  label: c.name,
  companyId: c.id,
}));

const OUTFITS_CONCERT: Outfit[] = [
  { day: "Clean & low-key", note: "Neutral base, quiet luxury", items: [1, 3, 6, 2] },
  { day: "Statement polish", note: "Sharper silhouette", items: [1, 10, 6, 2, 9] },
  { day: "Movement-ready", note: "Dance-sturdy, hands-free", items: [7, 6, 5] },
  { day: "Weather-armored", note: "Outerwear-first stack", items: [4, 7, 11, 5] },
  { day: "Soft & casual", note: "Easy jersey energy", items: [8, 6, 5, 12] },
  { day: "Queue-proof", note: "Belt bag, pockets first", items: [10, 11, 5, 12] },
  { day: "Warm metallics", note: "Golden-hour shine", items: [3, 2, 10, 9] },
  { day: "Cool-toned edge", note: "Silver + black line", items: [4, 10, 11, 5] },
];

const OUTFITS_CAMPUS: Outfit[] = [
  { day: "First week", note: "Find your rhythm", items: [1, 3, 6, 2] },
  { day: "Career fair", note: "Polished", items: [1, 10, 6, 2, 9] },
  { day: "Lab day", note: "Practical", items: [7, 6, 5] },
  { day: "Presentation", note: "Sharp", items: [4, 7, 11, 5] },
  { day: "Club meeting", note: "Casual", items: [8, 6, 5, 12] },
  { day: "Guest lecture", note: "Put-together", items: [10, 11, 5, 12] },
  { day: "Weekend social", note: "Off-duty", items: [3, 2, 10, 9] },
  { day: "Rainy shuttle", note: "Layers", items: [4, 10, 11, 5] },
];

const OUTFITS_HALLOWEEN: Outfit[] = [
  { day: "Stealth cute", note: "Reads normal at a glance", items: [1, 3, 6, 2] },
  { day: "Main-character", note: "Full-commit photo energy", items: [1, 10, 6, 2, 9] },
  { day: "Cozy layer", note: "Peel-off warmth", items: [7, 6, 5] },
  { day: "Outdoor-practical", note: "Boots + coverage", items: [4, 7, 11, 5] },
  { day: "Soft chaos", note: "Playful, looser line", items: [8, 6, 5, 12] },
  { day: "Group-safe", note: "Coordinates, not matchy-matchy", items: [10, 11, 5, 12] },
  { day: "Low-effort fun", note: "Snack-run casual", items: [3, 2, 10, 9] },
  { day: "Walkable comfort", note: "Flat-shoe win", items: [4, 10, 11, 5] },
];

const OUTFITS_PARTY: Outfit[] = [
  { day: "Conservative polish", note: "Partner-floor safe", items: [1, 3, 6, 2] },
  { day: "Desk-to-dinner sharp", note: "One notch dressier", items: [1, 10, 6, 2, 9] },
  { day: "Dance-floor ease", note: "Room to move", items: [7, 6, 5] },
  { day: "Festive soft", note: "Looser, still office-adjacent", items: [4, 7, 11, 5] },
  { day: "Quiet flex", note: "Interesting jacket, easy bottom", items: [8, 6, 5, 12] },
  { day: "Team-photo aligned", note: "Same formality band", items: [10, 11, 5, 12] },
  { day: "Sharp opener", note: "Crisp first impression", items: [3, 2, 10, 9] },
  { day: "Layer-smart", note: "Coat-check friendly stack", items: [4, 10, 11, 5] },
];

const PACK_WORK: StarterPack = {
  id: "work",
  label: "Work start",
  homeHero: {
    badge: "2 mins",
    headline: "Stop guessing what to wear to work.",
    body: "A starter wardrobe that fits your actual job — built around your workplace, budget, and style.",
    cta: "Build my capsule",
  },
  companies: STARTER_DATA.companies,
  contextOptions: WORK_CONTEXT_OPTIONS,
  items: SHARED_ITEMS,
  vibes: SHARED_VIBES,
  quiz: STARTER_DATA.quiz,
  outfits: STARTER_DATA.outfits,
  contextStepTitle: "What industry are you in?",
  contextDetailTitle: "What we know about the dress code",
  contextSourceLine: (c) =>
    `Sourced from ${c.sourceEmployeeCount.toLocaleString("en-US")} current employees · updated weekly`,
  seasonCaption: "Season",
  dateBudgetHeadline: { type: "split", before: "When ", italic: "and", after: " how much?" },
  summaryTitleBefore: "Your ",
  summaryTitleItalic: "first 90 days",
  summaryTitleAfter: ", handled.",
  summaryBudgetBlurb:
    "Twenty outfits built to your {{budget}} budget. Every piece pairs with every other piece.",
  loadingLines: (c) =>
    [
      `Reading ${c.name}'s dress code`,
      "Finding the best resale matches",
      "Building your capsule",
    ] as const,
};

const PACK_CONCERT: StarterPack = {
  id: "concert",
  label: "Concert",
  homeHero: {
    badge: "2 mins",
    headline: "Dress for the room, not the feed.",
    body: "Pick your venue lane, then shape the vibe—budget-capped looks with resale where it steals the show. Variation comes from style choices, not the calendar.",
    cta: "Build my look",
  },
  companies: CONCERT_COMPANIES,
  contextOptions: CONCERT_OPTIONS,
  items: SHARED_ITEMS,
  vibes: SHARED_VIBES,
  quiz: CONCERT_QUIZ,
  outfits: OUTFITS_CONCERT,
  contextStepTitle: "What kind of show?",
  contextDetailTitle: "How this room reads on you",
  contextSourceLine: (c) =>
    `${c.sourceEmployeeCount.toLocaleString("en-US")} style paths from this venue type · vibe-first defaults`,
  seasonCaption: "Weather / layers",
  dateBudgetHeadline: { type: "plain", text: "Budget—and what’s it like outside?" },
  summaryTitleBefore: "Your ",
  summaryTitleItalic: "show-night system",
  summaryTitleAfter: ", locked.",
  summaryBudgetBlurb:
    "Eight style stacks under your {{budget}}—same capsule, different attitude (minimal, glam, edge, soft).",
  loadingLines: (c) =>
    [
      `Matching vibe to ${c.name}`,
      "Scouting resale for your style lane",
      "Locking one-night mix-and-match",
    ] as const,
};

const PACK_CAMPUS: StarterPack = {
  id: "campus",
  label: "School / campus",
  homeHero: {
    badge: "2 mins",
    headline: "First semester, first outfit system.",
    body: "A campus starter built around your school rhythm, budget, and style — mixable from syllabus week on.",
    cta: "Build my capsule",
  },
  companies: CAMPUS_COMPANIES,
  contextOptions: CAMPUS_OPTIONS,
  items: SHARED_ITEMS,
  vibes: SHARED_VIBES,
  quiz: CAMPUS_QUIZ,
  outfits: OUTFITS_CAMPUS,
  contextStepTitle: "What campus rhythm?",
  contextDetailTitle: "What we know about day-to-day dress",
  contextSourceLine: (c) =>
    `Synthesized from ${c.sourceEmployeeCount.toLocaleString("en-US")} student wardrobes · term refresh`,
  seasonCaption: "Term / climate",
  dateBudgetHeadline: { type: "plain", text: "Start term and budget?" },
  summaryTitleBefore: "Your ",
  summaryTitleItalic: "first semester",
  summaryTitleAfter: ", dialed in.",
  summaryBudgetBlurb:
    "Eight campus-ready stacks under your {{budget}} budget—repeatable, mixable, interview-ready when you need it.",
  loadingLines: (c) =>
    [
      `Mapping ${c.name} norms`,
      "Balancing resale with one retail anchor",
      "Building your campus capsule",
    ] as const,
};

const PACK_HALLOWEEN: StarterPack = {
  id: "halloween",
  label: "Halloween",
  homeHero: {
    badge: "2 mins",
    headline: "Costume energy, real-world practical.",
    body: "Office, friends, family, or night out—your lane sets the guardrails; the quiz and resale mix dial the look. Style drives the variation, not the clock.",
    cta: "Build my look",
  },
  companies: HALLOWEEN_COMPANIES,
  contextOptions: HALLOWEEN_OPTIONS,
  items: SHARED_ITEMS,
  vibes: SHARED_VIBES,
  quiz: HALLOWEEN_QUIZ,
  outfits: OUTFITS_HALLOWEEN,
  contextStepTitle: "What kind of Halloween?",
  contextDetailTitle: "What we optimize for in this lane",
  contextSourceLine: (c) =>
    `${c.sourceEmployeeCount.toLocaleString("en-US")} style presets · safety + comfort first`,
  seasonCaption: "Weather / layers",
  dateBudgetHeadline: { type: "plain", text: "Budget—and how bold is the look?" },
  summaryTitleBefore: "Your ",
  summaryTitleItalic: "Halloween look",
  summaryTitleAfter: ", sorted.",
  summaryBudgetBlurb:
    "Eight style stacks under your {{budget}}—stealth cute to main-character, same pieces remixed.",
  loadingLines: (c) =>
    [
      `Styling for ${c.name}`,
      "Finding resale-friendly statement pieces",
      "Assembling your one-night kit",
    ] as const,
};

const PACK_WORK_PARTY: StarterPack = {
  id: "workParty",
  label: "Work holiday party",
  homeHero: {
    badge: "2 mins",
    headline: "The office party without the panic buy.",
    body: "Big firm, startup, client-facing, or hybrid—pick the vibe first. Budget and how dressy you want to read do the rest; no invite-time required.",
    cta: "Build my outfit",
  },
  companies: PARTY_COMPANIES,
  contextOptions: PARTY_OPTIONS,
  items: SHARED_ITEMS,
  vibes: SHARED_VIBES,
  quiz: PARTY_QUIZ,
  outfits: OUTFITS_PARTY,
  contextStepTitle: "Which office vibe?",
  contextDetailTitle: "How this room reads for your style",
  contextSourceLine: (c) =>
    `${c.sourceEmployeeCount.toLocaleString("en-US")} dress-risk profiles · style-first norms`,
  seasonCaption: "Indoor heat / layers",
  dateBudgetHeadline: { type: "plain", text: "Outfit budget—and how dressy is the room?" },
  summaryTitleBefore: "Your ",
  summaryTitleItalic: "holiday polish",
  summaryTitleAfter: ", nailed.",
  summaryBudgetBlurb:
    "Eight dress-code stacks under your {{budget}}—conservative polish to festive soft, same capsule rotated by style.",
  loadingLines: (c) =>
    [
      `Dialing dress code for ${c.name}`,
      "Balancing resale sparkle with safe staples",
      "Finishing your one-night party system",
    ] as const,
};

const PACKS: Record<StarterMode, StarterPack> = {
  work: PACK_WORK,
  concert: PACK_CONCERT,
  campus: PACK_CAMPUS,
  halloween: PACK_HALLOWEEN,
  workParty: PACK_WORK_PARTY,
};

export const STARTER_PACK_LIST: readonly { id: StarterMode; label: string }[] = [
  { id: "work", label: PACK_WORK.label },
  { id: "concert", label: PACK_CONCERT.label },
  { id: "campus", label: PACK_CAMPUS.label },
  { id: "halloween", label: PACK_HALLOWEEN.label },
  { id: "workParty", label: PACK_WORK_PARTY.label },
];

export function getStarterPack(mode: StarterMode): StarterPack {
  return PACKS[mode];
}

export function isStarterMode(v: unknown): v is StarterMode {
  return typeof v === "string" && (STARTER_PACK_LIST as readonly { id: StarterMode }[]).some((p) => p.id === v);
}

/** If current company id is missing from pack, return default id. */
export function coerceCompanyIdForMode(mode: StarterMode, companyId: string): string {
  const pack = getStarterPack(mode);
  if (pack.companies.some((c) => c.id === companyId)) return companyId;
  return pack.companies[0]!.id;
}

export function fillBudgetBlurbTemplate(template: string, budget: number): string {
  return template.replace(/\{\{budget\}\}/g, String(budget));
}
