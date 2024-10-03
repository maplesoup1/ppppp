import Image from "next/image";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import About from "@/components/ui/About";
import Contact from "@/components/ui/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div>
      <Hero/>
      <About/>
      <Contact/>
      <Contact/>
      <Contact/>
      <Footer/>
    </div>
  );
}
