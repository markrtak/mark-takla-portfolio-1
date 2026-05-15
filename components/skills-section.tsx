"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
  reducedOrSpring,
  springHoverLift,
  springReveal,
  springRevealSoft,
  springTap,
  viewportReveal,
} from "@/lib/motion";
import { SKILL_KEYS } from "@/lib/site";
import {
  uiDisplayHeading,
  uiEyebrowMuted,
  uiLead,
  uiSectionDivider,
  uiSectionScrollMargin,
} from "@/lib/ui-classes";
import { skillKeyTheme } from "@/lib/skill-key-theme";

function hashTilt(i: number): number {
  const x = Math.imul(i + 3, 0x9e3779b9);
  return (((x >>> 0) % 11) - 5) * 0.35;
}

type SkillKeyProps = {
  label: string;
  index: number;
  reduce: boolean | null;
  onActivate: (label: (typeof SKILL_KEYS)[number]) => void;
  onDeactivate: () => void;
  active: boolean;
};

const SKILL_DESCRIPTIONS: Record<(typeof SKILL_KEYS)[number], string> = {
  Java: "OOP with discipline: clean structure and fewer surprise plot twists.",
  Python: "My go-to for AI, data, and making prototypes dangerously fast.",
  C: "Straight to the metal - tiny mistakes, giant life lessons.",
  R: "Statistics mode: confidence intervals, p-values, and honest analysis.",
  React: "Reusable UI blocks so I do not rebuild the same button 14 times.",
  "ASP.NET": "Backend armor for APIs that should stay calm under real traffic.",
  MATLAB: "Where equations get tested before they become expensive mistakes.",
  Haskell: "Functional brain workout that punishes side effects and rewards clarity.",
  Prolog: "I define logic; Prolog plays detective and finds the answer.",
  HTML: "The skeleton of every page before the styling magic begins.",
  CSS: "From plain to polished with carefully weaponized spacing and color.",
  "OrCAD PSpice": "Circuit simulation without burning components or my budget.",
  Linux: "Terminal-first productivity where scripts do the repetitive heavy lifting.",
  AI: "Turning messy ideas into models that do useful things.",
  SQL: "Interrogating databases politely until they reveal the truth.",
  Pandas: "Spreadsheet chaos in, clean tables and joins out.",
  NumPy: "Vectorized speed so loops can finally take a break.",
  "scikit-learn": "Reliable ML baselines and sanity checks before deep models.",
  "Power BI": "Dashboards that help people decide faster, not just prettier.",
  TensorFlow: "Deep learning pipelines for problems too big for simple models.",
  Keras: "Neural networks with less boilerplate and fewer caffeine emergencies.",
  LangChain: "Agent workflows without manually stitching every prompt and tool.",
  "Microsoft Word": "Where polished reports are born after the coding storm.",
  PowerPoint: "Turning technical results into slides humans can actually follow.",
  Excel: "Still undefeated for quick audits and real-world data triage.",
  "Adobe Photoshop": "Quick visual cleanup when an idea needs polish.",
  "Adobe After Effects": "Motion and storytelling when static visuals are not enough.",
  UiPath: "Software robots for repetitive tasks that humans should not babysit.",
};

function SkillKey({
  label,
  index,
  reduce,
  onActivate,
  onDeactivate,
  active,
}: SkillKeyProps) {
  const tilt = hashTilt(index);
  const theme = skillKeyTheme(index);

  return (
    <motion.button
      type="button"
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={reducedOrSpring(reduce, springRevealSoft, index * 0.025)}
      whileHover={
        reduce
          ? undefined
          : {
              scale: 1.09,
              y: -6,
              rotate: tilt * 0.2,
              transition: springHoverLift,
            }
      }
      whileTap={
        reduce
          ? undefined
          : {
              scale: 0.94,
              y: 4,
              boxShadow: theme.shadowPressed,
              transition: springTap,
            }
      }
      style={{
        rotate: `${tilt}deg`,
        background: theme.background,
        borderColor: theme.borderColor,
        color: theme.color,
        boxShadow: theme.shadow,
        ["--skill-focus" as string]: theme.focusRing,
      }}
      className={`group relative min-h-[2.6rem] min-w-[2.6rem] max-w-[10.5rem] cursor-pointer rounded-2xl border-2 px-2.5 py-2 text-center font-sans text-[10px] font-bold leading-snug tracking-tight transition-[box-shadow,transform] duration-100 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--skill-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:min-h-[3rem] sm:max-w-[14rem] sm:px-4 sm:py-3 sm:text-xs ${active ? "ring-2 ring-[var(--accent)]/35" : ""}`}
      aria-label={`Skill: ${label}`}
      onMouseEnter={() => onActivate(label as (typeof SKILL_KEYS)[number])}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(label as (typeof SKILL_KEYS)[number])}
      onBlur={onDeactivate}
    >
      <span
        className="pointer-events-none absolute inset-x-2 top-1.5 h-2 rounded-full opacity-80"
        style={{ background: theme.highlight }}
        aria-hidden
      />
      <span className="relative z-10 break-words">{label}</span>
    </motion.button>
  );
}

export function SkillsSection() {
  const reduce = useReducedMotion();
  const [activeSkill, setActiveSkill] = useState<(typeof SKILL_KEYS)[number] | null>(
    null,
  );

  return (
    <section
      id="skills"
      className={`${uiSectionScrollMargin} ${uiSectionDivider} px-4 py-20 sm:px-6`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReveal}
          transition={reducedOrSpring(reduce, springReveal)}
        >
          <p className={uiEyebrowMuted}>Tech stack</p>
          <h2 className={`mt-2 ${uiDisplayHeading}`}>Skills</h2>
          <p className={uiLead}>
            Hover over skills for a surprise!
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:justify-start sm:gap-4">
          {SKILL_KEYS.map((skill, i) => (
            <SkillKey
              key={`${skill}-${i}`}
              label={skill}
              index={i}
              reduce={reduce}
              active={activeSkill === skill}
              onActivate={setActiveSkill}
              onDeactivate={() => setActiveSkill(null)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeSkill && (
            <motion.div
              key={activeSkill}
              className="mt-8 max-w-3xl"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={reducedOrSpring(reduce, springRevealSoft)}
              aria-live="polite"
            >
              <p className="text-lg font-semibold text-[var(--ink)] sm:text-xl">
                {activeSkill}
              </p>
              <p className="mt-2 text-[var(--muted)] sm:text-lg">
                {SKILL_DESCRIPTIONS[activeSkill]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
