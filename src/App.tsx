import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Spaces from "./components/Spaces";
import Booking from "./components/Booking";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Spaces />
        <Booking />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

export default App;
