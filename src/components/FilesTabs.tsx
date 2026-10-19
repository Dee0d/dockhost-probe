import { useState } from "react";
import { FILES } from "../data/deploy";
import { CodeBlock } from "./CodeBlock";
import { cn } from "../utils/cn";

export function FilesTabs() {
  const [active, setActive] = useState(0);
  const file = FILES[active];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap gap-2">
        {FILES.map((f, i) => (
          <button
            key={f.name}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-lg border px-3 py-1.5 font-mono text-[12.5px] transition",
              i === active
                ? "border-violet-400/50 bg-violet-500/20 text-white"
                : "border-white/10 bg-white/5 text-slate-400 hover:border-white/25 hover:text-slate-200",
            )}
          >
            {f.name}
          </button>
        ))}
      </div>

      <p className="mb-4 text-[14px] leading-relaxed text-slate-300">{file.desc}</p>

      <CodeBlock code={file.text} lang={file.lang} />

      <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-slate-400">
          Что здесь написано простыми словами
        </p>
        <ul className="space-y-1.5">
          {file.notes.map((n, i) => (
            <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-slate-300">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/70" />
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
