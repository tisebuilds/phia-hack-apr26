"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { LabSheet } from "@/components/LabSheet";
import { TweaksPanel } from "@/components/TweaksPanel";
import { CapsuleScreenA } from "@/components/screens/CapsuleScreenA";
import { CapsuleScreenB } from "@/components/screens/CapsuleScreenB";
import { CompanyScreen } from "@/components/screens/CompanyScreen";
import { DateBudgetScreen } from "@/components/screens/DateBudgetScreen";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { ItemDetailScreen } from "@/components/screens/ItemDetailScreen";
import { LoadingScreen } from "@/components/screens/LoadingScreen";
import { OutfitMatrixScreen } from "@/components/screens/OutfitMatrixScreen";
import { QuizScreen } from "@/components/screens/QuizScreen";
import { SummaryScreen } from "@/components/screens/SummaryScreen";
import { deriveCapsule } from "@/lib/capsule";
import { STARTER_DATA } from "@/lib/data";
import { createDefaultPersistedState, mergePersistedState, STORAGE_KEY } from "@/lib/persistedDefaults";
import { PITCH_NOTES } from "@/lib/pitchNotes";
import { usePersistedState } from "@/lib/usePersistedState";
import type { Company, PersistedStateV1, ScreenId, Tweaks } from "@/lib/types";

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

  const company = useMemo(() => {
    return STARTER_DATA.companies.find((c) => c.id === snap.tweaks.company) ?? STARTER_DATA.companies[0];
  }, [snap.tweaks.company]);

  const items = useMemo(
    () => deriveCapsule(STARTER_DATA.items, snap.tweaks.budget, snap.tweaks.resaleMix, snap.tweaks.vibe),
    [snap.tweaks.budget, snap.tweaks.resaleMix, snap.tweaks.vibe],
  );

  const resolvedItem = useMemo(() => {
    if (!snap.selectedItemId) return items[0];
    return items.find((i) => i.id === snap.selectedItemId) ?? items[0];
  }, [items, snap.selectedItemId]);

  const itemDetailIndex = useMemo(() => {
    const idx = items.findIndex((i) => i.id === resolvedItem.id);
    return idx >= 0 ? idx + 1 : 1;
  }, [items, resolvedItem.id]);

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

  const setBudgetFromDate = useCallback(
    (v: number) => {
      setSnap((prev) => ({
        ...prev,
        tweaks: { ...prev.tweaks, budget: v },
      }));
    },
    [setSnap],
  );

  const onLoadingDone = useCallback(() => {
    setSnap((prev) => ({ ...prev, screen: "capsule" }));
  }, [setSnap]);

  const labContextLine = useMemo(
    () => `Sarah · ${company?.name} · $${snap.tweaks.budget}`,
    [company?.name, snap.tweaks.budget],
  );

  const goFromLab = useCallback(
    (s: ScreenId) => {
      go(s);
      setLabOpen(false);
    },
    [go],
  );

  const renderScreen = () => {
    switch (snap.screen) {
      case "home":
        return <HomeScreen accent={accent} onOpen={() => go("company")} />;
      case "company":
        return (
          <CompanyScreen
            accent={accent}
            value={company}
            setValue={setCompanyFromPicker}
            onBack={() => go("home")}
            onNext={() => go("datebudget")}
          />
        );
      case "datebudget":
        return (
          <DateBudgetScreen
            accent={accent}
            date={snap.date}
            setDate={(d) => setSnap((p) => ({ ...p, date: d }))}
            budget={snap.tweaks.budget}
            setBudget={setBudgetFromDate}
            onBack={() => go("company")}
            onNext={() => go("quiz")}
          />
        );
      case "quiz":
        return (
          <QuizScreen
            accent={accent}
            answers={snap.quiz}
            setAnswers={(quizNext) => setSnap((p) => ({ ...p, quiz: quizNext }))}
            onBack={() => go("datebudget")}
            onNext={() => go("loading")}
          />
        );
      case "loading":
        return <LoadingScreen accent={accent} company={company} onDone={onLoadingDone} />;
      case "capsule":
        return snap.flow === "A" ? (
          <CapsuleScreenA
            accent={accent}
            items={items}
            company={company}
            budget={snap.tweaks.budget}
            onItem={(it) => {
              setSnap((p) => ({ ...p, selectedItemId: it.id, screen: "item" }));
            }}
            onOutfits={() => go("outfits")}
            onSummary={() => go("summary")}
          />
        ) : (
          <CapsuleScreenB
            accent={accent}
            items={items}
            company={company}
            budget={snap.tweaks.budget}
            onItem={(it) => {
              setSnap((p) => ({ ...p, selectedItemId: it.id, screen: "item" }));
            }}
            onOutfits={() => go("outfits")}
            onSummary={() => go("summary")}
          />
        );
      case "item":
        return (
          <ItemDetailScreen
            accent={accent}
            item={resolvedItem}
            itemIndex={itemDetailIndex}
            onBack={() => go("capsule")}
          />
        );
      case "outfits":
        return (
          <OutfitMatrixScreen
            accent={accent}
            items={items}
            onBack={() => go("capsule")}
            onSummary={() => go("summary")}
          />
        );
      case "summary":
        return (
          <SummaryScreen
            accent={accent}
            items={items}
            company={company}
            budget={snap.tweaks.budget}
            onBack={() => go("outfits")}
            onRestart={() => go("home")}
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
        minHeight: "100dvh",
        background: "#0e0e10",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
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
          <span style={{ fontFamily: "var(--font-serif), serif", fontSize: 22, fontStyle: "italic" }}>phia</span>
          <span
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: 10,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 500,
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Starter · Prototype
          </span>
        </div>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={labOpen}
          aria-controls={labOpen ? "lab-sheet-panel" : undefined}
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
          Lab
        </button>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          width: "100%",
          maxWidth: 480,
          margin: "10px auto 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            overscrollBehaviorY: "contain",
            background: "#fafaf7",
            borderRadius: 0,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          {!hydrated ? <div style={{ background: "#fafaf7", minHeight: "70dvh" }} /> : renderScreen()}
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

      {showTweaks ? <TweaksPanel tweaks={snap.tweaks} onChange={setTweaks} /> : null}

      <LabSheet
        open={labOpen}
        onClose={() => setLabOpen(false)}
        accent={accent}
        flow={snap.flow}
        onFlowChange={(f) => setSnap((prev) => ({ ...prev, flow: f }))}
        contextLine={labContextLine}
        showDevNav={showDevNav}
        screen={snap.screen}
        onGoScreen={goFromLab}
      />
    </div>
  );
}
