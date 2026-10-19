import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

const START = Date.now();

function useUptime() {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setSec(Math.floor((Date.now() - START) / 1000)), 1000);
    return () => window.clearInterval(t);
  }, []);
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

type Health = "checking" | "ok" | "missing";

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/5 py-2 last:border-0">
      <span className="shrink-0 text-xs uppercase tracking-wider text-slate-500">{label}</span>
      <span
        className={cn(
          "truncate text-right font-mono text-[13px]",
          accent ? "text-emerald-300" : "text-slate-200",
        )}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}

export function StatusPanel() {
  const uptime = useUptime();
  const [health, setHealth] = useState<Health>("checking");

  useEffect(() => {
    let alive = true;
    fetch("/healthz", { cache: "no-store" })
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((t) => alive && setHealth(t.trim().startsWith("ok") ? "ok" : "missing"))
      .catch(() => alive && setHealth("missing"));
    return () => {
      alive = false;
    };
  }, []);

  const loc = typeof window !== "undefined" ? window.location : ({} as Location);
  const secure = loc.protocol === "https:";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
      <div className="mb-3 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <h3 className="text-sm font-semibold tracking-wide text-white">Диагностика окружения</h3>
      </div>

      <Row label="Хост" value={loc.host || "—"} accent />
      <Row label="Протокол" value={secure ? "HTTPS · сертификат активен" : loc.protocol || "—"} accent={secure} />
      <Row label="Путь" value={loc.pathname || "/"} />
      <Row
        label="/healthz"
        value={
          health === "checking" ? "проверяю…" : health === "ok" ? "200 ok · nginx жив" : "не отвечает (dev-режим)"
        }
        accent={health === "ok"}
      />
      <Row label="Страница открыта" value={uptime} />
      <Row label="Загружена" value={new Date(START).toLocaleString("ru-RU")} />
      <Row
        label="Экран"
        value={typeof window !== "undefined" ? `${window.innerWidth}×${window.innerHeight}` : "—"}
      />

      {health === "missing" && (
        <p className="mt-3 rounded-lg border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-xs leading-relaxed text-amber-200/80">
          Страничка-проверка <span className="font-mono">/healthz</span> пока не отвечает — значит сайт открыт не с
          Dockhost. Это не ошибка: такую проверку умеет отдавать только программа nginx внутри контейнера. После
          выкладки строка станет зелёной — по ней удобно убеждаться, что всё живо.
        </p>
      )}
    </div>
  );
}
