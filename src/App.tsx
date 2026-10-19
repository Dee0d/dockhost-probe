import { useState } from "react";
import { StatusPanel } from "./components/StatusPanel";
import { Steps } from "./components/Steps";
import { FilesTabs } from "./components/FilesTabs";
import { Glossary } from "./components/Glossary";
import { FAQ, FLOW } from "./data/deploy";
import { cn } from "./utils/cn";

function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-12">
      <p className="mb-1 font-mono text-[12px] uppercase tracking-[0.2em] text-violet-400/80">{eyebrow}</p>
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
      {lead && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-400">{lead}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      {FAQ.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-white/[0.03]"
          >
            <span className="text-[14.5px] font-medium text-slate-100">{item.q}</span>
            <span className={cn("shrink-0 text-slate-500 transition-transform", open === i && "rotate-45")}>
              +
            </span>
          </button>
          {open === i && (
            <p className="px-4 pb-4 text-[14px] leading-relaxed text-slate-400">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#07030f] text-slate-200 antialiased selection:bg-violet-500/40">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-violet-600/25 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.17]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
          }}
        />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#07030f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 text-sm shadow-lg shadow-violet-900/50">
              🐳
            </div>
            <div className="leading-tight">
              <div className="text-[13.5px] font-semibold text-white">Dockhost с нуля</div>
              <div className="font-mono text-[11px] text-slate-500">сайт-пробник</div>
            </div>
          </div>
          <nav className="hidden gap-5 text-[13px] text-slate-400 sm:flex">
            <a href="#how" className="transition hover:text-white">Как устроено</a>
            <a href="#steps" className="transition hover:text-white">Шаги</a>
            <a href="#words" className="transition hover:text-white">Словарь</a>
            <a href="#faq" className="transition hover:text-white">Если сломалось</a>
          </nav>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-5 pb-24">
        {/* герой */}
        <section className="pt-14 pb-4 sm:pt-20">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[12.5px] font-medium text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Эта страница уже работает внутри контейнера
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-[12.5px] font-medium text-violet-300">
              Docker на компьютер ставить не нужно
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl">
            Ваш первый сайт в интернете —{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
              без единой команды
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-slate-400">
            Это сайт-пробник для{" "}
            <span className="text-slate-200">dockhost.ru</span>. Всё, что нужно: браузер, бесплатный аккаунт
            на GitHub и около 300 ₽ на балансе Dockhost. Никакой чёрной консоли, никаких установок —
            платформа соберёт сайт у себя на серверах. Ниже — 10 шагов с объяснением каждого слова.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#steps"
              className="rounded-xl bg-violet-600 px-5 py-2.5 text-[14px] font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:bg-violet-500"
            >
              Начать с первого шага →
            </a>
            <a
              href="#words"
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-[14px] font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
            >
              Я не понимаю слова
            </a>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-4">
            <p className="text-[14px] leading-relaxed text-amber-100/85">
              <span className="font-semibold text-amber-300">Главное, что стоит понять сразу. </span>
              Docker — это способ упаковать сайт в «коробку», которая одинаково открывается на любом сервере.
              Эту коробку соберёт сам Dockhost: вы только кладёте файлы на GitHub и нажимаете кнопки в панели.
              Ставить что-либо себе на компьютер не требуется.
            </p>
          </div>
        </section>

        {/* как устроено */}
        <Section
          id="how"
          eyebrow="Общая картина"
          title="Что вообще будет происходить"
          lead="Четыре этапа. Прочитайте их один раз — дальше все шаги станут понятнее."
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {FLOW.map((f, i) => (
              <div
                key={f.title}
                className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-violet-400/30"
              >
                <div className="mb-2 text-2xl">{f.icon}</div>
                <div className="mb-1 font-mono text-[11px] text-violet-400/70">этап {i + 1}</div>
                <h3 className="mb-1.5 text-[14.5px] font-semibold text-white">{f.title}</h3>
                <p className="text-[13px] leading-relaxed text-slate-400">{f.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-[1.1fr_1fr]">
            <StatusPanel />
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "Нужно установить", v: "ничего", s: "хватит браузера" },
                { k: "Сколько времени", v: "~45 мин", s: "в первый раз" },
                { k: "Стоимость", v: "~100 ₽/мес", s: "почасовая оплата" },
                { k: "Обновление сайта", v: "правка на GitHub", s: "сайт обновится сам" },
              ].map((c) => (
                <div
                  key={c.k}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-violet-400/30"
                >
                  <div className="text-[11px] uppercase tracking-wider text-slate-500">{c.k}</div>
                  <div className="mt-1 text-[14px] font-semibold text-white">{c.v}</div>
                  <div className="mt-0.5 text-[12px] text-slate-500">{c.s}</div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* шаги */}
        <Section
          id="steps"
          eyebrow="Пошаговая инструкция"
          title="10 шагов от нуля до работающего сайта"
          lead="Каждый шаг раскрывается по клику: сначала объяснение «зачем», потом список кнопок, которые нужно нажать. Делайте строго по порядку и не торопитесь."
        >
          <Steps />
        </Section>

        {/* словарь */}
        <Section
          id="words"
          eyebrow="Словарь"
          title="Непонятные слова простым языком"
          lead="Если в инструкции встретилось слово, от которого становится тревожно — найдите его здесь. Нажмите на карточку, чтобы прочитать подробнее."
        >
          <Glossary />
        </Section>

        {/* файлы */}
        <Section
          id="files"
          eyebrow="Файлы проекта"
          title="Что лежит в репозитории и зачем"
          lead="Эти файлы уже готовы — менять их не нужно. Но полезно хотя бы примерно понимать, кто за что отвечает: тогда ошибки перестанут выглядеть магией."
        >
          <FilesTabs />
        </Section>

        {/* проблемы */}
        <Section
          id="faq"
          eyebrow="Если что-то пошло не так"
          title="Частые затыки новичков"
          lead="Почти все проблемы на старте — из этого списка. Сначала загляните сюда, а уже потом в поддержку."
        >
          <Faq />
        </Section>

        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-5">
          <h3 className="mb-2 text-[15px] font-semibold text-emerald-200">Куда идти дальше</h3>
          <p className="text-[14px] leading-relaxed text-emerald-50/70">
            Когда эта страница откроется по вашему адресу, попробуйте поменять заголовок: на GitHub откройте
            файл <span className="font-mono text-emerald-200">src/App.tsx</span>, нажмите карандашик,
            исправьте текст и сохраните. Через пару минут сайт обновится сам — это и есть тот самый момент,
            ради которого всё настраивалось.
          </p>
        </div>

        <footer className="mt-10 border-t border-white/5 pt-8 text-[13px] text-slate-500">
          <p>Сайт-пробник для Dockhost · собран из обычных файлов и раздаётся программой nginx.</p>
          <p className="mt-1">
            Официальные материалы:{" "}
            <a href="https://docs.dockhost.ru" target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300">
              документация
            </a>{" "}
            ·{" "}
            <a href="https://my.dockhost.ru" target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300">
              панель управления
            </a>{" "}
            ·{" "}
            <a href="https://github.com/dockhost/recipes" target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300">
              готовые примеры
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
