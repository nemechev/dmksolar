import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { Section } from "@/components/site/Section";
import { useI18n } from "@/lib/i18n";
import aboutProjectImg from "@/assets/about-solar-project.jpg";

export const Route = createFileRoute("/_layout/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "Енергія, яка працює на вас — DMK SOLAR" },
      {
        name: "description",
        content:
          "Проєктуємо та монтуємо цілісні сонячні енергетичні рішення для будинків, бізнесу й підприємств.",
      },
    ],
  }),
});

function About() {
  const { t } = useI18n();
  const reasons = [1, 2, 3, 4, 5].map((number) => ({
    title: t(`about.reason.${number}.title`),
    description: t(`about.reason.${number}.description`),
  }));

  return (
    <>
      <Section eyebrow={t("nav.about")} title={t("about.title")}>
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-2xl space-y-5 text-base leading-8 md:text-lg">
            <p className="text-xl font-semibold leading-8 md:text-2xl">{t("about.lead")}</p>
            <p className="text-muted-foreground">{t("about.p1")}</p>
            <p className="text-muted-foreground">{t("about.p2")}</p>
            <p className="text-muted-foreground">{t("about.p3")}</p>
          </div>
          <figure className="relative lg:mt-8">
            <div
              className="absolute -bottom-4 -left-4 h-full w-full border border-primary/40"
              aria-hidden="true"
            />
            <img
              src={aboutProjectImg}
              alt={t("about.image_alt")}
              width={960}
              height={1280}
              className="relative aspect-[4/3] w-full object-cover object-[center_62%]"
            />
          </figure>
        </div>
      </Section>

      <Section
        eyebrow={t("about.reasons.eyebrow")}
        title={t("about.reasons.title")}
        className="bg-muted/40"
      >
        <ol className="grid gap-x-10 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <li
              key={reason.title}
              className={`flex gap-5 border-t border-border py-7 ${index === reasons.length - 1 ? "md:col-span-2 md:max-w-[calc(50%-1.25rem)]" : ""}`}
            >
              <span className="font-mono text-sm font-semibold tabular-nums text-primary">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-xl font-semibold">{reason.title}</h3>
                <p className="mt-2 max-w-xl leading-7 text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section dark>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold leading-[1.08] tracking-tight md:text-4xl xl:text-[2.75rem]">
              {t("about.closing")}
            </h2>
            <p className="mt-7 text-base leading-7 opacity-75 md:text-lg md:leading-8">
              {t("home.cta.desc")}
            </p>
          </div>
          <div className="w-full rounded-sm border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3 text-primary">
              <Check className="h-5 w-5" />
              <span className="text-sm font-semibold">{t("cta.consult")}</span>
            </div>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
