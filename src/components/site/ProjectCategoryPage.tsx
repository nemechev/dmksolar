import { Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, Home } from "lucide-react";
import { ProjectGrid } from "@/components/site/ProjectGrid";
import type { Project } from "@/data/projects";

type Category = "home" | "business";

export function ProjectCategoryPage({
  active,
  projects,
}: {
  active: Category;
  projects: Project[];
}) {
  const isHome = active === "home";

  return (
    <section className="bg-background py-16 text-foreground md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> До вибору напрямку
        </Link>

        <div className="mt-10 max-w-3xl">
          <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs uppercase tracking-widest text-primary">
            Реалізовані сонячні електростанції
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            {isHome ? "Проєкти для будинку" : "Проєкти для бізнесу"}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {isHome
              ? "Приватні сонячні станції з резервним живленням, акумуляторами та системами енергонезалежності."
              : "Промислові сонячні електростанції для підприємств, виробництв і комерційних об’єктів."}
          </p>
        </div>

        <nav aria-label="Категорії проєктів" className="mt-10 grid max-w-2xl grid-cols-2 gap-2">
          <Link
            to="/projects/home"
            aria-current={isHome ? "page" : undefined}
            className={`flex min-h-14 items-center justify-center gap-2 border px-4 text-sm font-semibold transition ${
              isHome
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:border-primary hover:text-primary"
            }`}
          >
            <Home className="h-4 w-4" /> Для будинку
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
            <Building2 className="h-4 w-4" /> Для бізнесу
          </Link>
        </nav>

        <div className="mt-14">
          <ProjectGrid projects={projects} />
        </div>
      </div>
    </section>
  );
}
