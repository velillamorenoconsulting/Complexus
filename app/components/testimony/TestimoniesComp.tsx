import React, { Suspense } from "react";
import CompLoading from "../CompLoading";
import TestimonyBoard from "./TestimonyBoard";

export default function TestimoniesComp() {
  return (
    <div className="relative">
      <Suspense
        fallback={<CompLoading hasBackground={false} height="h-[500px]" />}
      >
        <TestimonyBoard />
      </Suspense>
    </div>
  );
}
