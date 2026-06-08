import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Photography } from "@/components/Photography";
import { BuiltWork } from "@/components/BuiltWork";
import { Skills } from "@/components/Skills";

/**
 * Home page — composes the single-page portfolio.
 *
 * The sections below are anchored stubs filled in across the build phases:
 *   #top  → Hero        (Phase 2)
 *   #about → About      (Phase 2)
 *   #photography        (Phase 3)
 *   #work → Built Work  (Phase 4)
 *   #skills             (Phase 4)
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Photography />
        <BuiltWork />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
