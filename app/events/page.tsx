import Events from "../pages/Events";
import Footer from "../sections/Footer";
import NavaBar from "../sections/NavaBar";

export default function EventsPage() {
  return (
    <main>
      <NavaBar style="dark" />
      <Events />
      <Footer style="dark" />
    </main>
  );
}
