import { createFileRoute } from "@tanstack/react-router";
import { ProjectCategoryPage } from "@/components/site/ProjectCategoryPage";
import { homeProjects } from "@/data/projects";

export const Route = createFileRoute("/_layout/projects/home")({
  component: HomeProjects,
  head: () => ({
    meta: [
      { title: "Проєкти для будинку — DMK SOLAR" },
      {
        name: "description",
        content: "Реалізовані сонячні електростанції DMK SOLAR для приватних будинків.",
      },
    ],
  }),
});

function HomeProjects() {
  return <ProjectCategoryPage active="home" projects={homeProjects} />;
}
