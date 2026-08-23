import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowDownRight, Building2, Home } from "lucide-react";
import { Section } from "@/components/site/Section";
import { businessProjects, homeProjects } from "@/data/projects";
import { useI18n } from "@/lib/i18n";
import portfolioHome from "@/assets/portfolio-home.jpg";
import portfolioBusiness from "@/assets/portfolio-business.jpg";

export const Route = createFileRoute("/_layout/projects")({
  component: ProjectsRoute,
  head: () => ({
    meta: [
      { title: "Наші проєкти — DMK SOLAR" },
      {
        name: "description",
        content: "Реалізовані сонячні електростанції для приватних будинків і бізнесу.",
      },
    ],
  }),
});

function ProjectsRoute() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return pathname.startsWith("/projects/") ? <Outlet /> : <Projects />;
}

function Projects() {
  const { t } = useI18n();

  return (
    <Section eyebrow={t("projects.subtitle")} title={t("projects.title")}>
      <p className="mb-10 max-w-2xl text-lg leading-8 text-muted-foreground">
        {t("projects.intro")}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/projects/home"
          className="group relative flex min-h-72 overflow-hidden rounded-xl text-white transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:min-h-80"
        >
          <img
            src={portfolioHome}
            alt="Реалізований сонячний проєкт для будинку"
            width={1536}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#061a13]/95 via-[#061a13]/45 to-[#061a13]/5 transition group-hover:via-[#061a13]/35" />
          <span className="relative mt-auto flex w-full items-end justify-between gap-5 p-7 md:p-10">
            <span>
              <Home className="mb-7 h-8 w-8 text-primary" />
              <span className="block text-xs uppercase tracking-[0.18em] opacity-60">
                {homeProjects.length} {t("projects.items")}
              </span>
              <span className="mt-2 block text-3xl font-bold md:text-4xl">{t("nav.for_home")}</span>
            </span>
            <ArrowDownRight className="h-8 w-8 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </span>
        </Link>
        <Link
          to="/projects/business"
          className="group relative flex min-h-72 overflow-hidden rounded-xl text-white transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:min-h-80"
        >
          <img
            src={portfolioBusiness}
            alt="Реалізований сонячний проєкт для бізнесу"
            width={1706}
            height={922}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#061a13]/95 via-[#061a13]/50 to-[#061a13]/10 transition group-hover:via-[#061a13]/38" />
          <span className="relative mt-auto flex w-full items-end justify-between gap-5 p-7 md:p-10">
            <span>
              <Building2 className="mb-7 h-8 w-8 text-primary" />
              <span className="block text-xs uppercase tracking-[0.18em] opacity-70">
                {businessProjects.length} {t("projects.items")}
              </span>
              <span className="mt-2 block text-3xl font-bold md:text-4xl">
                {t("nav.for_business")}
              </span>
            </span>
            <ArrowDownRight className="h-8 w-8 shrink-0 text-primary transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </span>
        </Link>
      </div>
    </Section>
  );
}
