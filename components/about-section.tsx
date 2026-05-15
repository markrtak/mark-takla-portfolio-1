import { FadeIn } from "@/components/fade-in";
import { ABOUT } from "@/lib/site";
import { uiDisplayHeading, uiEyebrowAccent, uiSectionScrollMargin } from "@/lib/ui-classes";

export function AboutSection() {
  return (
    <section
      id="about"
      className={`${uiSectionScrollMargin} border-t border-[color-mix(in_srgb,var(--border)_42%,transparent)] bg-[var(--surface)] px-4 py-20 sm:px-6`}
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className={uiEyebrowAccent}>About</p>
          <h2 className={`mt-2 ${uiDisplayHeading}`}>
            More Than Just a Random Forest
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed tracking-tight text-[var(--muted)]">
            {ABOUT}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
