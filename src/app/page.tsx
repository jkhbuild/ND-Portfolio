import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

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
        <header className="hero" id="top">
          <div className="wrap" />
        </header>
        <section className="block" id="about">
          <div className="wrap" />
        </section>
        <section className="block" id="photography">
          <div className="wrap" />
        </section>
        <section className="block" id="work">
          <div className="wrap" />
        </section>
        <section className="block" id="skills">
          <div className="wrap" />
        </section>
      </main>
      <Footer />
    </>
  );
}
