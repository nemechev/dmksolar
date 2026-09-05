import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BadgePercent, Handshake, Sun, Zap } from "lucide-react";
import { Section } from "@/components/site/Section";
import { ReferralForm } from "@/components/site/ReferralForm";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_layout/referral")({
  component: Referral,
  head: () => ({
    meta: [
      { title: "Реферальна програма — DMK SOLAR" },
      {
        name: "description",
        content:
          "Рекомендуйте DMK SOLAR та отримуйте 1% від вартості успішно реалізованого проєкту.",
      },
    ],
  }),
});

function Referral() {
  const { t } = useI18n();
  const steps = [1, 2, 3, 4];
  const benefits = [
    { icon: Sun, key: "referral.benefit.1" },
    { icon: BadgePercent, key: "referral.benefit.2" },
    { icon: Handshake, key: "referral.benefit.3" },
    { icon: Zap, key: "referral.benefit.4" },
  ] as const;

  return (
    <>
      <section className="relative overflow-hidden bg-dark text-dark-foreground">
        <div
          className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.08fr_.92fr] lg:items-start lg:px-8">
          <div className="lg:pt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t("nav.referral")}
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] md:text-6xl">
              {t("referral.title")}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 opacity-75">{t("referral.lead")}</p>
            <p className="mt-4 max-w-2xl text-lg leading-8 opacity-75">
              {t("referral.description")}
            </p>
            <div className="mt-8 grid max-w-2xl grid-cols-[1fr_auto] gap-x-3 gap-y-3 border-y border-white/10 py-5 text-sm font-semibold sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
              <span className="text-primary">{t("referral.flow.recommend")}</span>
              <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>{t("referral.flow.install")}</span>
              <ArrowRight className="hidden h-4 w-4 text-primary sm:block" aria-hidden="true" />
              <span className="col-span-2 border-l-2 border-primary pl-3 text-lg text-primary sm:col-span-1">
                {t("referral.flow.reward")}
              </span>
            </div>
            <a
              href="#referral-form"
              className="mt-9 inline-flex items-center gap-3 bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:gap-5 hover:brightness-105 active:translate-y-px"
            >
              {t("referral.cta")}
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
          <div id="referral-form" className="scroll-mt-24">
            <ReferralForm />
          </div>
        </div>
      </section>

      <Section eyebrow={t("referral.process.eyebrow")} title={t("referral.process.title")}>
        <ol className="border-t border-border">
          {steps.map((step) => (
            <li
              key={step}
              className="grid gap-4 border-b border-border py-7 md:grid-cols-[5rem_1fr_1.4fr] md:items-baseline md:gap-8"
            >
              <span className="font-mono text-sm font-semibold tabular-nums text-primary">
                0{step}
              </span>
              <h2 className="text-xl font-semibold md:text-2xl">
                {t(`referral.step.${step}.title`)}
              </h2>
              <p className="max-w-2xl leading-7 text-muted-foreground">
                {t(`referral.step.${step}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow={t("referral.benefits.eyebrow")}
        title={t("referral.benefits.title")}
        className="bg-muted/40"
      >
        <div className="grid gap-px overflow-hidden bg-border md:grid-cols-2">
          {benefits.map(({ icon: Icon, key }) => (
            <div key={key} className="flex gap-5 bg-background p-7 md:p-9">
              <Icon className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <p className="max-w-lg text-lg leading-8">{t(key)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section dark eyebrow={t("referral.who.eyebrow")} title={t("referral.who.title")}>
        <div>
          <p className="max-w-3xl text-lg leading-8 opacity-75">{t("referral.who.description")}</p>
          <p className="mt-5 max-w-3xl text-xl font-semibold leading-8">{t("referral.who.note")}</p>
        </div>
      </Section>
    </>
  );
}
