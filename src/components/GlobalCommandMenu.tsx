"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Scale,
  Search,
  FolderKanban,
  FileEdit,
  TrendingUp,
  BookOpen,
  PlusCircle,
  Users,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function GlobalCommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { cases, researchResults, lawyers } = useApp();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command, search cases, precedents, or counsel..." />
      <CommandList>
        <CommandEmpty>No results found in Trilegal repositories.</CommandEmpty>

        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => runCommand(() => router.push("/app/cases/new"))}
          >
            <PlusCircle className="mr-2 h-4 w-4 text-emerald-600" />
            <span>Create New Case Intake (OrbitX Risk)</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/app/research"))}
          >
            <Search className="mr-2 h-4 w-4 text-blue-600" />
            <span>Search Legal Research Database</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/app/drafting"))}
          >
            <FileEdit className="mr-2 h-4 w-4 text-indigo-600" />
            <span>Open AI Legal Drafting Studio</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/app/orbitx"))}
          >
            <TrendingUp className="mr-2 h-4 w-4 text-purple-600" />
            <span>Open OrbitX Professional Growth Analytics</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Active Case Dockets">
          {cases.slice(0, 4).map((c) => (
            <CommandItem
              key={c.id}
              onSelect={() => runCommand(() => router.push(`/app/cases/${c.id}`))}
            >
              <FolderKanban className="mr-2 h-4 w-4 text-slate-500" />
              <div className="flex flex-col">
                <span className="font-semibold text-slate-900">{c.title}</span>
                <span className="text-[10px] text-slate-400">
                  {c.riskLevel} RISK &bull; {c.court}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Landmark Precedents">
          {researchResults.slice(0, 4).map((j) => (
            <CommandItem
              key={j.id}
              onSelect={() =>
                runCommand(() => router.push(`/app/research/judgment/${j.id}`))
              }
            >
              <Scale className="mr-2 h-4 w-4 text-blue-600" />
              <div className="flex flex-col">
                <span className="font-semibold text-slate-900">{j.title}</span>
                <span className="text-[10px] text-slate-400">
                  {j.citation} &bull; {j.court}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Firm Counsel">
          {lawyers.slice(0, 3).map((l) => (
            <CommandItem
              key={l.id}
              onSelect={() =>
                runCommand(() => router.push(`/app/orbitx/report/${l.id}`))
              }
            >
              <Users className="mr-2 h-4 w-4 text-purple-600" />
              <span>
                {l.name} ({l.role})
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
