"use client";

import { Caption } from "@/components/primitives/Caption";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProgressDots } from "@/components/primitives/ProgressDots";
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

  const Card = ({
    qi,
    side,
    data,
    chosen,
  }: {
    qi: number;
    side: "a" | "b";
    data: (typeof Q)[0]["a"];
    chosen: boolean;
  }) => (
    <button
      type="button"
      onClick={() => setAnswers({ ...answers, [qi]: side })}
      style={{
        flex: 1,
        aspectRatio: "3/4",
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
          top: 8,
          left: 8,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 8,
          color: "rgba(0,0,0,0.5)",
          letterSpacing: 0.4,
          textAlign: "left",
        }}
      >
        [{side.toUpperCase()}]
        <br />
        {data.hint}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          fontFamily: "var(--font-serif), serif",
          fontSize: 15,
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
            top: 8,
            right: 8,
            width: 22,
            height: 22,
            borderRadius: 999,
            background: accent,
            color: "#fff",
            fontSize: 12,
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

  return (
    <div
      style={{
        padding: "0 20px 40px",
        background: "#fafaf7",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 8,
          paddingBottom: 22,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            fontSize: 20,
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

      <Caption style={{ marginBottom: 6 }}>Step 3 of 4</Caption>
      <Display size={32} style={{ marginBottom: 22 }}>
        What&apos;s your <em style={{ fontStyle: "italic" }}>vibe</em>?
      </Display>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {Q.map((q, i) => (
          <div key={q.q}>
            <Caption style={{ marginBottom: 8 }}>
              {String(i + 1).padStart(2, "0")} · {q.q}
            </Caption>
            <div style={{ display: "flex", gap: 10 }}>
              <Card qi={i} side="a" data={q.a} chosen={answers[i] === "a"} />
              <Card qi={i} side="b" data={q.b} chosen={answers[i] === "b"} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 20 }} />
      <PrimaryButton accent={accent} disabled={!done} onClick={onNext}>
        {done ? "Build my capsule →" : `${Object.keys(answers).length} of 3 answered`}
      </PrimaryButton>
    </div>
  );
}
