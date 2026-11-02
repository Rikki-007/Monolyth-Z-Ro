"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { tiers, type Tier } from "@/data/showcases";
import {
  briefMessage,
  briefStyles,
  channelLinks,
  createBrief,
  intakeEndpoint,
  submitWebIntake,
  type BriefStyle,
  type Channel,
  type ProjectBrief,
  type WebIntakeReceipt,
} from "@/lib/channels";

const CHANNELS: Channel[] = ["whatsapp", "gmail", "email", "instagram", "messenger"];

// Pick a tier and a style, get a brief code, and send it through any channel with the
// configuration attached. The code is generated in the click handlers, never during render, so
// the static prerender and the browser can't disagree about it.
export default function BriefConfigurator() {
  const [tier, setTier] = useState<Tier | null>(null);
  const [style, setStyle] = useState<BriefStyle | null>(null);
  const [brief, setBrief] = useState<ProjectBrief | null>(null);
  const [notice, setNotice] = useState("");

  const choose = (nextTier: Tier | null, nextStyle: BriefStyle | null) => {
    setTier(nextTier);
    setStyle(nextStyle);
    setBrief(nextTier && nextStyle ? createBrief(nextTier, nextStyle) : null);
  };

  const copy = (text: string, message: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setNotice(message);
    window.setTimeout(() => setNotice(""), 4000);
  };

  const links = brief ? channelLinks(brief) : null;

  return (
    <div className="glass mt-4 flex w-full max-w-2xl flex-col gap-6 rounded-3xl border border-concrete-line p-6 text-left sm:p-8">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-amber">Configure a brief</span>
        <p className="mt-2 font-sans text-sm text-fog">
          Pick a build tier and a design language. You&apos;ll get a brief code to send with your message, so we start from
          your configuration.
        </p>
      </div>

      <ChipGroup
        label="Tier"
        options={(Object.keys(tiers) as Tier[]).map((t) => ({ value: t, label: tiers[t] }))}
        value={tier}
        onChange={(t) => choose(t as Tier, style)}
      />
      <ChipGroup
        label="Style"
        options={(Object.keys(briefStyles) as BriefStyle[]).map((s) => ({ value: s, label: briefStyles[s].label }))}
        value={style}
        onChange={(s) => choose(tier, s as BriefStyle)}
      />

      <div aria-live="polite" className="flex flex-wrap items-center gap-3 border-t border-concrete-line pt-5">
        {brief && links ? (
          <>
            <code className="rounded-lg border border-cyan/40 px-3 py-1.5 font-mono text-sm tracking-widest text-cyan">{brief.code}</code>
            <button
              type="button"
              data-cursor-hover
              onClick={() => copy(briefMessage(brief), "Brief copied.")}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-fog transition-colors hover:text-paper"
            >
              <Copy size={13} /> Copy brief
            </button>
          </>
        ) : (
          <span className="font-mono text-xs text-fog/70">Choose a tier and a style to generate your brief code.</span>
        )}
      </div>

      {links && brief && (
        <div className="flex flex-wrap gap-2">
          {CHANNELS.map((channel) => {
            const link = links[channel];
            return (
              <a
                key={channel}
                href={link.href}
                target={channel === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                data-cursor-hover
                onClick={() => {
                  if (!link.prefilled) copy(briefMessage(brief), `Brief copied. Paste it into ${link.label}.`);
                }}
                className="rounded-full border border-concrete-line px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-paper transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                {link.label}
                {!link.prefilled && <span className="sr-only"> (copies the brief so you can paste it)</span>}
              </a>
            );
          })}
        </div>
      )}

      {notice && (
        <p role="status" className="inline-flex items-center gap-2 font-mono text-xs text-cyan">
          <Check size={13} /> {notice}
        </p>
      )}

      {brief && intakeEndpoint && <WebIntakeForm brief={brief} />}
    </div>
  );
}

function WebIntakeForm({ brief }: { brief: ProjectBrief }) {
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<WebIntakeReceipt | null>(null);

  if (receipt) {
    return (
      <p role="status" className="font-sans text-sm text-paper">
        Brief {receipt.brief_code} received. Reference <span className="font-mono text-cyan">{receipt.intake_id}</span>.
        We reply within 24 hours.
      </p>
    );
  }

  const field =
    "w-full rounded-xl border border-concrete-line bg-transparent px-3 py-2 font-sans text-sm text-paper placeholder:text-fog/50 focus:border-cyan/60 focus:outline-none";

  return (
    <form
      className="grid gap-3 border-t border-concrete-line pt-5 sm:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const value = (k: string) => String(form.get(k) ?? "").trim() || undefined;
        if (value("website")) return; // honeypot: humans never see this field
        setState("sending");
        try {
          setReceipt(
            await submitWebIntake(brief, {
              name: value("name"),
              email: value("email"),
              phone: value("phone"),
              company: value("company"),
              message: value("message"),
            }),
          );
        } catch (err) {
          setError((err as Error).message);
          setState("error");
        }
      }}
    >
      <span className="font-mono text-[11px] uppercase tracking-widest text-amber sm:col-span-2">Or send it here</span>
      <input name="name" placeholder="Name" autoComplete="name" className={field} />
      <input name="company" placeholder="Company (optional)" autoComplete="organization" className={field} />
      <input name="email" type="email" placeholder="Email" autoComplete="email" className={field} />
      <input name="phone" type="tel" placeholder="Phone or WhatsApp" autoComplete="tel" className={field} />
      <textarea name="message" rows={3} placeholder="What are you building?" className={`${field} sm:col-span-2`} />
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={state === "sending"}
          data-cursor-hover
          className="rounded-full border border-cyan/50 px-5 py-2 font-mono text-[11px] uppercase tracking-widest text-cyan transition-colors hover:bg-cyan/10 disabled:opacity-50"
        >
          {state === "sending" ? "Sending…" : `Send ${brief.code}`}
        </button>
        {state === "error" && <span role="alert" className="font-sans text-xs text-crimson">{error}</span>}
      </div>
    </form>
  );
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="mr-2 w-12 font-mono text-[11px] uppercase tracking-widest text-amber">{label}</span>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          data-cursor-hover
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 ${
            value === o.value ? "border-cyan/60 text-cyan" : "border-concrete-line text-fog hover:border-fog/60 hover:text-paper"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
