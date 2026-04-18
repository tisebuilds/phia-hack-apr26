"use client";

import { useState } from "react";
import { Display } from "@/components/primitives/Display";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { ProgressDots } from "@/components/primitives/ProgressDots";
import { prototypeFillColumn } from "@/components/screens/prototypeScreenRoot";
import { STARTER_DATA } from "@/lib/data";
import type { QuizAnswers } from "@/lib/types";

const QUIZ_SIDES = ["a", "b", "c", "d"] as const;
type QuizSide = (typeof QUIZ_SIDES)[number];

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
    side: QuizSide;
    data: (typeof Q)[0]["a"];
    chosen: boolean;
  }) => {
    const photo = Boolean(data.image);
    return (
    <button
      type="button"
      onClick={() => setAnswers({ ...answers, [qi]: side })}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "clamp(72px, 14svh, 104px)",
        minWidth: 0,
        border: "none",
        padding: 0,
        borderRadius: 10,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        background: photo ? "#1a1410" : "#ece7dd",
        backgroundImage: photo
          ? undefined
          : "repeating-linear-gradient(135deg, rgba(0,0,0,0.05) 0 1px, transparent 1px 8px)",
        outline: chosen ? `2px solid ${accent}` : "2px solid transparent",
        outlineOffset: 2,
        transition: "outline 160ms",
      }}
    >
      {data.image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.42) 0%, transparent 38%, transparent 52%, rgba(0,0,0,0.55) 100%)",
              pointerEvents: "none",
            }}
          />
        </>
      ) : null}
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 6,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 7,
          color: photo ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.5)",
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
          color: photo ? "#faf8f5" : "#1a1a1a",
          textAlign: "left",
          lineHeight: 1.15,
          textShadow: photo ? "0 1px 10px rgba(0,0,0,0.55)" : undefined,
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
  };

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

      <Display
        size={28}
        style={{
          marginBottom: "clamp(8px, 1.6svh, 16px)",
          flexShrink: 0,
          fontSize: "clamp(20px, 5.5vmin, 28px)",
          lineHeight: 1.05,
        }}
      >
        {q.q}
      </Display>

      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 8,
            flex: 1,
            minHeight: 0,
          }}
        >
          {QUIZ_SIDES.map((side) => (
            <Card key={side} side={side} data={q[side]} chosen={answers[qi] === side} />
          ))}
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
