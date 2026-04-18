"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { LabSheet } from "@/components/LabSheet";
import { TweaksPanel } from "@/components/TweaksPanel";
import { CompanyScreen } from "@/components/screens/CompanyScreen";
import { DateBudgetScreen } from "@/components/screens/DateBudgetScreen";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { ItemDetailScreen } from "@/components/screens/ItemDetailScreen";
import { LoadingScreen } from "@/components/screens/LoadingScreen";
import { QuizScreen } from "@/components/screens/QuizScreen";
import { SummaryScreen } from "@/components/screens/SummaryScreen";
import { deriveCapsule } from "@/lib/capsule";
import { createDefaultPersistedState, mergePersistedState, STORAGE_KEY } from "@/lib/persistedDefaults";
import { coerceCompanyIdForMode, fillBudgetBlurbTemplate, getStarterPack } from "@/lib/packs";
import { PITCH_NOTES } from "@/lib/pitchNotes";
import { usePersistedState } from "@/lib/usePersistedState";
import type { Company, PersistedStateV1, ScreenId, Season, StarterMode, Tweaks } from "@/lib/types";

export function Prototype() {
  const searchParams = useSearchParams();
  const showTweaks = searchParams.get("tweaks") === "1";
  const showDevNav = searchParams.get("dev") === "1";
  const showPitch = searchParams.get("pitch") === "1";
  const [labOpen, setLabOpen] = useState(false);

  const defaultSnap = useMemo(() => createDefaultPersistedState(), []);
  const [snap, setSnap, { hydrated }] = usePersistedState<PersistedStateV1>(STORAGE_KEY, defaultSnap, {
    merge: mergePersistedState,
  });

  const pack = useMemo(() => getStarterPack(snap.starterMode), [snap.starterMode]);

  const company = useMemo(() => {
    return pack.companies.find((c) => c.id === snap.tweaks.company) ?? pack.companies[0]!;
  }, [pack.companies, snap.tweaks.company]);

  const items = useMemo(
    () => deriveCapsule(pack.items, snap.tweaks.budget, snap.tweaks.resaleMix, snap.tweaks.vibe),
    [pack.items, snap.tweaks.budget, snap.tweaks.resaleMix, snap.tweaks.vibe],
  );

  const loadingLines = useMemo(() => pack.loadingLines(company), [pack, company]);

  const summaryBudgetBlurb = useMemo(
    () => fillBudgetBlurbTemplate(pack.summaryBudgetBlurb, snap.tweaks.budget),
    [pack.summaryBudgetBlurb, snap.tweaks.budget],
  );

  const resolvedItem = useMemo(() => {
    if (!snap.selectedItemId) return items[0];
    return items.find((i) => i.id === snap.selectedItemId) ?? items[0];
  }, [items, snap.selectedItemId]);

  const itemDetailIndex = useMemo(() => {
    const idx = items.findIndex((i) => i.id === resolvedItem.id);
    return idx >= 0 ? idx + 1 : 1;
  }, [items, resolvedItem.id]);

  const similarItems = useMemo(
    () => items.filter((i) => i.id !== resolvedItem.id).slice(0, 5),
    [items, resolvedItem.id],
  );

  const accent = snap.tweaks.accent;

  const go = useCallback(
    (s: ScreenId) => {
      setSnap((prev) => ({ ...prev, screen: s }));
    },
    [setSnap],
  );

  const setTweaks = useCallback(
    (next: Tweaks | ((prev: Tweaks) => Tweaks)) => {
      setSnap((prev) => ({
        ...prev,
        tweaks: typeof next === "function" ? (next as (p: Tweaks) => Tweaks)(prev.tweaks) : next,
      }));
    },
    [setSnap],
  );

  const setCompanyFromPicker = useCallback(
    (c: Company) => {
      setSnap((prev) => ({
        ...prev,
        tweaks: { ...prev.tweaks, company: c.id },
      }));
    },
    [setSnap],
  );

  const setBudget = useCallback(
    (v: number) => {
      setSnap((prev) => ({
        ...prev,
        tweaks: { ...prev.tweaks, budget: v },
      }));
    },
    [setSnap],
  );

  const onLoadingDone = useCallback(() => {
    setSnap((prev) => ({ ...prev, screen: "summary" }));
  }, [setSnap]);

  const labContextLine = useMemo(
    () => `${pack.label} · ${company.name} · $${snap.tweaks.budget}`,
    [pack.label, company.name, snap.tweaks.budget],
  );

  const setStarterMode = useCallback(
    (mode: StarterMode) => {
      setSnap((prev) => ({
        ...prev,
        starterMode: mode,
        tweaks: { ...prev.tweaks, company: coerceCompanyIdForMode(mode, prev.tweaks.company) },
        quiz: {},
      }));
    },
    [setSnap],
  );

  const pickHomeMilestone = useCallback((mode: StarterMode) => {
    setSnap((prev) => ({
      ...prev,
      starterMode: mode,
      homeMilestoneChosen: true,
      tweaks: { ...prev.tweaks, company: coerceCompanyIdForMode(mode, prev.tweaks.company) },
      quiz: {},
    }));
  }, [setSnap]);

  const goFromLab = useCallback(
    (s: ScreenId) => {
      go(s);
      setLabOpen(false);
    },
    [go],
  );

  const restartDemo = useCallback(() => {
    setSnap(createDefaultPersistedState());
  }, [setSnap]);

  const renderScreen = () => {
    switch (snap.screen) {
      case "home":
        return (
          <HomeScreen
            accent={accent}
            homeHero={pack.homeHero}
            homeMilestoneChosen={snap.homeMilestoneChosen}
            onPickMilestone={pickHomeMilestone}
            onOpen={() => go("company")}
          />
        );
      case "company":
        return (
          <CompanyScreen
            accent={accent}
            value={company}
            setValue={setCompanyFromPicker}
            companies={pack.companies}
            contextOptions={pack.contextOptions}
            contextStepTitle={pack.contextStepTitle}
            contextDetailTitle={pack.contextDetailTitle}
            contextSourceLine={pack.contextSourceLine}
            onBack={() => go("home")}
            onNext={() => go("datebudget")}
          />
        );
      case "datebudget":
        return (
          <DateBudgetScreen
            accent={accent}
            season={snap.season}
            setSeason={(s: Season) => setSnap((p) => ({ ...p, season: s }))}
            budget={snap.tweaks.budget}
            setBudget={setBudget}
            seasonCaption={pack.seasonCaption}
            dateBudgetHeadline={pack.dateBudgetHeadline}
            onBack={() => go("company")}
            onNext={() => go("quiz")}
          />
        );
      case "quiz":
        return (
          <QuizScreen
            accent={accent}
            quiz={pack.quiz}
            answers={snap.quiz}
            setAnswers={(quizNext) => setSnap((p) => ({ ...p, quiz: quizNext }))}
            onBack={() => go("datebudget")}
            onNext={() => go("loading")}
          />
        );
      case "loading":
        return <LoadingScreen accent={accent} lines={loadingLines} onDone={onLoadingDone} />;
      case "item":
        return (
          <ItemDetailScreen
            accent={accent}
            item={resolvedItem}
            itemIndex={itemDetailIndex}
            similarItems={similarItems}
            onBack={() => go("summary")}
          />
        );
      case "summary":
        return (
          <SummaryScreen
            accent={accent}
            items={items}
            outfits={pack.outfits}
            summaryTitleBefore={pack.summaryTitleBefore}
            summaryTitleItalic={pack.summaryTitleItalic}
            summaryTitleAfter={pack.summaryTitleAfter}
            summaryBudgetBlurb={summaryBudgetBlurb}
            onBack={() => go("quiz")}
            onItem={(it) => {
              setSnap((p) => ({ ...p, selectedItemId: it.id, screen: "item" }));
            }}
          />
        );
      default:
        return null;
    }
  };

  const pitchNote = PITCH_NOTES[snap.screen];

  return (
    <div
      style={{
        minHeight: "100svh",
        height: "100svh",
        maxHeight: "100svh",
        background: "#0e0e10",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        overflow: "hidden",
        paddingTop: "max(12px, env(safe-area-inset-top))",
        paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        paddingLeft: "max(16px, env(safe-area-inset-left))",
        paddingRight: "max(16px, env(safe-area-inset-right))",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: 12,
          marginBottom: 10,
          color: "rgba(255,255,255,0.8)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", minWidth: 0 }}>
          <span
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: -0.2,
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.25,
            }}
          >
            Tise&apos;s Design-a-thon Submission
          </span>
        </div>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={labOpen}
          aria-controls={labOpen ? "settings-sheet-panel" : undefined}
          onClick={() => setLabOpen(true)}
          style={{
            flexShrink: 0,
            padding: "6px 12px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.82)",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 0.4,
            cursor: "pointer",
          }}
        >
          Settings
        </button>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          width: "100%",
          maxWidth: 480,
          margin: "6px auto 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "#F5F5F5",
            borderRadius: 0,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          {!hydrated ? (
            <div style={{ background: "#F5F5F5", flex: 1, minHeight: 0 }} />
          ) : (
            renderScreen()
          )}
        </div>
      </div>

      {showPitch ? (
        <div
          style={{
            position: "fixed",
            bottom: "max(18px, env(safe-area-inset-bottom))",
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: 560,
            width: "min(560px, calc(100vw - 32px))",
            padding: "10px 14px",
            borderRadius: 12,
            background: "rgba(0,0,0,0.35)",
            color: "rgba(255,255,255,0.78)",
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: 12,
            lineHeight: 1.45,
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 150,
          }}
        >
          {pitchNote}
        </div>
      ) : null}

      {showTweaks ? (
        <TweaksPanel starterMode={snap.starterMode} tweaks={snap.tweaks} onChange={setTweaks} />
      ) : null}

      <LabSheet
        open={labOpen}
        onClose={() => setLabOpen(false)}
        contextLine={labContextLine}
        starterMode={snap.starterMode}
        onStarterModeChange={setStarterMode}
        showDevNav={showDevNav}
        screen={snap.screen}
        onGoScreen={goFromLab}
        onRestartDemo={restartDemo}
      />
    </div>
  );
}
