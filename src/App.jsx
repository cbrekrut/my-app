import React, { useMemo, useState } from "react";
import {
  Check,
  ShieldCheck,
  Zap,
  LineChart,
  Users,
  PhoneCall,
  MessageSquare,
  Calendar,
  ClipboardList,
  BadgeCheck,
  Car,
  ArrowRight,
  Lock,
  Timer,
  Gift,
  Star,
} from "lucide-react";
import logo from "./assets/logo.png";
const BRAND = {
  name: "N3S@Agency",
  phone: "+7 (911) 913-26-28",
  telegram: "@n3s_agency",
  accent: "text-blue-700",

  legal: {
    fullName:
      'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "НЕЙРОСЕТЕВЫЕ ЭЛЕКТРОННЫЕ СИСТЕМЫ"',
    address:
      "170043, Тверская обл, г.о. город Тверь, г Тверь, ул Оснабрюкская, д. 49",
    inn: "6900020040",
    ogrn: "1256900003250",
    kpp: "690001001",
  },

  policyHref: "?policy=1",
};

const BITRIX_DEAL_ADD_URL =
  "https://nes.bitrix24.ru/rest/24/re4s0rw2fusl4wuk/crm.deal.add.json";
const cn = (...a) => a.filter(Boolean).join(" ");

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
      {children}
    </span>
  );
}

function Card({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        "hover:shadow-md transition-shadow",
        className
      )}
    >
      {children}
    </div>
  );
}

function CookieBanner({ policyHref = BRAND.policyHref }) {
  const KEY = "cookie_consent_v1";
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (!saved) setOpen(true);
    } catch (e) {
      // если localStorage недоступен — показываем баннер
      setOpen(true);
    }
  }, []);

  const save = (value) => {
    try {
      localStorage.setItem(KEY, value); // "all" | "necessary"
    } catch (e) {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-slate-200 bg-white/95 backdrop-blur shadow-lg p-4 sm:p-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="min-w-0">
              <div className="text-sm font-extrabold text-slate-900">
                Мы используем cookie и аналитические сервисы
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Мы используем cookie для корректной работы сайта, а также сервисы аналитики
                (например, Яндекс.Метрика) для улучшения качества сервиса и маркетинга.
                Вы можете принять все cookie или оставить только необходимые.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:justify-end lg:shrink-0">
              <a
                href={policyHref}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-50 transition"
              >
                Политика
              </a>

              <button
                type="button"
                onClick={() => save("necessary")}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-50 transition"
              >
                Только необходимые
              </button>

              <button
                type="button"
                onClick={() => save("all")}
                className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800 transition"
              >
                Принять
              </button>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-500 leading-relaxed">
            Продолжая использовать сайт, вы соглашаетесь с использованием cookie в соответствии с политикой.
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ kicker, title, desc }) {
  return (
    <div className="max-w-3xl">
      {kicker ? (
        <div className="mb-3">
          <Pill>{kicker}</Pill>
        </div>
      ) : null}
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-slate-600 leading-relaxed">{desc}</p>
      ) : null}
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-slate-800">{label}</span>
        {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
      </div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3",
        "text-slate-900 placeholder:text-slate-400",
        "focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300",
        "transition",
        props.className
      )}
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3",
        "text-slate-900",
        "focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300",
        "transition",
        props.className
      )}
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full min-h-[110px] rounded-xl border border-slate-200 bg-white px-4 py-3",
        "text-slate-900 placeholder:text-slate-400",
        "focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-300",
        "transition",
        props.className
      )}
    />
  );
}

function PrimaryButton({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl",
        "bg-blue-700 px-5 py-3 text-sm font-bold text-white",
        "hover:bg-blue-800 active:bg-blue-900",
        "focus:outline-none focus:ring-4 focus:ring-blue-200",
        "transition",
        className
      )}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl",
        "border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900",
        "hover:bg-slate-50 active:bg-slate-100",
        "focus:outline-none focus:ring-4 focus:ring-blue-100",
        "transition",
        className
      )}
    >
      {children}
    </button>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
      <div className="text-2xl font-extrabold text-blue-800">{value}</div>
      <div className="mt-1 text-sm text-slate-700">{label}</div>
    </div>
  );
}

function Benefit({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100">
        <Icon className="h-5 w-5 text-blue-700" />
      </div>
      <div>
        <div className="font-bold text-slate-900">{title}</div>
        <div className="mt-1 text-sm text-slate-600 leading-relaxed">{text}</div>
      </div>
    </div>
  );
}

function Step({ n, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-900 font-extrabold">
        {n}
      </div>
      <div>
        <div className="font-bold text-slate-900">{title}</div>
        <div className="mt-1 text-sm text-slate-600 leading-relaxed">{text}</div>
      </div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700">
      <BadgeCheck className="h-4 w-4 text-blue-700" />
      {children}
    </div>
  );
}

function AnchorLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-sm font-semibold text-slate-700 hover:text-slate-900"
    >
      {children}
    </a>
  );
}
function PrivacyPolicyPage() {
  const L = BRAND.legal;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50 text-slate-900">
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <div className="font-extrabold">Политика конфиденциальности</div>
          <a
            href="/"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            ← На главную
          </a>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <Card className="p-7">
          <div className="text-sm text-slate-600 leading-relaxed space-y-4">
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и
              защиты персональных данных пользователей, оставляющих заявки на сайте.
            </p>

            <div className="space-y-2">
              <div className="font-extrabold text-slate-900">1. Оператор</div>
              <div>
                <div className="font-semibold text-slate-800">{L.fullName}</div>
                <div className="mt-1">Юридический адрес: {L.address}</div>
                <div className="mt-1">
                  ИНН: {L.inn} • КПП: {L.kpp} • ОГРН: {L.ogrn}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-extrabold text-slate-900">2. Какие данные мы собираем</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Имя, телефон, город, комментарий (если указан).</li>
                <li>
                  Технические данные (cookie, IP, сведения о браузере) — для
                  аналитики и улучшения работы сайта.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-extrabold text-slate-900">3. Цели обработки</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Связаться с вами по заявке и предоставить материалы/план внедрения.</li>
                <li>Подготовить коммерческое предложение и консультацию.</li>
                <li>Улучшать качество сервиса и маркетинговых коммуникаций.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-extrabold text-slate-900">4. Правовые основания</div>
              <p>
                Обработка осуществляется на основании вашего согласия (проставление
                галочки в форме) и/или для заключения и исполнения договора.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-extrabold text-slate-900">5. Передача третьим лицам</div>
              <p>
                Мы не передаём ваши контакты третьим лицам, за исключением случаев,
                когда это требуется по закону или необходимо для оказания услуги
                (например, сервисы связи/хостинга), при соблюдении мер защиты.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-extrabold text-slate-900">6. Срок хранения</div>
              <p>
                Данные хранятся не дольше, чем необходимо для целей обработки, либо
                в сроки, установленные законодательством.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-extrabold text-slate-900">7. Ваши права</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Запросить доступ, уточнение или удаление ваших данных.</li>
                <li>Отозвать согласие на обработку.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-extrabold text-slate-900">8. Контакты</div>
              <p>
                По вопросам обработки данных: {BRAND.phone}, Telegram: {BRAND.telegram}.
              </p>
            </div>

            <div className="pt-3 text-xs text-slate-500">
              Дата публикации политики: {new Date().toLocaleDateString("ru-RU")}
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
export default function App() {
  const [sending, setSending] = useState(false);
   const showPolicy =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("policy") === "1";
  if (showPolicy) return <PrivacyPolicyPage />;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    fleet: "до 10",
    goal: "Хочу больше заявок",
    channel: "Авито / агрегаторы",
    note: "",
    consent: true,
  });

  const leadMagnetOptions = useMemo(
    () => [
      {
        id: "template",
        title: "Шаблон CRM для аренды авто под такси",
        desc: "Готовые стадии сделки, задачи менеджеру, шаблоны сообщений и отчёты.",
        icon: ClipboardList,
        value: "Шаблон CRM",
      },
    ],
    []
  );

  const [leadMagnet, setLeadMagnet] = useState(leadMagnetOptions[0].value);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
  e.preventDefault();
  if (sending) return;
  if (!form.consent) return;

  setSending(true);

  const commentLines = [
    `Подарок: ${leadMagnet}`,
    `Имя: ${form.name || "-"}`,
    `Телефон: ${form.phone || "-"}`,
    `Город: ${form.city || "-"}`,
    `Размер автопарка: ${form.fleet || "-"}`,
    form.note ? `Комментарий: ${form.note}` : null,
    "",
    "Источник: Лендинг аренды авто под такси",
    `Страница: ${
      typeof window !== "undefined" ? window.location.href : "-"
    }`,
  ].filter(Boolean);

  const fields = {
    TITLE: `Лид: аренда авто под такси — ${form.city || "без города"} — ${
      form.fleet || ""
    }`,
    NAME: form.name,
    COMMENTS: commentLines.join("\n"),
    SOURCE_ID: "WEB",
    CATEGORY_ID: 0
  };
  const payload = { fields };

  try {
    const res = await fetch(BITRIX_DEAL_ADD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || data?.error) {
      console.error("Bitrix error:", data);
      alert(
        `Ошибка отправки в Bitrix24: ${
          data?.error_description || data?.error || "unknown"
        }`
      );
      return;
    }
    console.log("Deal created:", data.result);

    setSent(true);
    setTimeout(() => setSent(false), 4500);
  } catch (err) {
    console.error(err);
    alert("Не удалось отправить заявку. Проверьте интернет/доступ к Bitrix24.");
  } finally {
    setSending(false);
  }};
  return (
<div className="min-h-screen bg-gradient-to-b from-white via-white to-slate-50 text-slate-900">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-white-700 flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="N3S Agency"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-extrabold">{BRAND.name}</div>
              <div className="text-xs text-slate-500">
                Bitrix24 для аренды авто под такси
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <AnchorLink href="#benefits">Выгоды</AnchorLink>
            <AnchorLink href="#how">Как внедрим</AnchorLink>
            <AnchorLink href="#cases">Результаты</AnchorLink>
            <AnchorLink href="#pricing">Пакеты</AnchorLink>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800 transition"
            >
              Получить подарок <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
     <header className="relative overflow-hidden">
      <div
        className="
          mx-auto max-w-7xl px-4
          pt-6 pb-10
          grid gap-8
          lg:grid-cols-2 lg:items-center
          min-h-[calc(100vh-72px)] lg:min-h-[calc(100vh-72px)]
        "
      >
    {/* LEFT */}
    <div className="min-w-0">
      <div className="flex flex-wrap gap-2">
        <Pill>
          <Zap className="h-3.5 w-3.5 mr-1" /> Внедрение за 7–14 дней
        </Pill>
        <Pill>
          <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Прозрачные отчёты
        </Pill>
        <Pill>
          <Car className="h-3.5 w-3.5 mr-1" /> Для автопарков под такси
        </Pill>
      </div>

      <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
        Bitrix24, который превращает заявки в аренды
        <span className="text-blue-700"> без хаоса и потерь</span>
      </h1>

      <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
        Настроим CRM под ваш цикл: лид → проверка → договор → выдача авто → оплаты →
        продление → возврат/ремонт. Автоматизируем Мессенджеры/телефонию, задачи
        менеджерам, напоминания водителям и отчёты по автопарку.
      </p>

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <a href="#cta">
          <PrimaryButton className="w-full sm:w-auto">
            Получить бесплатный аудит <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </a>
        <a href="#pricing">
          <SecondaryButton className="w-full sm:w-auto">
            Посмотреть пакеты
          </SecondaryButton>
        </a>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Badge>Интеграции: телефония, Мессенджеры, Авито, Google Sheets</Badge>
        <Badge>Права доступа, роли, SLA, обучение менеджеров</Badge>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Stat value="-25%" label="потерь заявок" />
        <Stat value="x1.6" label="скорость обработки" />
        <Stat value="≤ 2 дня" label="запуск отчётов" />
      </div>
    </div>

    {/* RIGHT (CTA) */}
    <div id = "cta" className="lg:pl-10 min-w-0">
      <div className="lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto pr-1">
        <Card className="p-6 sm:p-7 w-full">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-blue-700">
                Подарок на выбор
              </div>
              <div className="mt-1 text-xl font-extrabold">
                Получите пользу уже сегодня
              </div>
            </div>
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100">
              <Gift className="h-6 w-6 text-blue-700" />
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {leadMagnetOptions.map((m) => {
              const Icon = m.icon;
              const active = leadMagnet === m.value;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setLeadMagnet(m.value)}
                  className={cn(
                    "text-left rounded-2xl border p-4 transition",
                    active
                      ? "border-blue-300 bg-blue-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border",
                        active
                          ? "bg-white border-blue-200"
                          : "bg-blue-50 border-blue-100"
                      )}
                    >
                      <Icon className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-extrabold text-slate-900">
                        {m.title}
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        {m.desc}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <form onSubmit={submit} className="mt-4 grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Имя">
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван"
                  required
                />
              </Field>
              <Field
                label="Телефон"
              >
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7 999 000-00-00"
                  required
                />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Город">
                <Input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Санкт-Петербург"
                />
              </Field>
              <Field label="Размер автопарка">
                <Select
                  value={form.fleet}
                  onChange={(e) => setForm({ ...form, fleet: e.target.value })}
                >
                  <option>до 10</option>
                  <option>10–30</option>
                  <option>30–80</option>
                  <option>80+</option>
                </Select>
              </Field>
            </div>

            <Field label="Комментарий" hint="опционально">
              <Textarea
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="Например: хотим автоматом ставить задачи на проверку документов и напоминать о продлении аренды"
              />
            </Field>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-slate-300"
                required
              />
              <p className="text-xs text-slate-600 leading-relaxed">
                Согласен на обработку данных и получение материалов. Мы не
                передаём контакты третьим лицам.
              </p>
            </div>

            <PrimaryButton type="submit" className="w-full">
              Получить {leadMagnet.toLowerCase()}{" "}
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>

            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Lock className="h-4 w-4 text-blue-700" />
                Конфиденциально
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Timer className="h-4 w-4 text-blue-700" />
                Ответ ≤ 15 минут
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Star className="h-4 w-4 text-blue-700" />
                План внедрения
              </div>
            </div>

            {sent ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                <div className="font-extrabold">Заявка отправлена!</div>
                <div className="mt-1">
                  Мы свяжемся с вами и отправим выбранный материал.
                </div>
              </div>
            ) : null}
          </form>
        </Card>

        <div className="mt-4 text-center text-xs text-slate-500">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
        </div>
      </div>
    </div>
  </div>

  {/* soft background shapes */}
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-70" />
    <div className="absolute top-24 -left-24 h-72 w-72 rounded-full bg-sky-100 blur-3xl opacity-60" />
  </div>
</header>


      {/* Pain -> Solution */}
      <section className="mx-auto max-w-7xl px-4 py-12" id="benefits">
        <SectionTitle
          kicker="Почему заявки не доезжают до выдачи авто"
          title="Убираем 8 типичных проблем аренды авто под такси"
          desc="Bitrix24 фиксирует каждый контакт, ведёт менеджера по регламенту и автоматически дожимает клиента без ручной рутины."
        />

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <Benefit
              icon={PhoneCall}
              title="Звонки и мессенджеры не учитываются"
              text="Все обращения попадают в CRM: кто звонил, что писали, на каком этапе клиент сейчас."
            />
          </Card>
          <Card className="p-6">
            <Benefit
              icon={ClipboardList}
              title="Менеджеры забывают про задачи"
              text="Авто-задачи и чек-листы: проверка документов, бронь авто, договор, выдача, депозиты."
            />
          </Card>
          <Card className="p-6">
            <Benefit
              icon={Calendar}
              title="Нет контроля продлений"
              text="Напоминания водителям и менеджерам: продление аренды, оплата, техосмотр, страховка."
            />
          </Card>
          <Card className="p-6">
            <Benefit
              icon={Users}
              title="Срыв регламентов при росте"
              text="Роли, права и маршрутизация лидов: распределение по менеджерам, дежурство, SLA."
            />
          </Card>
          <Card className="p-6">
            <Benefit
              icon={LineChart}
              title="Нет цифр: кто продаёт, где простои"
              text="Дашборды: конверсия, стоимость заявки, простои по авто, дебиторка, эффективность менеджеров."
            />
          </Card>
          <Card className="p-6">
            <Benefit
              icon={Zap}
              title="Слишком много ручных действий"
              text="Автоматизации: статусы, шаблоны сообщений, автосмены стадий, триггеры и роботы."
            />
          </Card>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-extrabold">Что вы получите в итоге</div>
                <div className="mt-2 grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
                  {[
                    "Единая карточка клиента и договора",
                    "История платежей и продлений",
                    "Контроль выдачи/возврата авто",
                    "Регламент задач для менеджеров",
                    "Отчёты по воронке и конверсии",
                    "Точки контроля простоя и ремонтов",
                  ].map((t) => (
                    <div key={t} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-blue-700 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-semibold text-blue-700">Быстрый старт</div>
            <div className="mt-1 text-lg font-extrabold">Внедрение без боли</div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Берём ваш текущий процесс (таблицы/мессенджеры), упаковываем в
              воронку и запускаем автоматизацию.
            </p>
            <a href="#cta" className="mt-4 inline-block w-full">
              <PrimaryButton className="w-full">
                Забрать подарок <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </a>
          </Card>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-white border-y border-slate-200" id="how">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <SectionTitle
            kicker="Процесс"
            title="Как мы внедряем Bitrix24 для автопарка"
            desc="Чтобы вы быстро получили результат: сначала воронка и коммуникации, затем автоматизация и аналитика."
          />

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <Step
                n={1}
                title="Диагностика и карта процесса"
                text="Созвон 30–60 минут. Собираем этапы: заявки, проверки, договоры, выдача, оплаты, продления, возвраты, ремонты."
              />
            </Card>
            <Card className="p-6">
              <Step
                n={2}
                title="Настройка CRM и воронок"
                text="Лиды/сделки, карточки, поля, статусы, ответственные, права доступа. Импорт из таблиц/старых систем."
              />
            </Card>
            <Card className="p-6">
              <Step
                n={3}
                title="Коммуникации и автоматизация"
                text="Телефония/Мессенджеры, шаблоны сообщений, роботы, триггеры, авто-задачи, уведомления о продлении/оплате."
              />
            </Card>
            <Card className="p-6">
              <Step
                n={4}
                title="Отчёты и контроль качества"
                text="Дашборды: конверсия, скорость обработки, эффективность менеджеров, дебиторка. Контроль SLA."
              />
            </Card>
            <Card className="p-6">
              <Step
                n={5}
                title="Обучение и регламенты"
                text="Скрипты продаж, чек-листы, обучение команды. Чтобы система работала без “героев” и ручных напоминаний."
              />
            </Card>
            <Card className="p-6">
              <Step
                n={6}
                title="Поддержка и развитие"
                text="Берём задачи в работу пакетами часов: доработки, новые интеграции, улучшение аналитики и автоматизаций."
              />
            </Card>
          </div>

          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <div className="text-lg font-extrabold">Сквозные коммуникации</div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Фиксируем переписку и звонки в карточке сделки. Менеджеру
                    не нужно “помнить” — Bitrix24 напоминает и ведёт по сценарию.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Мессенджеры", "Телефония", "Email", "Формы сайта", "Avito"].map(
                      (t) => (
                        <Pill key={t}>{t}</Pill>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <LineChart className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <div className="text-lg font-extrabold">Аналитика для собственника</div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Сколько заявок пришло, кто обработал, где застряли, сколько
                    выдано авто, какая дебиторка и где простои.
                  </p>
                  <div className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
                    {["Конверсия по этапам", "Время ответа менеджера", "Выдачи/возвраты", "Оплаты и продления"].map(
                      (t) => (
                        <div key={t} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-blue-700 mt-0.5" />
                          <span>{t}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Results / Proof */}
      <section className="mx-auto max-w-7xl px-4 py-12" id="cases">
        <SectionTitle
          kicker="Результаты"
          title="Что обычно меняется после внедрения"
          desc="Показатели зависят от трафика и команды, но эффект почти всегда в дисциплине и скорости обработки."
        />

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          {[{
            title: "Скорость реакции",
            points: [
              "Авто-распределение лидов",
              "Скрипты + шаблоны сообщений",
              "Контроль SLA и просрочек",
            ],
            icon: Zap,
          },
          {
            title: "Конверсия в выдачу",
            points: [
              "Чек-лист документов",
              "Триггеры на оплату/депозит",
              "Дожим через напоминания",
            ],
            icon: BadgeCheck,
          },
          {
            title: "Контроль денег",
            points: [
              "Дебиторка и просрочки",
              "Продления и повторные оплаты",
              "Отчёты по менеджерам",
            ],
            icon: LineChart,
          }].map((c) => {
            const Icon = c.icon;
            return (
              <Card key={c.title} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold">{c.title}</div>
                    <div className="mt-3 grid gap-2 text-sm text-slate-700">
                      {c.points.map((p) => (
                        <div key={p} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-blue-700 mt-0.5" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-blue-700">
                  Mini-кейс (пример структуры)
                </div>
                <div className="mt-1 text-xl font-extrabold">
                  Автопарк 35 авто — дисциплина и рост выдач
                </div>
              </div>
              <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white">
                <Car className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="font-bold">До</div>
                <ul className="mt-2 space-y-2 text-slate-600">
                  <li>• заявки в мессенджерах и в звонках</li>
                  <li>• нет статусов и регламента</li>
                  <li>• сложно понять, кто виноват</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                <div className="font-bold">После</div>
                <ul className="mt-2 space-y-2 text-slate-700">
                  <li>• единая воронка + чек-лист</li>
                  <li>• авто-задачи и напоминания</li>
                  <li>• отчёты по конверсии и SLA</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm font-semibold text-blue-700">Гарантии</div>
            <div className="mt-1 text-xl font-extrabold">Безопасность и контроль</div>
            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              {[
                "Доступы по ролям, журнал действий",
                "Резервные копии и регламент",
                "Документация: что где настроено",
                "Обучение команды + видео/инструкции",
              ].map((t) => (
                <div key={t} className="flex items-start gap-2">
                  <ShieldCheck className="h-5 w-5 text-blue-700 mt-0.5" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <a href="#cta" className="mt-5 inline-block w-full">
              <PrimaryButton className="w-full">
                Получить план внедрения <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </a>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 border-y border-slate-200" id="pricing">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <SectionTitle
            kicker="Пакеты"
            title="Выберите формат внедрения"
            desc="Можно стартовать с базовой воронки и позже нарастить автоматизацию и аналитику."
          />

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <Card className="p-7">
              <div className="flex items-center justify-between">
                <div className="text-lg font-extrabold">Старт</div>
                <Pill>7–10 дней</Pill>
              </div>
              <div className="mt-2 text-sm text-slate-600">
                Быстро запускаем CRM и фиксируем обращения.
              </div>
              <div className="mt-5 space-y-3 text-sm">
                {["Воронка лидов/сделок", "Карточки и поля", "Импорт базы", "Шаблоны сообщений", "Базовые отчёты"].map(
                  (t) => (
                    <div key={t} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-blue-700 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  )
                )}
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs text-slate-500">Стоимость от</div>
                <div className="text-2xl font-extrabold">79 000 ₽</div>
              </div>
              <a href="#cta" className="mt-5 inline-block w-full">
                <PrimaryButton className="w-full">Хочу старт</PrimaryButton>
              </a>
            </Card>

            <Card className="p-7 border-blue-300 shadow-md">
              <div className="flex items-center justify-between">
                <div className="text-lg font-extrabold">Оптимум</div>
                <Pill>10–14 дней</Pill>
              </div>
              <div className="mt-2 text-sm text-slate-600">
                Полный цикл аренды + автоматизации.
              </div>
              <div className="mt-5 space-y-3 text-sm">
                {["Все из «Старт»", "Телефония/Мессенджеры интеграции", "Авто-задачи и чек-листы", "Триггеры продлений/оплат", "Отчёт по менеджерам"].map(
                  (t) => (
                    <div key={t} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-blue-700 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  )
                )}
              </div>
              <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
                <div className="text-xs text-blue-700 font-semibold">Самый популярный</div>
                <div className="text-2xl font-extrabold text-blue-900">149 000 ₽</div>
              </div>
              <a href="#cta" className="mt-5 inline-block w-full">
                <PrimaryButton className="w-full">Хочу оптимум</PrimaryButton>
              </a>
            </Card>

            <Card className="p-7">
              <div className="flex items-center justify-between">
                <div className="text-lg font-extrabold">Сквозной контроль</div>
                <Pill>2–4 недели</Pill>
              </div>
              <div className="mt-2 text-sm text-slate-600">
                Интеграции, финансы, BI и расширенная аналитика.
              </div>
              <div className="mt-5 space-y-3 text-sm">
                {["Все из «Оптимум»", "Сквозная аналитика по каналам", "Интеграции с таблицами/ERP", "BI-дашборды (опц.)", "Регламенты и контроль качества"].map(
                  (t) => (
                    <div key={t} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-blue-700 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  )
                )}
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-xs text-slate-500">Стоимость от</div>
                <div className="text-2xl font-extrabold">от 249 000 ₽</div>
              </div>
              <a href="#cta" className="mt-5 inline-block w-full">
                <PrimaryButton className="w-full">Нужен максимум</PrimaryButton>
              </a>
            </Card>
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <div className="text-lg font-extrabold">Поддержка после внедрения</div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Пакет 20 000 ₽ — 10 часов задач (до 2 часов каждая). Большие
                    задачи считаем отдельно. Ошибки по нашей вине исправляем бесплатно.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-sm font-semibold text-blue-700">Контакты</div>
              <div className="mt-2 grid gap-2 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-blue-700" />
                  <span className="font-semibold">{BRAND.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-700" />
                  <span className="font-semibold">{BRAND.telegram}</span>
                </div>
              </div>
              <a href="#cta" className="mt-4 inline-block w-full">
                <PrimaryButton className="w-full">Оставить заявку</PrimaryButton>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-12" id="faq">
        <SectionTitle
          kicker="FAQ"
          title="Частые вопросы"
          desc="Собрали короткие ответы по внедрению и интеграциям."
        />

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {[{
            q: "Можно ли начать без сложных интеграций?",
            a: "Да. Сначала фиксируем лиды, выстраиваем воронку и регламент. Интеграции (телефония/Мессенджеры/Avito) подключаем по мере готовности.",
          },
          {
            q: "Что нужно от нас для старта?",
            a: "Доступ администратора Bitrix24, описание процесса (как сейчас), примеры документов/договоров и список каналов заявок.",
          },
          {
            q: "Как вы меряете эффективность?",
            a: "Конверсия по этапам, время реакции, доля просрочек по задачам, стоимость лида (если есть данные), выдачи/продления/дебиторка.",
          },
          {
            q: "Мы уже пробовали CRM — не взлетело. Что по-другому?",
            a: "Мы внедряем через регламент и автоматизацию: чек-листы, триггеры, шаблоны сообщений, ответственность и контроль — чтобы менеджеру было легче работать в системе, чем вне неё.",
          }].map((x) => (
          <Card key={x.q} className="p-6">
            <div className="font-extrabold text-slate-900">{x.q}</div>
            <div className="mt-2 text-sm text-slate-600 leading-relaxed">
              {x.a}
            </div>
          </Card>
        ))}
        </div>

        <div className="mt-10">
          <Card className="p-7">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-sm font-semibold text-blue-700">
                  Готовы показать, как это будет выглядеть в вашей компании?
                </div>
                <div className="mt-1 text-2xl font-extrabold">
                  Получите план внедрения + подарок
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Созвон 15–30 минут — после дадим схему воронки и список
                  автоматизаций под ваш автопарк.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Без навязываний", "Конкретный план", "Сроки и бюджет"].map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <a href="#cta" className="w-full md:w-auto">
                  <PrimaryButton className="w-full md:w-auto">
                    Оставить заявку <ArrowRight className="h-4 w-4" />
                  </PrimaryButton>
                </a>
                <a href="#pricing" className="w-full md:w-auto">
                  <SecondaryButton className="w-full md:w-auto">
                    Пакеты и цены
                  </SecondaryButton>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-extrabold">
                N
              </div>
              <div>
                <div className="font-extrabold">{BRAND.name}</div>
                <div className="text-sm text-slate-600">
                  Внедрение и автоматизация Bitrix24 для аренды авто под такси
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#cta" className="inline-flex">
                <PrimaryButton>
                  Получить подарок <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </a>

              {/* ✅ ссылка на страницу политики */}
              <a
                href={BRAND.policyHref}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50 transition"
              >
                Политика конфиденциальности
              </a>
            </div>
          </div>

          {/* ✅ Контакты */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs text-slate-500">Телефон</div>
              <div className="mt-1 font-extrabold">{BRAND.phone}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs text-slate-500">Telegram</div>
              <div className="mt-1 font-extrabold">{BRAND.telegram}</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs text-slate-500">Режим</div>
              <div className="mt-1 font-extrabold">Ответ ≤ 15 минут</div>
            </div>
          </div>

          {/* ✅ Реквизиты компании */}
          <div className="mt-4">
            <Card className="p-6">
              <div className="text-sm font-semibold text-blue-700">
                Реквизиты
              </div>
              <div className="mt-2 grid gap-2 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">
                  {BRAND.legal.fullName}
                </div>
                <div>Юридический адрес: {BRAND.legal.address}</div>
                <div>
                  ИНН: <span className="font-semibold">{BRAND.legal.inn}</span>{" "}
                  • КПП: <span className="font-semibold">{BRAND.legal.kpp}</span>{" "}
                  • ОГРН: <span className="font-semibold">{BRAND.legal.ogrn}</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-xs text-slate-500">
            © {new Date().getFullYear()} {BRAND.name}. Все права защищены.
          </div>
        </div>
      </footer>
      <CookieBanner policyHref={BRAND.policyHref} />
    </div>
  );
}