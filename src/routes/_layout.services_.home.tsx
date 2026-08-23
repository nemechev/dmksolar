import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { ContactForm } from "@/components/site/ContactForm";
import { useI18n } from "@/lib/i18n";
import houseImg from "@/assets/house-solar.jpg";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_layout/services_/home")({
  component: ForHome,
  head: () => ({
    meta: [
      { title: "СЕС для будинку — DMK SOLAR" },
      {
        name: "description",
        content: "Сонячні електростанції 5–30 кВт для приватних будинків. Автономність і економія.",
      },
    ],
  }),
});

function ForHome() {
  const { t } = useI18n();
  const perks = [
    "Автономне живлення 5–30 кВт",
    "Економія до 90% на електроенергії",
    "Готова до підключення станція за 5–7 днів",
    "Резервне живлення під час відключень",
    "Термін окупності 4–6 років",
    "Гарантія 25 років на панелі",
  ];
  return (
    <>
      <section className="relative bg-dark text-dark-foreground overflow-hidden">
        <img
          src={houseImg}
          alt=""
          width={1200}
          height={800}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <span className="inline-block text-xs uppercase tracking-widest bg-primary text-primary-foreground px-3 py-1 rounded-full">
            {t("nav.for_home")}
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold max-w-2xl">{t("for.home.title")}</h1>
          <p className="mt-5 max-w-xl opacity-80">{t("for.home.lead")}</p>
        </div>
      </section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold">Переваги СЕС для приватного будинку</h2>
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
