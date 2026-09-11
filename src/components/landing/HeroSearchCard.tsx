"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, ClipboardCheck, Landmark, Search } from "lucide-react";

/**
 * Hero asset: the unified-search result surface, played once on mount.
 *
 * The motion is the argument the section makes, in order: a real query is
 * entered, it fans out across the five sources, one reported judgment comes
 * back, and the result carries into the brief. Nothing loops, nothing moves
 * after the sequence settles, and every value on the card is public record.
 *
 * Collapses to the finished state under prefers-reduced-motion.
 */

const MONO = { fontFamily: "var(--font-landing-mono), ui-monospace, monospace" };
const EASE = [0.16, 1, 0.3, 1] as const;

const QUERY = "arbitrary stop-work order, Article 14";

/* Labels are the `database` union in src/types/legal.ts, shortened to fit the chip. */
const SOURCES = [
  "Firm Repository",
  "Indian Kanoon",
  "SCC Online",
  "Manupatra",
  "Westlaw",
] as const;

const START_MS = 420; // lets the card finish landing before the caret appears
const TYPE_MS = 26; // per character, so the query takes about a second
const SEARCH_MS = 820; // scan line plus the five chips landing

type Phase = "idle" | "typing" | "searching" | "done";

const sourceList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const sourceChip: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

const resultBlock: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delayChildren: 0.14, staggerChildren: 0.08 },
  },
};

const resultLine: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export default function HeroSearchCard() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (reduce) {
      setTyped(QUERY);
      setPhase("done");
      return;
    }

    let cancelled = false;
    const timeouts: number[] = [];
    let typer = 0;

    const later = (fn: () => void, ms: number) => {
      timeouts.push(
        window.setTimeout(() => {
          if (!cancelled) fn();
        }, ms)
      );
    };

    later(() => {
      setPhase("typing");
      let i = 0;
      typer = window.setInterval(() => {
        if (cancelled) return;
        i += 1;
        setTyped(QUERY.slice(0, i));
        if (i >= QUERY.length) {
          window.clearInterval(typer);
          setPhase("searching");
          later(() => setPhase("done"), SEARCH_MS);
        }
      }, TYPE_MS);
    }, START_MS);

    return () => {
      cancelled = true;
      timeouts.forEach(window.clearTimeout);
      window.clearInterval(typer);
    };
  }, [reduce]);

  const searching = phase === "searching" || phase === "done";

  return (
    <motion.div
      className="overflow-hidden rounded-lg border border-trilegal-border bg-trilegal-card shadow-card"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
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
        <div className="relative flex items-center gap-2.5 overflow-hidden rounded-lg border border-trilegal-border bg-trilegal-bg px-3.5 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-trilegal-muted" strokeWidth={1.5} aria-hidden />

          {/* The typed string is announced once in full rather than character by character. */}
          <span className="sr-only">{QUERY}</span>
          <span
            aria-hidden
            className="flex min-w-0 items-center text-[13px] text-trilegal-text"
          >
            <span className="truncate">{typed}</span>
            {phase === "typing" && (
              <motion.span
                className="ml-px inline-block h-[1.05em] w-px shrink-0 bg-trilegal-primary"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
              />
            )}
          </span>

          {/* Scan line: the query is out to the sources, and nothing has returned yet. */}
          {phase === "searching" && (
            <motion.span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px origin-left bg-trilegal-primary"
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: [1, 1, 0] }}
              transition={{
                scaleX: { duration: 0.72, ease: EASE },
                opacity: { duration: 0.72, times: [0, 0.72, 1] },
              }}
            />
          )}
        </div>

        <motion.div
          className="mt-3.5 grid grid-cols-2 gap-1.5 sm:grid-cols-3"
          variants={sourceList}
          initial={reduce ? false : "hidden"}
          animate={searching ? "visible" : "hidden"}
        >
          {SOURCES.map((source) => (
            <motion.span
              key={source}
              variants={sourceChip}
              className="truncate rounded-lg border border-trilegal-border px-2 py-1 text-center text-[11px] text-trilegal-muted"
              style={MONO}
            >
              {source}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="mt-5 border-t border-trilegal-border bg-trilegal-bg/60 px-5 py-5"
        variants={resultBlock}
        initial={reduce ? false : "hidden"}
        animate={phase === "done" ? "visible" : "hidden"}
      >
        <motion.div variants={resultLine} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-trilegal-primaryPale">
            <Landmark className="h-4 w-4 text-trilegal-navyBlue" strokeWidth={1.5} aria-hidden />
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
        </motion.div>

        <motion.p
          variants={resultLine}
          className="mt-4 text-[13px] leading-relaxed text-trilegal-muted"
        >
          Procedure that deprives a person of liberty or of a right must be just, fair and
          reasonable. Arbitrary executive discretion fails Article 14.
        </motion.p>

        <motion.div variants={resultLine} className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-trilegal-border bg-trilegal-card px-2 py-1 text-[11px] text-trilegal-muted">
            <Check className="h-3 w-3 text-trilegal-primary" strokeWidth={1.5} aria-hidden />
            Verified public record
          </span>
          <span
            className="rounded-lg border border-trilegal-border bg-trilegal-card px-2 py-1 text-[11px] text-trilegal-muted"
            style={MONO}
          >
            SCC Online (Demo)
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex items-center gap-2 border-t border-trilegal-border px-5 py-3.5 text-xs text-trilegal-muted"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: phase === "done" ? 1 : 0 }}
        transition={{ duration: 0.45, ease: EASE, delay: phase === "done" ? 0.42 : 0 }}
      >
        <ClipboardCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden />
        Carried into the active brief with its citation attached.
      </motion.div>
    </motion.div>
  );
}
