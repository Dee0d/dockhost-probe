import { useEffect, useState } from "react";
import { STEPS } from "../data/deploy";
import { CodeBlock } from "./CodeBlock";
import { cn } from "../utils/cn";

const KEY = "dockhost-probe-progress";

export function Steps() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<string | null>(STEPS[0].id);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const count = STEPS.filter((s) => done[s.id]).length;
  const pct = Math.round((count / STEPS.length) * 100);

  return (
    <div>
      <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-white">
            Пройдено шагов: {count} из {STEPS.length}
          </span>
          <span className="font-mono text-violet-300">{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-[12.5px] text-slate-500">
          Нажимайте на квадратик слева, когда шаг закончен — прогресс сохранится, даже если закроете вкладку.
        </p>
        {pct === 100 && (
          <p className="mt-3 text-sm text-emerald-300">
            🎉 Всё готово — ваш сайт работает в интернете. Теперь любое изменение файла на GitHub
            автоматически обновляет сайт.
          </p>
        )}
      </div>

      <ol className="space-y-3">
        {STEPS.map((step, i) => {
          const isDone = !!done[step.id];
          const isOpen = open === step.id;
          return (
            <li
              key={step.id}
              className={cn(
                "overflow-hidden rounded-2xl border transition",
                isDone
                  ? "border-emerald-400/30 bg-emerald-400/[0.04]"
                  : "border-white/10 bg-white/[0.03] hover:border-violet-400/30",
              )}
            >
              <div className="flex items-start gap-3 p-4">
                <button
                  onClick={() => toggle(step.id)}
                  aria-label="Отметить шаг выполненным"
                  className={cn(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold transition",
                    isDone
                      ? "border-emerald-400/50 bg-emerald-400/20 text-emerald-300"
                      : "border-white/15 bg-white/5 text-slate-400 hover:border-violet-400/50 hover:text-violet-300",
                  )}
                >
                  {isDone ? "✓" : i + 1}
                </button>

                <button onClick={() => setOpen(isOpen ? null : step.id)} className="flex-1 text-left">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3
                      className={cn(
                        "text-[15px] font-semibold",
                        isDone
                          ? "text-emerald-200/80 line-through decoration-emerald-400/40"
                          : "text-white",
                      )}
                    >
                      {step.title}
                    </h3>
                    <span className="rounded-md bg-violet-500/15 px-2 py-0.5 font-mono text-[11px] text-violet-300">
                      {step.where}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">≈ {step.minutes}</span>
                  </div>
                  {!isOpen && (
                    <p className="mt-1.5 line-clamp-1 text-[13px] text-slate-500">{step.why}</p>
                  )}
                </button>

                <span
                  className={cn("mt-1 select-none text-slate-500 transition-transform", isOpen && "rotate-180")}
                >
                  ▾
                </span>
              </div>

              {isOpen && (
                <div className="space-y-4 border-t border-white/5 px-4 pb-5 pt-4 sm:pl-14">
                  <p className="rounded-xl border border-violet-400/20 bg-violet-500/[0.07] px-3 py-2 text-[13.5px] leading-relaxed text-violet-100/85">
                    <span className="mr-1 font-semibold text-violet-300">Зачем это:</span>
                    {step.why}
                  </p>

                  {step.body.map((p, k) => (
                    <p key={k} className="text-[14px] leading-relaxed text-slate-300">
                      {p}
                    </p>
                  ))}

                  {step.clicks && (
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-slate-400">
                        Что нажимать
                      </p>
                      <ol className="space-y-1.5">
                        {step.clicks.map((c, k) => (
                          <li key={k} className="flex gap-2.5 text-[13.5px] leading-relaxed text-slate-300">
                            <span className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-[10px] text-slate-400">
                              {k + 1}
                            </span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {step.code && <CodeBlock code={step.code.text} lang={step.code.lang} />}

                  {step.tip && (
                    <p className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-3 py-2 text-[13px] leading-relaxed text-amber-100/85">
                      <span className="mr-1 font-semibold text-amber-300">Пояснение:</span>
                      {step.tip}
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
