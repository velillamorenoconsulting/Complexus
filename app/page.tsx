import HomePage from "./pages/Home";
import NavaBar from "./sections/NavaBar";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <NavaBar style="light" />
      <HomePage />
    </main>
  );
}
