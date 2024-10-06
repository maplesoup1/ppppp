import Hero from "@/components/ui/Hero";
import About from "@/components/ui/About";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <div id="#about">
        <About />
      </div>
      <Footer />
    </div>
  );
}
