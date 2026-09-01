import { Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, Home } from "lucide-react";
import { ProjectGrid } from "@/components/site/ProjectGrid";
import type { Project } from "@/data/projects";
import { useI18n } from "@/lib/i18n";

type Category = "home" | "business";

export function ProjectCategoryPage({
  active,
  projects,
}: {
  active: Category;
  projects: Project[];
}) {
  const isHome = active === "home";
  const { lang } = useI18n();
  const copy =
    lang === "en"
      ? {
          back: "Back to category selection",
          eyebrow: "Completed solar power plants",
          homeTitle: "Home projects",
          businessTitle: "Business projects",
          homeText:
            "Private solar plants with backup power, batteries and energy-independence systems.",
          businessText:
            "Industrial solar power plants for enterprises, production facilities and commercial properties.",
          nav: "Project categories",
          home: "For Home",
          business: "For Business",
        }
      : {
          back: "До вибору напрямку",
          eyebrow: "Реалізовані сонячні електростанції",
          homeTitle: "Проєкти для будинку",
          businessTitle: "Проєкти для бізнесу",
          homeText:
            "Приватні сонячні станції з резервним живленням, акумуляторами та системами енергонезалежності.",
          businessText:
            "Промислові сонячні електростанції для підприємств, виробництв і комерційних об’єктів.",
          nav: "Категорії проєктів",
          home: "Для будинку",
          business: "Для бізнесу",
        };

  return (
    <section className="bg-background py-16 text-foreground md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> {copy.back}
        </Link>

        <div className="mt-10 max-w-3xl">
          <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs uppercase tracking-widest text-primary">
            {copy.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            {isHome ? copy.homeTitle : copy.businessTitle}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {isHome ? copy.homeText : copy.businessText}
          </p>
        </div>

        <nav aria-label={copy.nav} className="mt-10 grid max-w-2xl grid-cols-2 gap-2">
          <Link
            to="/projects/home"
            aria-current={isHome ? "page" : undefined}
            className={`flex min-h-14 items-center justify-center gap-2 border px-4 text-sm font-semibold transition ${
              isHome
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary hover:text-primary"
            }`}
          >
            <Home className="h-4 w-4" /> {copy.home}
          </Link>
          <Link
            to="/projects/business"
            aria-current={!isHome ? "page" : undefined}
            className={`flex min-h-14 items-center justify-center gap-2 border px-4 text-sm font-semibold transition ${
              !isHome
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary hover:text-primary"
            }`}
          >
            <Building2 className="h-4 w-4" /> {copy.business}
          </Link>
        </nav>

        <div className="mt-14">
          <ProjectGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
