import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { ContactForm } from "@/components/site/ContactForm";
import { useI18n } from "@/lib/i18n";
import bizImg from "@/assets/business-solar.jpg";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_layout/services_/business")({
  component: ForBiz,
  head: () => ({
    meta: [
      { title: "СЕС для бізнесу — DMK SOLAR" },
      {
        name: "description",
        content: "Промислові сонячні електростанції від 30 кВт до кількох МВт. Швидка окупність.",
      },
    ],
  }),
});

function ForBiz() {
  const { t, lang } = useI18n();
  const perks =
    lang === "en"
      ? [
          "Capacity from 30 kW to 5 MW+",
          "Savings up to 6,000,000 UAH/year",
          "Payback in 1.5–3 years",
          "30–70% lower grid consumption",
          "Turnkey project with documents",
          "24/7 monitoring and service",
        ]
      : [
          "Потужність від 30 кВт до 5 МВт+",
          "Економія до 6 000 000 грн/рік",
          "Окупність 1.5–3 роки",
          "Зменшення споживання з мережі на 30–70%",
          "Проєкт під ключ з документами",
          "24/7 моніторинг і сервіс",
        ];
  const title = lang === "en" ? "Benefits of solar for business" : "{title}";
  return (
    <>
      <section className="relative bg-dark text-dark-foreground overflow-hidden">
        <img
          src={bizImg}
          alt=""
          width={1200}
          height={800}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <span className="inline-block text-xs uppercase tracking-widest bg-primary text-primary-foreground px-3 py-1 rounded-full">
            {t("nav.for_business")}
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold max-w-2xl">{t("for.biz.title")}</h1>
          <p className="mt-5 max-w-xl opacity-80">{t("for.biz.lead")}</p>
        </div>
      </section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold">{title}</h2>
            <ul className="mt-6 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-xl p-6 md:p-8 border border-border">
            <h3 className="text-xl font-semibold mb-4">{t("cta.consult")}</h3>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
