import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { ABOUT, ABOUT_LOYA, LOYA_URL } from "@/lib/site";
import { uiDisplayHeading, uiEyebrowAccent, uiSectionScrollMargin } from "@/lib/ui-classes";

export function AboutSection() {
  const [beforeLoya, afterLoya] = ABOUT_LOYA.split("loya");

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
          <p className="mt-4 max-w-3xl text-lg leading-relaxed tracking-tight text-[var(--muted)]">
            {beforeLoya}
            <Link
              href={LOYA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              loya
            </Link>
            {afterLoya}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
