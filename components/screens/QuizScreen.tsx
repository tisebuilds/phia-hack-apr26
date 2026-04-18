"use client";

import { useState } from "react";
import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProgressDots } from "@/components/primitives/ProgressDots";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
import { STARTER_DATA } from "@/lib/data";
import type { QuizAnswers } from "@/lib/types";

export function QuizScreen({
  accent,
  answers,
  setAnswers,
  onBack,
  onNext,
}: {
  accent: string;
  answers: QuizAnswers;
  setAnswers: (a: QuizAnswers) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const Q = STARTER_DATA.quiz;
  const done = Object.keys(answers).length === Q.length;
  const [qi, setQi] = useState(0);
  const q = Q[qi];
  const answeredHere = answers[qi] !== undefined;

  const Card = ({
    side,
    data,
    chosen,
  }: {
    side: "a" | "b";
    data: (typeof Q)[0]["a"];
    chosen: boolean;
  }) => (
    <button
      type="button"
      onClick={() => setAnswers({ ...answers, [qi]: side })}
      style={{
        flex: 1,
        minWidth: 0,
        height: "clamp(88px, 22svh, 132px)",
        border: "none",
        padding: 0,
        borderRadius: 10,
        cursor: "pointer",
        position: "relative",
        background: "#ece7dd",
        backgroundImage: "repeating-linear-gradient(135deg, rgba(0,0,0,0.05) 0 1px, transparent 1px 8px)",
        outline: chosen ? `2px solid ${accent}` : "2px solid transparent",
        outlineOffset: 2,
        transition: "outline 160ms",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 6,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 7,
          color: "rgba(0,0,0,0.5)",
          letterSpacing: 0.4,
          textAlign: "left",
          lineHeight: 1.25,
        }}
      >
        [{side.toUpperCase()}]
        <br />
        {data.hint}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 8,
          right: 8,
          fontFamily: "var(--font-serif), serif",
          fontSize: "clamp(12px, 3.4vmin, 15px)",
          color: "#1a1a1a",
          textAlign: "left",
          lineHeight: 1.15,
        }}
      >
        {data.label}
      </div>
      {chosen ? (
        <div
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 20,
            height: 20,
            borderRadius: 999,
            background: accent,
            color: "#fff",
            fontSize: 11,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✓
        </div>
      ) : null}
    </button>
  );

  const handleBack = () => {
    if (qi === 0) onBack();
    else setQi((i) => i - 1);
  };

  return (
    <div style={{ ...prototypeFillColumn, padding: "0 14px 10px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          paddingTop: 4,
          paddingBottom: "clamp(6px, 1.4svh, 12px)",
        }}
      >
        <button
          type="button"
          onClick={handleBack}
          style={{
            background: "none",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
            color: "#1a1a1a",
            padding: 0,
          }}
        >
          ←
        </button>
        <ProgressDots step={3} accent={accent} />
        <div style={{ width: 20 }} />
      </div>

      <Caption style={{ marginBottom: 4, flexShrink: 0 }}>Step 3 of 4 · {qi + 1} of 3</Caption>
      <Display
        size={28}
        style={{
          marginBottom: "clamp(8px, 1.6svh, 16px)",
          flexShrink: 0,
          fontSize: "clamp(20px, 5.5vmin, 28px)",
          lineHeight: 1.05,
        }}
      >
        What&apos;s your <em style={{ fontStyle: "italic" }}>vibe</em>?
      </Display>

      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Caption style={{ marginBottom: 8 }}>{String(qi + 1).padStart(2, "0")} · {q.q}</Caption>
        <div style={{ display: "flex", gap: 8 }}>
          <Card side="a" data={q.a} chosen={answers[qi] === "a"} />
          <Card side="b" data={q.b} chosen={answers[qi] === "b"} />
        </div>
      </div>

      <div style={{ flexShrink: 0, marginTop: 10 }}>
        {qi < Q.length - 1 ? (
          <PrimaryButton accent={accent} disabled={!answeredHere} onClick={() => setQi((i) => i + 1)}>
            Next
          </PrimaryButton>
        ) : (
          <PrimaryButton accent={accent} disabled={!done} onClick={onNext}>
            {done ? "Build my capsule →" : `${Object.keys(answers).length} of 3 answered`}
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}
