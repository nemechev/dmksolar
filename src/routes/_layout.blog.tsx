import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { useI18n } from "@/lib/i18n";
import house from "@/assets/house-solar.jpg";
import biz from "@/assets/business-solar.jpg";
import install from "@/assets/install-team.jpg";

export const Route = createFileRoute("/_layout/blog")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "Блог — DMK SOLAR" },
      { name: "description", content: "Новини, кейси та поради з сонячної енергетики." },
    ],
  }),
});

const posts = {
  ua: [
    {
      title: "Як обрати сонячну станцію для будинку в 2026",
      date: "12.06.2026",
      img: house,
      excerpt: "Розбираємо потужність, тип панелей і чи потрібні акумулятори.",
    },
    {
      title: "Кейс: СЕС 250 кВт для логістичного центру",
      date: "28.05.2026",
      img: biz,
      excerpt: "Як бізнес зекономив 3.2 млн грн за перший рік роботи СЕС.",
    },
    {
      title: "Гібридний чи мережевий інвертор?",
      date: "10.05.2026",
      img: install,
      excerpt: "Порівнюємо два основні типи інверторів і області їх застосування.",
    },
  ],
  en: [
    {
      title: "How to choose a solar plant for a home in 2026",
      date: "12.06.2026",
      img: house,
      excerpt: "We explain capacity, panel types and when batteries are needed.",
    },
    {
      title: "Case study: 250 kW solar plant for a logistics center",
      date: "28.05.2026",
      img: biz,
      excerpt: "How a business saved 3.2 million UAH in the first year of operation.",
    },
    {
      title: "Hybrid or grid-tied inverter?",
      date: "10.05.2026",
      img: install,
      excerpt: "We compare the two main inverter types and where they are used.",
    },
  ],
} as const;

function Blog() {
  const { t, lang } = useI18n();
  const localizedPosts = posts[lang];
  return (
    <Section eyebrow={t("nav.blog")} title={t("blog.title")}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {localizedPosts.map((p) => (
          <article
            key={p.title}
            className="bg-card rounded-xl overflow-hidden border border-border group"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                width={800}
                height={600}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {p.date}
              </div>
              <h3 className="mt-2 text-lg font-bold leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <button className="mt-4 text-primary text-sm font-semibold">{t("blog.read")}</button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
