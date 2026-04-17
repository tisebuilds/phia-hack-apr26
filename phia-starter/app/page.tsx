import { Suspense } from "react";
import { Prototype } from "@/components/Prototype";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Prototype />
    </Suspense>
  );
}
