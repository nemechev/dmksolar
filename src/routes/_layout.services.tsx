import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { useI18n } from "@/lib/i18n";
import { Ruler, Package, HardHat, Plug, Wrench, Home as HomeIcon, Factory } from "lucide-react";

export const Route = createFileRoute("/_layout/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Послуги — DMK SOLAR" },
      { name: "description", content: "Проєктування, постачання, монтаж, підключення та сервіс сонячних електростанцій." },
    ],
  }),
});

function Services() {
  const { t } = useI18n();
  const items = [
    { i: Ruler, tk: "svc.design.t", dk: "svc.design.d" },
    { i: Package, tk: "svc.supply.t", dk: "svc.supply.d" },
    { i: HardHat, tk: "svc.install.t", dk: "svc.install.d" },
    { i: Plug, tk: "svc.connect.t", dk: "svc.connect.d" },
    { i: Wrench, tk: "svc.service.t", dk: "svc.service.d" },
  ];
  return (
    <>
      <Section eyebrow={t("home.services.subtitle")} title={t("nav.services")}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <div key={i} className="bg-card rounded-lg p-6 border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <s.i className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">{t(s.tk)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(s.dk)}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title={t("home.for.title")} className="bg-muted/40">
        <div className="grid gap-6 md:grid-cols-2">
          <Link to="/services/home" className="p-8 bg-background rounded-xl border border-border hover:border-primary transition">
            <HomeIcon className="w-10 h-10 text-primary" />
            <h3 className="mt-4 text-2xl font-bold">{t("home.for.home.t")}</h3>
            <p className="mt-2 text-muted-foreground">{t("home.for.home.d")}</p>
            <span className="mt-4 inline-block text-primary text-sm font-medium">{t("cta.more")} →</span>
          </Link>
          <Link to="/services/business" className="p-8 bg-background rounded-xl border border-border hover:border-primary transition">
            <Factory className="w-10 h-10 text-primary" />
            <h3 className="mt-4 text-2xl font-bold">{t("home.for.biz.t")}</h3>
            <p className="mt-2 text-muted-foreground">{t("home.for.biz.d")}</p>
            <span className="mt-4 inline-block text-primary text-sm font-medium">{t("cta.more")} →</span>
          </Link>
        </div>
      </Section>
    </>
  );
}
