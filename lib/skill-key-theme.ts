/** Candy-shop keycap colors — cycles through distinct fun hues (still readable on B&W page). */
const KEYCAP_PALETTE: { h: number; sat: number; lightTop: number; lightBot: number }[] = [
  { h: 200, sat: 92, lightTop: 88, lightBot: 72 },
  { h: 280, sat: 78, lightTop: 90, lightBot: 74 },
  { h: 38, sat: 96, lightTop: 90, lightBot: 72 },
  { h: 145, sat: 72, lightTop: 88, lightBot: 70 },
  { h: 330, sat: 85, lightTop: 90, lightBot: 74 },
  { h: 265, sat: 82, lightTop: 90, lightBot: 76 },
  { h: 12, sat: 90, lightTop: 88, lightBot: 70 },
  { h: 175, sat: 70, lightTop: 86, lightBot: 68 },
  { h: 48, sat: 94, lightTop: 90, lightBot: 74 },
  { h: 310, sat: 76, lightTop: 90, lightBot: 76 },
  { h: 215, sat: 88, lightTop: 88, lightBot: 72 },
  { h: 95, sat: 62, lightTop: 88, lightBot: 70 },
];

export function skillKeyTheme(index: number) {
  const p = KEYCAP_PALETTE[index % KEYCAP_PALETTE.length];
  const h = p.h.toFixed(1);
  const sat = p.sat;
  return {
    background: `linear-gradient(180deg, hsl(${h} ${sat}% ${p.lightTop}%) 0%, hsl(${h} ${sat}% ${p.lightBot}%) 100%)`,
    borderColor: `hsl(${h} ${Math.min(100, sat + 8)}% 32%)`,
    color: `hsl(${h} 28% 14%)`,
    shadow: `0 6px 0 0 hsl(${h} ${sat}% 28%), 0 12px 26px hsl(${h} 50% 18% / 0.2)`,
    shadowPressed: `0 2px 0 0 hsl(${h} ${sat}% 28%)`,
    focusRing: `hsl(${h} ${sat}% 42%)`,
    highlight: `linear-gradient(180deg, hsl(${h} 95% 99% / 0.65) 0%, transparent 100%)`,
  };
}
