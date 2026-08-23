import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { ContactForm } from "@/components/site/ContactForm";
import { useI18n } from "@/lib/i18n";
import {
  MapPin,
  Ruler,
  Package,
  HardHat,
  Plug,
  Wrench,
  ShieldCheck,
  FileCheck,
  BatteryCharging,
  Award,
  Home as HomeIcon,
  Factory,
} from "lucide-react";
import hero from "@/assets/hero-portfolio-project.jpg";
import portfolioHome from "@/assets/portfolio-home.jpg";
import portfolioBusiness from "@/assets/portfolio-business.jpg";
import installImg from "@/assets/install-team.jpg";

export const Route = createFileRoute("/_layout/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "DMK SOLAR — сонячні електростанції під ключ" },
      {
        name: "description",
        content:
          "Проєктування, монтаж та обслуговування СЕС для будинку та бізнесу. Гарантія до 25 років. Безкоштовний розрахунок.",
      },
      { property: "og:title", content: "DMK SOLAR — сонячні електростанції під ключ" },
      {
        property: "og:description",
        content: "СЕС для будинку та бізнесу. 500+ проєктів. Гарантія до 25 років.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Home() {
  const { t } = useI18n();

  const services = [
    { i: Ruler, tk: "svc.design.t", dk: "svc.design.d" },
    { i: Package, tk: "svc.supply.t", dk: "svc.supply.d" },
    { i: HardHat, tk: "svc.install.t", dk: "svc.install.d" },
    { i: Plug, tk: "svc.connect.t", dk: "svc.connect.d" },
    { i: Wrench, tk: "svc.service.t", dk: "svc.service.d" },
  ];

  const stages = [1, 2, 3, 4, 5];

  const guarantees = [
    { i: ShieldCheck, tk: "g.1.t", dk: "g.1.d" },
    { i: HardHat, tk: "g.2.t", dk: "g.2.d" },
    { i: BatteryCharging, tk: "g.3.t", dk: "g.3.d" },
    { i: FileCheck, tk: "g.4.t", dk: "g.4.d" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[640px] bg-dark text-dark-foreground overflow-hidden">
        <img
          src={hero}
          alt="Сонячна електростанція"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-28 pb-24">
          <span className="inline-block text-xs uppercase tracking-widest bg-primary/90 text-primary-foreground px-3 py-1 rounded-full">
            {t("hero.tag")}
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl leading-[1.05]">
            {t("hero.title")}
          </h1>
          <div className="mt-5 flex items-center gap-2 text-primary">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">Україна</span>
          </div>
          <p className="mt-5 max-w-xl text-base md:text-lg opacity-80">{t("hero.subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/calculator"
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110"
            >
              {t("cta.calc")}
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center rounded-md border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              {t("cta.all_projects")}
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section
        eyebrow={t("home.services.subtitle")}
        title={t("home.services.title")}
        className="bg-muted/40"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-background rounded-lg p-6 border border-border hover:border-primary transition"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <s.i className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">{t(s.tk)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(s.dk)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FOR HOME/BUSINESS */}
      <Section title={t("home.for.title")}>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            to="/services/home"
            className="group relative overflow-hidden rounded-xl bg-dark text-dark-foreground min-h-[320px]"
          >
            <img
              src={portfolioHome}
              alt="Реалізований проєкт СЕС для будинку"
              width={1536}
              height={1024}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-70 group-hover:scale-[1.03] transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
            <div className="relative p-8 h-full flex flex-col justify-end">
              <HomeIcon className="w-8 h-8 text-primary" />
              <h3 className="mt-3 text-2xl md:text-3xl font-bold">{t("home.for.home.t")}</h3>
              <p className="mt-2 text-sm opacity-80 max-w-md">{t("home.for.home.d")}</p>
              <span className="mt-4 text-primary text-sm font-medium">{t("cta.more")} →</span>
            </div>
          </Link>
          <Link
            to="/services/business"
            className="group relative overflow-hidden rounded-xl bg-dark text-dark-foreground min-h-[320px]"
          >
            <img
              src={portfolioBusiness}
              alt="Реалізований проєкт СЕС для бізнесу"
              width={856}
              height={520}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-70 group-hover:scale-[1.03] transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
            <div className="relative p-8 h-full flex flex-col justify-end">
              <Factory className="w-8 h-8 text-primary" />
              <h3 className="mt-3 text-2xl md:text-3xl font-bold">{t("home.for.biz.t")}</h3>
              <p className="mt-2 text-sm opacity-80 max-w-md">{t("home.for.biz.d")}</p>
              <span className="mt-4 text-primary text-sm font-medium">{t("cta.more")} →</span>
            </div>
          </Link>
        </div>
      </Section>

      {/* STAGES */}
      <Section title={t("home.stages.title")} className="bg-muted/40">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {stages.map((s) => (
            <div key={s}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary">
                  <HardHat className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-primary">0{s}</span>
              </div>
              <h4 className="mt-4 font-semibold">{t(`stage.${s}.t`)}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{t(`stage.${s}.d`)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* GUARANTEES */}
      <Section eyebrow={t("home.guarantee.sub")} title={t("home.guarantee.title")} dark>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((g, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-6 border border-white/10">
              <g.i className="w-8 h-8 text-primary" />
              <h4 className="mt-4 font-semibold">{t(g.tk)}</h4>
              <p className="mt-2 text-sm opacity-70">{t(g.dk)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PARTNERS */}
      <Section eyebrow={t("home.partners.sub")} title={t("home.partners.title")}>
        <p className="text-muted-foreground max-w-2xl mb-8">{t("home.partners.desc")}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {["JA Solar", "Longi", "Canadian Solar", "Huawei", "SolarEdge", "Fronius"].map((p) => (
            <div
              key={p}
              className="h-20 rounded-lg bg-card flex items-center justify-center border border-border text-sm font-semibold text-muted-foreground"
            >
              {p}
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-dark text-dark-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold max-w-lg">{t("home.cta.title")}</h2>
            <p className="mt-4 opacity-80 max-w-md">{t("home.cta.desc")}</p>
            <div className="mt-6 relative rounded-xl overflow-hidden max-w-md">
              <img
                src={installImg}
                alt=""
                width={1200}
                height={800}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
