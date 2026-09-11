import type { Metadata } from "next";
import Link from "next/link";
import { Inter, JetBrains_Mono } from "next/font/google";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Database,
  FileText,
  Landmark,
  Library,
  Lock,
  Scale,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import Reveal from "@/components/landing/Reveal";

/* -------------------------------------------------------------------------- */
/*  Fonts                                                                      */
/* -------------------------------------------------------------------------- */

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-landing-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-landing-mono",
});

const MONO = { fontFamily: "var(--font-landing-mono), ui-monospace, monospace" };

export const metadata: Metadata = {
  title: "Trilegal AI: one workspace for the whole matter",
  description:
    "Legal research across five sources, AI-assisted drafting, deterministic case risk scoring and lawyer staffing for Indian law firms. Demo running on simulated data.",
};

/* -------------------------------------------------------------------------- */
/*  Locked design decisions                                                    */
/*                                                                             */
/*  Theme:  light only. Ground #EFF4FC, surface #FDFEFE, ink #10182B,          */
/*          muted #3E4554, border #DDE5F2. No section inverts to navy.         */
/*  Accent: #2762E5 (trilegal-primary) and its pale #CCDEF9. Nothing else.     */
/*  Radius: rounded-lg (0.625rem) on every container, control and image.       */
/*  Depth:  borders first. shadow-card only on the hero image and closing panel. */
/* -------------------------------------------------------------------------- */

const SHELL = "mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12";
const H2 =
  "text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-[1.12] text-trilegal-text";
const LEDE = "text-base leading-relaxed text-trilegal-muted";
const CARD =
  "rounded-lg border border-trilegal-border bg-trilegal-card p-6 lg:p-7";

/* Research sources. Labels are the exact `database` union in src/types/legal.ts. */
const SOURCES = [
  {
    name: "Firm Repository (Confidential)",
    body: "Your own past filings, opinions and internal memos, indexed next to the public reporters so a partner's earlier reasoning surfaces in the same result set.",
    icon: Library,
  },
  {
    name: "Indian Kanoon (Public Source)",
    body: "Open judgment text, used to verify that a citation resolves to a real reported decision. Public text can be checked without a subscription.",
    icon: Landmark,
  },
  {
    name: "SCC Online (Demo)",
    body: "Supreme Court and High Court reporting, with the headnotes and the parallel citations a filing needs.",
    icon: Scale,
  },
  {
    name: "Manupatra (Demo)",
    body: "Statutes, subordinate rules and tribunal orders, which is usually where a regulatory point actually turns.",
    icon: Database,
  },
  {
    name: "Westlaw (Demo)",
    body: "Comparative material and commentary, for the arguments that have no Indian authority yet.",
    icon: FileText,
  },
] as const;

const TEMPLATES = [
  "Writ Petition",
  "Legal Notice",
  "Legal Opinion",
  "Arbitration Notice",
  "Commercial Contract",
  "Research Memo",
  "Court Filing",
] as const;

const TONES = ["Formal", "Concise", "Partner-style", "Detailed", "Firm Standard"] as const;

/* Field names are the literal keys of Case.riskScores in src/types/legal.ts. */
const RISK_INPUTS = [
  {
    field: "financialValue",
    label: "Financial value",
    body: "Amount in dispute, read against the exposure the firm has actually carried in comparable matters.",
  },
  {
    field: "precedentComplexity",
    label: "Precedent complexity",
    body: "How settled the governing line is. A matter turning on an unresolved conflict between benches scores higher than one applying a clear rule.",
  },
  {
    field: "statutoryPenalty",
    label: "Statutory penalty",
    body: "Exposure written into the statute itself, separate from the commercial claim.",
  },
] as const;

const ORBITX = [
  {
    metric: "Skill score",
    unit: "0 to 100, per practice area",
    body: "Held per area rather than as one number, so depth in arbitration does not read as depth in constitutional law.",
  },
  {
    metric: "Current workload",
    unit: "percentage",
    body: "What a lawyer is already carrying, so a recommendation does not quietly overload the best-matched person.",
  },
  {
    metric: "Domain readiness",
    unit: "percentage",
    body: "Whether the practice area is one they can take now or one they are still building into.",
  },
  {
    metric: "Growth score",
    unit: "composite",
    body: "Movement over time, which is the figure that matters when the question is who should be stretched.",
  },
  {
    metric: "Case match",
    unit: "percentage plus stated reason",
    body: "Every match carries the reason it was made, so a staffing call can be argued with rather than accepted.",
  },
] as const;

const DEMO_IS = [
  "Eight sample matters and ten real reported judgments, all public record.",
  "Risk levels computed by the scoring algorithm from the three inputs above.",
  "State persisted in your browser's local storage and nowhere else.",
] as const;

const DEMO_IS_NOT = [
  "No client data. Every party, matter and draft on screen is fabricated for the demo.",
  "No outbound requests. Nothing you type leaves the browser, and no model provider is called.",
  "No accounts. Sign-in is simulated, and the credentials are pre-filled for you.",
] as const;

/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <div
      className={`${inter.variable} ${mono.variable} min-h-[100dvh] bg-trilegal-bg text-trilegal-text selection:bg-trilegal-primaryPale selection:text-trilegal-navyBlue`}
      style={{ fontFamily: "var(--font-landing-sans), Inter, system-ui, sans-serif" }}
    >
      {/* Nav: single row, 64px, one CTA. Wordmark and links share a left cluster
          divided by a hairline, so the row reads as one unit instead of three
          floating islands. Blue is spent only on the CTA. */}
      <header className="sticky top-0 z-50 border-b border-trilegal-border bg-trilegal-bg/80 backdrop-blur-md">
        <nav className={`${SHELL} flex h-16 items-center gap-5 lg:gap-7`}>
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="Trilegal AI home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-trilegal-text">
              <Scale className="h-4 w-4 text-white" strokeWidth={1.5} />
            </span>
            <span className="text-[15px] font-semibold tracking-[-0.01em]">TRILEGAL AI</span>
          </Link>

          <span aria-hidden className="hidden h-6 w-px shrink-0 bg-trilegal-border lg:block" />

          <ul className="hidden items-center gap-6 text-[13px] text-trilegal-muted lg:flex">
            {[
              { href: "#research", label: "Research" },
              { href: "#drafting", label: "Drafting" },
              { href: "#risk", label: "Risk" },
              { href: "#orbitx", label: "OrbitX" },
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="underline-offset-[6px] transition-colors hover:text-trilegal-text hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <span
            className="ml-auto hidden items-center gap-2 text-[11px] text-trilegal-muted md:flex"
            style={MONO}
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-trilegal-primary" />
            demo, simulated data
          </span>

          <Link
            href="/login"
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-trilegal-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-trilegal-navyBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trilegal-primary md:ml-7"
          >
            Open the demo
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </nav>
      </header>

      <main>
        {/* 1. HERO. Asymmetric split, 7/5, text left. Three text elements only:
            headline, subtext, CTA pair. No eyebrow, no strip under the CTAs.
            The right column is a depiction of the research surface rather than
            a decorative photograph, so the asset carries information. Ground is
            a hairline column grid framed to the content edges, masked out before
            it reaches the section border. */}
        <section className="relative border-b border-trilegal-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
          >
            <div className={`${SHELL} h-full`}>
              <div
                className="h-full border-x border-trilegal-border"
                style={{
                  backgroundImage: "linear-gradient(to right, #DCE4F1 1px, transparent 1px)",
                  backgroundSize: "calc(100% / 6) 100%",
                  maskImage: "linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 0%, #000 72%, transparent 100%)",
                }}
              />
            </div>
          </div>

          <div
            className={`${SHELL} relative flex items-center pb-16 pt-14 md:pt-20 lg:pb-20 lg:pt-24`}
          >
            <div className="grid w-full gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
              <div className="lg:col-span-7">
                <h1 className="max-w-[20ch] text-4xl font-semibold tracking-[-0.03em] leading-[1.05] md:text-5xl xl:text-6xl">
                  One workspace for the whole matter.
                </h1>
                <p className={`mt-6 max-w-[58ch] ${LEDE}`}>
                  Legal research, drafting, risk scoring and case staffing for Indian law firms,
                  grounded in cited precedent.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-lg bg-trilegal-primary px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-trilegal-navyBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trilegal-primary"
                  >
                    Open the demo
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                  <a
                    href="#risk"
                    className="inline-flex items-center gap-2 rounded-lg border border-trilegal-border bg-trilegal-card px-6 py-3 text-[15px] font-medium text-trilegal-text transition-colors hover:border-trilegal-primaryLight"
                  >
                    See how risk scoring works
                  </a>
                </div>
              </div>

              {/* Hero asset: the unified-search result surface. Every value in it is
                  real. The judgment, its citation and its bench are public record;
                  the source label is the exact `database` union member from
                  src/types/legal.ts. Nothing here is a fabricated metric. */}
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-lg border border-trilegal-border bg-trilegal-card shadow-card">
                  <div className="flex items-center justify-between gap-3 border-b border-trilegal-border px-5 py-3.5">
                    <span className="text-[11px] text-trilegal-muted" style={MONO}>
                      research / unified search
                    </span>
                    <span
                      className="rounded-lg bg-trilegal-bg px-2 py-1 text-[10.5px] text-trilegal-muted"
                      style={MONO}
                    >
                      5 sources
                    </span>
                  </div>

                  <div className="px-5 pt-5">
                    <div className="flex items-center gap-2.5 rounded-lg border border-trilegal-border bg-trilegal-bg px-3.5 py-2.5">
                      <Search
                        className="h-4 w-4 shrink-0 text-trilegal-muted"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span className="truncate text-[13px] text-trilegal-text">
                        arbitrary stop-work order, Article 14
                      </span>
                    </div>

                    <div className="mt-3.5 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                      {[
                        "Firm Repository",
                        "Indian Kanoon",
                        "SCC Online",
                        "Manupatra",
                        "Westlaw",
                      ].map((source) => (
                        <span
                          key={source}
                          className="truncate rounded-lg border border-trilegal-border px-2 py-1 text-center text-[11px] text-trilegal-muted"
                          style={MONO}
                        >
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-trilegal-border bg-trilegal-bg/60 px-5 py-5">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-trilegal-primaryPale">
                        <Landmark
                          className="h-4 w-4 text-trilegal-navyBlue"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[15px] font-medium leading-snug text-trilegal-text">
                          Maneka Gandhi vs. Union of India
                        </p>
                        <p className="mt-1 text-[11px] text-trilegal-muted" style={MONO}>
                          (1978) 1 SCC 248 : AIR 1978 SC 597
                        </p>
                        <p className="mt-0.5 text-xs text-trilegal-muted">
                          Supreme Court of India, 7-Judge Bench
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[13px] leading-relaxed text-trilegal-muted">
                      Procedure that deprives a person of liberty or of a right must be just, fair
                      and reasonable. Arbitrary executive discretion fails Article 14.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-trilegal-border bg-trilegal-card px-2 py-1 text-[11px] text-trilegal-muted">
                        <Check
                          className="h-3 w-3 text-trilegal-primary"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        Verified public record
                      </span>
                      <span
                        className="rounded-lg border border-trilegal-border bg-trilegal-card px-2 py-1 text-[11px] text-trilegal-muted"
                        style={MONO}
                      >
                        SCC Online (Demo)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-t border-trilegal-border px-5 py-3.5 text-xs text-trilegal-muted">
                    <ClipboardCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden />
                    Carried into the active brief with its citation attached.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROBLEM. Full-width statement, then a bordered triad. No cards, no numbers. */}
        <section className="border-b border-trilegal-border">
          <div className={`${SHELL} py-20 lg:py-28`}>
            <Reveal>
              <h2 className={`max-w-[22ch] ${H2}`}>The matter is one thing. The tooling never is.</h2>
              <p className={`mt-6 max-w-[62ch] ${LEDE}`}>
                Research lives in one set of tabs, precedent in another, the draft in Word, and the
                staffing call in somebody&apos;s memory. Nothing carries across, so the same
                reasoning gets rebuilt at every step.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-14 grid divide-y divide-trilegal-border border-t border-trilegal-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                {[
                  {
                    head: "Every reporter, its own syntax",
                    body: "Each reporter has its own query language and its own export format. The same search gets written again for each one.",
                  },
                  {
                    head: "Precedent that cannot be cited",
                    body: "A generated draft is only useful if every authority in it resolves to a reported decision you can put in front of a bench.",
                  },
                  {
                    head: "Staffing from memory",
                    body: "Who did well on something like this, and who has the capacity now, are two different questions. Usually only the first gets asked.",
                  },
                ].map((item) => (
                  <div key={item.head} className="pt-8 lg:px-8 lg:pt-10 lg:first:pl-0 lg:last:pr-0">
                    <h3 className="text-base font-semibold tracking-[-0.01em]">{item.head}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-trilegal-muted">{item.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-14 text-xl font-medium tracking-[-0.02em] text-trilegal-text md:text-2xl">
                Research, draft, strategise, staff. Four jobs, one window.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 3. RESEARCH. Bento, five cells for five sources, mixed spans and backgrounds. */}
        <section id="research" className="scroll-mt-16 border-b border-trilegal-border">
          <div className={`${SHELL} py-20 lg:py-28`}>
            <Reveal>
              <div className="flex items-center gap-2 text-sm font-medium text-trilegal-primary">
                <Search className="h-4 w-4" strokeWidth={1.5} />
                Research
              </div>
              <h2 className={`mt-4 max-w-[24ch] ${H2}`}>
                Five sources answer the same query at once.
              </h2>
              <p className={`mt-6 max-w-[60ch] ${LEDE}`}>
                One search runs across the public reporters, the subscription databases and your own
                repository together. Every result carries the database it came from, so you always
                know whether an authority is public record or internal work product.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-4 lg:grid-cols-6">
              {/* Cell 1: span 4, image. */}
              <Reveal className="lg:col-span-4">
                <div className="flex h-full flex-col overflow-hidden rounded-lg border border-trilegal-border bg-trilegal-card">
                  <div className="h-48 w-full overflow-hidden sm:h-60">
                    <img
                      src="https://images.unsplash.com/photo-1618972677284-1d89b5f526c3?auto=format&fit=crop&w=1200&h=640&q=80"
                      alt="Rows of labelled archive folders packed along office shelves"
                      width={1200}
                      height={640}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6 lg:p-7">
                    <Library className="h-5 w-5 text-trilegal-primary" strokeWidth={1.5} />
                    <p className="mt-4 text-xs tracking-wide text-trilegal-muted" style={MONO}>
                      {SOURCES[0].name}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-trilegal-muted">
                      {SOURCES[0].body}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Cell 2: span 2, accent tint. */}
              <Reveal delay={0.06} className="lg:col-span-2">
                <div className="flex h-full flex-col rounded-lg border border-trilegal-primaryPale bg-trilegal-primaryPale/60 p-6 lg:p-7">
                  <Landmark className="h-5 w-5 text-trilegal-navyBlue" strokeWidth={1.5} />
                  <p className="mt-4 text-xs tracking-wide text-trilegal-navyBlue" style={MONO}>
                    {SOURCES[1].name}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-trilegal-navyBlue">
                    {SOURCES[1].body}
                  </p>
                </div>
              </Reveal>

              {/* Cells 3 to 5: span 2 each, plain surface. */}
              {SOURCES.slice(2).map((source, i) => {
                const Icon = source.icon;
                return (
                  <Reveal key={source.name} delay={0.06 * (i + 2)} className="lg:col-span-2">
                    <div className="flex h-full flex-col rounded-lg border border-trilegal-border bg-trilegal-card p-6 lg:p-7">
                      <Icon className="h-5 w-5 text-trilegal-primary" strokeWidth={1.5} />
                      <p className="mt-4 text-xs tracking-wide text-trilegal-muted" style={MONO}>
                        {source.name}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-trilegal-muted">
                        {source.body}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. DRAFTING. Image plus text split, image left, mirrored against the hero. */}
        <section id="drafting" className="scroll-mt-16 border-b border-trilegal-border">
          <div className={`${SHELL} py-20 lg:py-28`}>
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <div className="h-[300px] w-full overflow-hidden rounded-lg border border-trilegal-border lg:h-[520px]">
                  <img
                    src="https://images.unsplash.com/photo-1732408425578-464d66066441?auto=format&fit=crop&w=900&h=1125&q=80"
                    alt="A pen resting on a stack of printed pages"
                    width={900}
                    height={1125}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>

              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal>
                  {/* No eyebrow here. Research (section 3) carries one, and §4.7
                      bars the next two sections from carrying another, so the
                      subject is named in the headline instead. */}
                  <h2 className={`max-w-[22ch] ${H2}`}>
                    Drafting that opens with the citations already in it.
                  </h2>
                  <p className={`mt-6 max-w-[56ch] ${LEDE}`}>
                    Pick the instrument, the court and the register, then hand the studio your brief
                    facts and the issues. What comes back is a working draft built on the authorities
                    you collected during research, not on invented ones.
                  </p>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-10 text-xs uppercase tracking-wider text-trilegal-muted">
                    Instruments
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {TEMPLATES.map((t) => (
                      <li
                        key={t}
                        className="rounded-lg border border-trilegal-border bg-trilegal-card px-3 py-1.5 text-sm text-trilegal-text"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 text-xs uppercase tracking-wider text-trilegal-muted">
                    Register
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {TONES.map((t) => (
                      <li
                        key={t}
                        className="rounded-lg border border-trilegal-border bg-trilegal-card px-3 py-1.5 text-sm text-trilegal-text"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 text-sm leading-relaxed text-trilegal-muted">
                    Every draft moves through three states, so a partner always knows what they are
                    looking at:{" "}
                    <span className="text-trilegal-text" style={MONO}>
                      Draft
                    </span>
                    ,{" "}
                    <span className="text-trilegal-text" style={MONO}>
                      Under Partner Review
                    </span>
                    ,{" "}
                    <span className="text-trilegal-text" style={MONO}>
                      Finalized
                    </span>
                    .
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 5. RISK. Sticky left explainer against a tall right column. */}
        <section id="risk" className="scroll-mt-16 border-b border-trilegal-border">
          <div className={`${SHELL} py-20 lg:py-28`}>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <Reveal>
                    <h2 className={`max-w-[22ch] ${H2}`}>
                      Case risk, scored by an algorithm you can read.
                    </h2>
                    <p className={`mt-6 max-w-[48ch] ${LEDE}`}>
                      Risk is not a language model&apos;s opinion. Three inputs go in, a level and a
                      confidence figure come out, and the same matter scores the same way every
                      time. Where the level came from is written out in full alongside it.
                    </p>
                    <div className="mt-8 rounded-lg border border-trilegal-border bg-trilegal-card p-5">
                      <p className="text-xs uppercase tracking-wider text-trilegal-muted">
                        Output
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-trilegal-muted">
                        A level of{" "}
                        <span className="text-trilegal-text" style={MONO}>
                          HIGH
                        </span>
                        ,{" "}
                        <span className="text-trilegal-text" style={MONO}>
                          MEDIUM
                        </span>{" "}
                        or{" "}
                        <span className="text-trilegal-text" style={MONO}>
                          LOW
                        </span>
                        , a confidence percentage, the contributing factors ranked by impact, and a
                        written explanation.
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                {RISK_INPUTS.map((input, i) => (
                  <Reveal key={input.label} delay={0.06 * i}>
                    <div className="border-t border-trilegal-border py-8 first:border-t-0 first:pt-0">
                      <p className="text-xs tracking-wide text-trilegal-primary" style={MONO}>
                        {input.field}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">
                        {input.label}
                      </h3>
                      <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-trilegal-muted">
                        {input.body}
                      </p>
                    </div>
                  </Reveal>
                ))}

                <Reveal delay={0.2}>
                  <div className="mt-4 rounded-lg border border-trilegal-primaryPale bg-trilegal-primaryPale/60 p-6">
                    <p className="text-xs uppercase tracking-wider text-trilegal-navyBlue">
                      Illustrative, from the demo data set
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-trilegal-navyBlue">
                      The sample matter{" "}
                      <span className="font-medium">
                        R.K. Developers vs. State of Maharashtra
                      </span>{" "}
                      returns{" "}
                      <span style={MONO}>HIGH</span> at <span style={MONO}>93%</span> confidence.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-trilegal-navyBlue">
                      Both figures come from the fabricated demo record, not from a real docket.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* 6. ORBITX. Horizontal scroll-snap rail, CSS only, five dimensions. */}
        <section id="orbitx" className="scroll-mt-16 border-b border-trilegal-border">
          <div className="py-20 lg:py-28">
            <div className={SHELL}>
              <Reveal>
                <div className="flex items-center gap-2 text-sm font-medium text-trilegal-primary">
                  <TrendingUp className="h-4 w-4" strokeWidth={1.5} />
                  OrbitX
                </div>
                <h2 className={`mt-4 max-w-[26ch] ${H2}`}>
                  Staffing as a measurement, not a recollection.
                </h2>
                <p className={`mt-6 max-w-[62ch] ${LEDE}`}>
                  OrbitX keeps four measurements on every lawyer in the firm, and scores the match
                  when it recommends a team for a matter. Each recommendation arrives with the
                  reason attached, which is what makes it arguable in a partners&apos; meeting.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className={SHELL}>
                <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
                  {ORBITX.map((d) => (
                    <article
                      key={d.metric}
                      className="min-w-[280px] max-w-[320px] flex-1 snap-start rounded-lg border border-trilegal-border bg-trilegal-card p-6"
                    >
                      <Users className="h-5 w-5 text-trilegal-primary" strokeWidth={1.5} />
                      <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em]">{d.metric}</h3>
                      <p className="mt-1.5 text-xs tracking-wide text-trilegal-muted" style={MONO}>
                        {d.unit}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-trilegal-muted">{d.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 7. BRIEF. Full-bleed editorial image, caption below, no overlaid text. */}
        <section className="border-b border-trilegal-border">
          <div className="py-20 lg:py-28">
            <div className={SHELL}>
              <Reveal>
                <h2 className={`max-w-[24ch] ${H2}`}>
                  Research that ends in a brief, not in forty open tabs.
                </h2>
                <p className={`mt-6 max-w-[62ch] ${LEDE}`}>
                  Any judgment you find can be added to the active brief as you read it, with its
                  citation, the takeaways and the sections it turns on. The brief travels with the
                  matter, so the drafting studio pulls from the same collection you built during
                  research.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="mt-12 h-[240px] w-full overflow-hidden sm:h-[320px] lg:h-[420px]">
                <img
                  src="https://images.unsplash.com/photo-1600904290455-241ce18f78bb?auto=format&fit=crop&w=2000&h=840&q=80"
                  alt="A long library aisle receding between tall shelves of bound volumes"
                  width={2000}
                  height={840}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className={SHELL}>
                <p className="mt-4 max-w-[70ch] text-sm text-trilegal-muted">
                  The demo ships with ten reported judgments, including Maneka Gandhi vs. Union of
                  India (1978), K.S. Puttaswamy vs. Union of India (2017) and Vidya Drolia vs. Durga
                  Trading Corporation (2021). All three are public record.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 8. HONESTY. Two grouped columns, chunked because each list exceeds a glance. */}
        <section className="border-b border-trilegal-border">
          <div className={`${SHELL} py-20 lg:py-28`}>
            <Reveal>
              <h2 className={`max-w-[24ch] ${H2}`}>
                What this demo does, and what it does not.
              </h2>
              <p className={`mt-6 max-w-[60ch] ${LEDE}`}>
                Trilegal AI is a working prototype, not a deployed product. It is worth being exact
                about that before you open it, because the distinction matters more to a firm than to
                almost anyone else.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              <Reveal>
                <div className={`h-full ${CARD}`}>
                  <ClipboardCheck className="h-5 w-5 text-trilegal-primary" strokeWidth={1.5} />
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em]">
                    What runs in the demo
                  </h3>
                  <ul className="mt-5 space-y-4">
                    {DEMO_IS.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-trilegal-muted">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-trilegal-primary"
                          strokeWidth={1.5}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className={`h-full ${CARD}`}>
                  <Lock className="h-5 w-5 text-trilegal-primary" strokeWidth={1.5} />
                  <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em]">
                    What is not in the demo
                  </h3>
                  <ul className="mt-5 space-y-4">
                    {DEMO_IS_NOT.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-trilegal-muted">
                        <ShieldCheck
                          className="mt-0.5 h-4 w-4 shrink-0 text-trilegal-primary"
                          strokeWidth={1.5}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 9. CLOSE. Centered panel, single accent surface, one CTA label reused. */}
        <section className="border-b border-trilegal-border">
          <div className={`${SHELL} py-20 lg:py-28`}>
            <Reveal>
              <div className="mx-auto max-w-3xl rounded-lg border border-trilegal-border bg-trilegal-card p-8 text-center shadow-card lg:p-14">
                <h2 className={`mx-auto max-w-[22ch] ${H2}`}>
                  Open it and put a real matter through it.
                </h2>
                <p className={`mx-auto mt-5 max-w-[52ch] ${LEDE}`}>
                  Search the sources, add what you find to a brief, generate a draft from it and see
                  which team OrbitX recommends. The whole loop takes a few minutes.
                </p>

                <div className="mt-8 flex justify-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-lg bg-trilegal-primary px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-trilegal-navyBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trilegal-primary"
                  >
                    Open the demo
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </div>

                <p className="mx-auto mt-8 max-w-[48ch] border-t border-trilegal-border pt-6 text-sm text-trilegal-muted">
                  Demo mode. Credentials are pre-filled on the sign-in screen, and every matter you
                  see is simulated.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={`${SHELL} flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between`}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-trilegal-text">
            <Scale className="h-3.5 w-3.5 text-white" strokeWidth={1.5} />
          </span>
          <span className="text-sm font-medium tracking-[-0.01em]">TRILEGAL AI</span>
        </div>
        <p className="text-sm text-trilegal-muted">
          Demo application running on simulated data. Copyright 2026.
        </p>
      </footer>
    </div>
  );
}
