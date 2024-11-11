import TestimonyA from "../sections/testimony/TestimonyA";

export default function Testimony() {
  return (
    <section className="flex flex-col h-full min-h-screen bg-[#ecf4f4] px-10">
      <div className="mt-32 lg:mt-44 h-full flex flex-col flex-1">
        <TestimonyA />
      </div>
    </section>
  );
}
