import { FadeIn } from "@/components/fade-in";
import { ABOUT } from "@/lib/site";

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-20 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            About
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
            More Than Just a Random Forest
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
            {ABOUT}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
