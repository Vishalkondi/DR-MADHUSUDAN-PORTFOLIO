import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScrollProgress from "@/components/ScrollProgress";
import { Affiliations, About, Expertise, Procedures, Journey, Recognition } from "@/components/Sections";
import { Gallery, Testimonials, FAQ, Blog } from "@/components/Sections2";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Affiliations />
      <About />
      <Expertise />
      <Procedures />
      <Journey />
      <Recognition />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Blog />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  );
}
