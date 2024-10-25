import HomePage from "./pages/Home";
import Footer from "./sections/Footer";
import NavaBar from "./sections/NavaBar";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <NavaBar style="light" />
      <HomePage />
    </main>
  );
}
