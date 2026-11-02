// Project briefs: a short code that captures a visitor's chosen tier and style, the message that
// carries it, and the links that open each contact channel with that message attached.
//
//   MZ-T2-GLASS-7F3K
//   │  │  │     └ 4 random characters (no 0/O/1/I: codes get read aloud and retyped)
//   │  │  └ style
//   │  └ tier
//   └ studio prefix
//
// The intake API (agency engine, POST /api/intake/web) parses the same format, so a code pasted
// into WhatsApp or an email can be normalised exactly like a web submission.
import { contact } from "@/data/contact";
import { tiers, type Tier } from "@/data/showcases";

export const briefStyles = {
  minimalism: { code: "MINIMAL", label: "Minimalism" },
  glassmorphism: { code: "GLASS", label: "Glassmorphism" },
  neo_brutalism: { code: "BRUTAL", label: "Neo-Brutalism" },
  liquid_glass: { code: "LIQUID", label: "Liquid Glass" },
} as const;
export type BriefStyle = keyof typeof briefStyles;

const SUFFIX_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // 32 symbols → ~1M codes per tier/style
export const BRIEF_CODE_PATTERN = /^MZ-(T[123])-(MINIMAL|GLASS|BRUTAL|LIQUID)-([A-HJ-NP-Z2-9]{4})$/;

export type ProjectBrief = { code: string; tier: Tier; style: BriefStyle };

export function createBrief(tier: Tier, style: BriefStyle): ProjectBrief {
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const suffix = Array.from(bytes, (b) => SUFFIX_ALPHABET[b % SUFFIX_ALPHABET.length]).join(""); // 256 % 32 == 0: unbiased
  return { code: `MZ-${tier}-${briefStyles[style].code}-${suffix}`, tier, style };
}

export function parseBriefCode(code: string): ProjectBrief | null {
  const match = BRIEF_CODE_PATTERN.exec(code.trim().toUpperCase());
  if (!match) return null;
  const style = (Object.keys(briefStyles) as BriefStyle[]).find((s) => briefStyles[s].code === match[2])!;
  return { code: match[0], tier: match[1] as Tier, style };
}

/** The text every channel carries. The code line comes first so it survives truncation. */
export function briefMessage(brief: ProjectBrief): string {
  return [
    `Project brief: ${brief.code}`,
    `Tier: ${tiers[brief.tier]}`,
    `Style: ${briefStyles[brief.style].label}`,
    "",
    "Hi MONOLYTH Z-RO, I'd like to start a project with this configuration.",
  ].join("\n");
}

export type ChannelLink = {
  label: string;
  href: string;
  /** false: the channel can't take prefilled text, so copy briefMessage() before opening it. */
  prefilled: boolean;
};

export type Channel = "whatsapp" | "instagram" | "messenger" | "gmail" | "email";

export function channelLinks(brief: ProjectBrief): Record<Channel, ChannelLink> {
  const text = briefMessage(brief);
  const subject = `Project brief ${brief.code}`;
  const q = encodeURIComponent;
  return {
    whatsapp: { label: "WhatsApp", href: `${contact.whatsapp}?text=${q(text)}`, prefilled: true },
    // ig.me and m.me open the conversation but ignore any text parameter.
    instagram: { label: "Instagram DM", href: contact.instagramDm, prefilled: false },
    messenger: { label: "Messenger", href: contact.messenger, prefilled: false },
    gmail: {
      label: "Gmail",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${q(contact.email)}&su=${q(subject)}&body=${q(text)}`,
      prefilled: true,
    },
    email: { label: "Email app", href: `mailto:${contact.email}?subject=${q(subject)}&body=${q(text)}`, prefilled: true },
  };
}

// ---------------------------------------------------------------- web intake

/** Set at build time to the agency intake endpoint; without it the site offers the channels only. */
export const intakeEndpoint = process.env.NEXT_PUBLIC_INTAKE_URL ?? null;

export type WebIntakeContact = { name?: string; email?: string; phone?: string; company?: string; message?: string };
export type WebIntakeReceipt = { intake_id: string; brief_code: string; status: string };

export async function submitWebIntake(brief: ProjectBrief, details: WebIntakeContact): Promise<WebIntakeReceipt> {
  if (!intakeEndpoint) throw new Error("Web intake is not configured");
  const res = await fetch(intakeEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ brief_code: brief.code, tier: brief.tier, style: brief.style, contact: details }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(typeof data.detail === "string" ? data.detail : "The brief couldn't be sent. Please use another channel.");
  return data as WebIntakeReceipt;
}
