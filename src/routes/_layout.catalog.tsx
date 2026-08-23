import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { useI18n } from "@/lib/i18n";
import { Sun, Zap, BatteryCharging, Wrench } from "lucide-react";

export const Route = createFileRoute("/_layout/catalog")({
  component: Catalog,
  head: () => ({
    meta: [
      { title: "Каталог обладнання — DMK SOLAR" },
      { name: "description", content: "Сертифіковані сонячні панелі, інвертори, акумулятори та кріплення." },
    ],
  }),
});

const products = [
  { cat: "cat.panels", name: "JA Solar 550W Bifacial", price: "6 200 грн", i: Sun },
  { cat: "cat.panels", name: "Longi Hi-MO 6 580W", price: "6 800 грн", i: Sun },
  { cat: "cat.panels", name: "Canadian Solar HiKu6 555W", price: "6 300 грн", i: Sun },
  { cat: "cat.inverters", name: "Huawei SUN2000 10kW", price: "62 000 грн", i: Zap },
  { cat: "cat.inverters", name: "SolarEdge SE10K", price: "78 000 грн", i: Zap },
  { cat: "cat.inverters", name: "Fronius Symo 15kW", price: "85 000 грн", i: Zap },
  { cat: "cat.batteries", name: "BYD Battery-Box 10kWh", price: "180 000 грн", i: BatteryCharging },
  { cat: "cat.batteries", name: "Huawei LUNA2000 15kWh", price: "220 000 грн", i: BatteryCharging },
  { cat: "cat.mounting", name: "K2 Systems для скатного даху", price: "від 850 грн/шт", i: Wrench },
];

function Catalog() {
  const { t } = useI18n();
  return (
    <Section eyebrow={t("catalog.subtitle")} title={t("catalog.title")}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <div key={i} className="bg-card rounded-xl p-6 border border-border hover:border-primary transition">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{t(p.cat)}</span>
              <p.i className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <div className="mt-4 text-primary font-bold text-lg">{p.price}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
