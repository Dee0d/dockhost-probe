import { useState } from "react";
import { GLOSSARY } from "../data/deploy";
import { cn } from "../utils/cn";

export function Glossary() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const list = GLOSSARY.filter((g) =>
    (g.term + " " + g.plain + " " + g.detail).toLowerCase().includes(q.toLowerCase().trim()),
  );

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Найти слово — например «порт» или «образ»"
        className="mb-4 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[14px] text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-violet-400/50"
      />

      <div className="grid gap-2.5 sm:grid-cols-2">
        {list.map((g) => {
          const isOpen = open === g.term;
          return (
            <button
              key={g.term}
              onClick={() => setOpen(isOpen ? null : g.term)}
              className={cn(
                "rounded-2xl border p-4 text-left transition",
                isOpen
                  ? "border-violet-400/40 bg-violet-500/[0.08] sm:col-span-2"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25",
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-[14.5px] font-semibold text-white">{g.term}</h4>
                <span className="shrink-0 text-[11px] text-slate-500">
                  {isOpen ? "свернуть" : "подробнее"}
                </span>
              </div>
              <p className="mt-1 text-[13.5px] leading-relaxed text-violet-200/80">{g.plain}</p>
              {isOpen && (
                <p className="mt-3 border-t border-white/10 pt-3 text-[13.5px] leading-relaxed text-slate-300">
                  {g.detail}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {list.length === 0 && (
        <p className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center text-[13.5px] text-slate-500">
          Ничего не нашлось. Попробуйте другое слово.
        </p>
      )}
    </div>
  );
}
