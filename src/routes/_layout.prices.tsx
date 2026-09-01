import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { useI18n } from "@/lib/i18n";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_layout/prices")({
  component: Prices,
  head: () => ({
    meta: [
      { title: "Ціни" },
      { name: "description", content: "Орієнтовна вартість сонячних електростанцій під ключ." },
    ],
  }),
});

const plans = {
  ua: [
    {
      name: "5 кВт",
      tag: "Для дому",
      price: "140 000",
      perks: [
        "Панелі 550W ×10",
        "Гібридний інвертор 5кВт",
        "Кріплення K2",
        "Монтаж та пуско-налагодження",
        "Гарантія 25 років",
      ],
    },
    {
      name: "15 кВт",
      tag: "Для дому/малий бізнес",
      price: "410 000",
      featured: true,
      perks: [
        "Панелі 580W ×26",
        "Гібридний інвертор 15кВт",
        "Опція АКБ 15 кВт·год",
        "Монтаж під ключ",
        "Документи та реєстрація",
      ],
    },
    {
      name: "30 кВт+",
      tag: "Для бізнесу",
      price: "780 000",
      perks: [
        "Панелі 580W ×52",
        "Мережевий інвертор 30кВт",
        "Промислове кріплення",
        "Проєкт + документація",
        "Моніторинг 24/7",
      ],
    },
  ],
  en: [
    {
      name: "5 kW",
      tag: "For home",
      price: "140,000",
      perks: [
        "550 W panels ×10",
        "5 kW hybrid inverter",
        "K2 mounting",
        "Installation and commissioning",
        "25-year warranty",
      ],
    },
    {
      name: "15 kW",
      tag: "Home / small business",
      price: "410,000",
      featured: true,
      perks: [
        "580 W panels ×26",
        "15 kW hybrid inverter",
        "15 kWh battery option",
        "Turnkey installation",
        "Documents and registration",
      ],
    },
    {
      name: "30 kW+",
      tag: "For business",
      price: "780,000",
      perks: [
        "580 W panels ×52",
        "30 kW grid inverter",
        "Industrial mounting",
        "Engineering + documentation",
        "24/7 monitoring",
      ],
    },
  ],
} as const;

function Prices() {
  const { t, lang } = useI18n();
  const localizedPlans = plans[lang];
  return (
    <>
      <Section eyebrow={t("prices.subtitle")} title={t("prices.title")}>
        <div className="grid gap-6 md:grid-cols-3">
          {localizedPlans.map((p) => (
            <div
              key={p.name}
              className={`rounded-xl p-8 border ${p.featured ? "bg-dark text-dark-foreground border-primary" : "bg-card border-border"}`}
            >
              <div
                className={`text-xs uppercase tracking-widest ${p.featured ? "text-primary" : "text-muted-foreground"}`}
              >
                {p.tag}
              </div>
              <div className="mt-2 text-3xl font-bold">{p.name}</div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className={`text-sm ${p.featured ? "opacity-70" : "text-muted-foreground"}`}>
                  {t("prices.from")}
                </span>
                <span className="text-4xl font-bold">{p.price}</span>
                <span className={`text-sm ${p.featured ? "opacity-70" : "text-muted-foreground"}`}>
                  {t("prices.uah")}
                </span>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                {p.perks.map((k) => (
                  <li key={k} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                    <span className={p.featured ? "opacity-90" : ""}>{k}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/contacts"
                className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-primary text-primary-foreground h-11 text-sm font-semibold hover:brightness-110"
              >
                {t("cta.request")}
              </a>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">{t("prices.note")}</p>
      </Section>
    </>
  );
}
