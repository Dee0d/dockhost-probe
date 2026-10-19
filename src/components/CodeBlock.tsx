import { useState } from "react";
import { cn } from "../utils/cn";

type Props = {
  code: string;
  lang?: string;
  className?: string;
};

export function CodeBlock({ code, lang = "bash", className }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-[#0d0820]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-widest text-violet-300/70">
          {lang}
        </span>
        <button
          onClick={copy}
          className={cn(
            "rounded-md border px-2 py-1 font-mono text-[11px] transition",
            copied
              ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
              : "border-white/10 bg-white/5 text-slate-300 hover:border-violet-400/40 hover:text-white",
          )}
        >
          {copied ? "скопировано ✓" : "копировать"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 text-[12.5px] leading-relaxed">
        <code className="font-mono text-slate-200 whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}
