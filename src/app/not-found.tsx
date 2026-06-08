import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="not-found">
        <div className="wrap">
          <p className="section-index">§ 404</p>
          <h1>Page not found</h1>
          <p className="not-found-lead">
            This address does not exist on the portfolio. The measured work and
            the unmeasured looking all live on the home page.
          </p>
          <Link href="/" className="cv-btn not-found-link">
            <span className="cv-arrow" aria-hidden="true">
              ↑
            </span>
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
