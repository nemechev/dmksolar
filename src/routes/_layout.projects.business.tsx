import { createFileRoute } from "@tanstack/react-router";
import { ProjectCategoryPage } from "@/components/site/ProjectCategoryPage";
import { businessProjects } from "@/data/projects";

export const Route = createFileRoute("/_layout/projects/business")({
  component: BusinessProjects,
  head: () => ({
    meta: [
      { title: "Проєкти для бізнесу — DMK SOLAR" },
      {
        name: "description",
        content: "Реалізовані промислові сонячні електростанції DMK SOLAR для бізнесу.",
      },
    ],
  }),
});

function BusinessProjects() {
  return <ProjectCategoryPage active="business" projects={businessProjects} />;
}
