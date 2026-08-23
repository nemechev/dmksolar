import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.slug}
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <article>
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={project.image}
                alt={`${project.title}, ${project.location}`}
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute right-4 top-4 flex h-11 w-11 translate-y-2 items-center justify-center bg-primary text-primary-foreground opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5" />
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/80 to-transparent px-5 pb-4 pt-16 text-xs font-semibold uppercase tracking-[0.16em] text-white opacity-0 transition group-hover:opacity-100">
                Дивитися портфоліо
              </span>
            </div>
            <div className="border-b border-border py-5 transition group-hover:border-primary">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {project.type}
              </p>
              <div className="mt-2 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{project.cardTitle ?? project.title}</h2>
                  {project.cardSubtitle ? (
                    <p className="mt-1 text-sm font-semibold text-primary">
                      {project.cardSubtitle}
                    </p>
                  ) : null}
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                {project.location}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
