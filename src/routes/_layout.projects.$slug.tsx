import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin, ShieldCheck, Sun, Wrench } from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import { useI18n } from "@/lib/i18n";
import { localizeProject } from "@/lib/project-i18n";

export const Route = createFileRoute("/_layout/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Проєкт"} — DMK SOLAR` },
      {
        name: "description",
        content: loaderData?.intro ?? "Реалізований проєкт сонячної електростанції DMK SOLAR.",
      },
    ],
  }),
  component: ProjectPortfolio,
});

const processCopy = {
  ua: [
    { number: "01", title: "Проєктування", text: "Аналіз об’єкта та енергопотреб" },
    { number: "02", title: "Підбір рішення", text: "Конфігурація системи й обладнання" },
    { number: "03", title: "Постачання", text: "Комплектація та доставка на об’єкт" },
    { number: "04", title: "Монтаж і запуск", text: "Встановлення, захист і налаштування" },
    { number: "05", title: "Сервіс", text: "Моніторинг і технічна підтримка" },
  ],
  en: [
    { number: "01", title: "Design", text: "Site and energy-needs analysis" },
    { number: "02", title: "Solution selection", text: "System and equipment configuration" },
    { number: "03", title: "Supply", text: "Equipment set and delivery to site" },
    { number: "04", title: "Installation & launch", text: "Installation, protection and setup" },
    { number: "05", title: "Service", text: "Monitoring and technical support" },
  ],
} as const;

const pageCopy = {
  ua: {
    all: "Усі проєкти",
    discuss: "Обговорити проєкт",
    about: "Про проєкт",
    metrics: "Ключові показники",
    solution: "Проєктне рішення",
    solutionTitle: "Система, розрахована під реальне навантаження",
    mountAlt: "Монтаж обладнання DMK Solar",
    mount: "Монтаж, налаштування та запуск під ключ",
    photos: "Фото з об’єкта",
    gallery: "Галерея проєкту",
    video: "Відео з реалізованого об’єкта",
    results: "Результати",
    efficiency: "Ефективність у цифрах",
    calculate: "Розрахувати свій проєкт",
    photoAlt: "Фото проєкту",
  },
  en: {
    all: "All projects",
    discuss: "Discuss project",
    about: "About the project",
    metrics: "Key indicators",
    solution: "Project solution",
    solutionTitle: "A system designed for the real load",
    mountAlt: "DMK Solar equipment installation",
    mount: "Turnkey installation, setup and launch",
    photos: "Photos from the site",
    gallery: "Project gallery",
    video: "Video from the completed site",
    results: "Results",
    efficiency: "Efficiency in numbers",
    calculate: "Calculate your project",
    photoAlt: "Project photo",
  },
} as const;

function ProjectPortfolio() {
  const rawProject = Route.useLoaderData();
  const { lang } = useI18n();
  const project = localizeProject(rawProject, lang);
  const process = processCopy[lang];
  const c = pageCopy[lang];

  return (
    <article className="bg-dark text-dark-foreground">
      <section className="relative min-h-[620px] overflow-hidden md:min-h-[720px]">
        <img
          src={project.image}
          alt={`${project.displayTitle}, ${project.displayLocation}`}
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,20,15,.96)_0%,rgba(4,20,15,.7)_38%,rgba(4,20,15,.12)_78%),linear-gradient(0deg,rgba(4,20,15,.62),transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[620px] max-w-[1536px] flex-col px-4 pb-14 pt-8 sm:px-6 md:min-h-[720px] md:pb-20 lg:px-8">
          <div className="flex items-center justify-between gap-5">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium opacity-75 transition hover:text-primary hover:opacity-100"
            >
              <ArrowLeft className="h-4 w-4" /> {c.all}
            </Link>
            <Link
              to="/contacts"
              className="hidden border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground sm:inline-flex"
            >
              {c.discuss}
            </Link>
          </div>

          <div className="mt-10 hidden grid-cols-5 border-y border-white/15 lg:grid">
            {process.map((step) => (
              <div key={step.number} className="border-r border-white/15 px-5 py-5 last:border-r-0">
                <p className="text-xs font-bold tracking-[0.18em] text-primary">{step.number}</p>
                <p className="mt-2 text-sm font-semibold">{step.title}</p>
                <p className="mt-1 max-w-40 text-xs leading-5 opacity-55">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto max-w-3xl pt-24">
            <p className="text-sm font-semibold text-primary">{project.displayType}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
              {project.displayTitle}
            </h1>
            <p className="mt-7 flex items-center gap-2 text-base opacity-80 sm:text-lg">
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              {project.displayLocation}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 opacity-65 sm:text-lg">
              {project.displayIntro}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#071a14] py-14 md:py-20">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[.75fr_2.25fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {c.about}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{c.metrics}</h2>
            </div>
            <dl
              className={`grid gap-px overflow-hidden border border-white/10 bg-white/10 ${
                project.displayMetrics.length <= 3
                  ? "sm:grid-cols-3"
                  : "sm:grid-cols-2 xl:grid-cols-3"
              }`}
            >
              {project.displayMetrics.map((metric, index) => (
                <div
                  key={`${metric.label}-${metric.value}`}
                  className="group relative min-h-36 bg-[#0b211a] p-6 transition-colors duration-300 hover:bg-[#102b22]"
                >
                  <span className="text-xs font-bold tracking-[0.16em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <dd className="mt-5 text-2xl font-bold leading-tight text-white md:text-3xl">
                    {metric.value}
                  </dd>
                  <dt className="mt-2 text-sm leading-5 text-white/55">{metric.label}</dt>
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1536px] gap-12 px-4 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:items-stretch lg:px-8">
          <div className="flex flex-col justify-center lg:pr-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {c.solution}
            </p>
            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              {c.solutionTitle}
            </h2>
            <div className="mt-8 space-y-5 text-base leading-7 opacity-70">
              {project.displayDescription.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <ul className="mt-9 grid gap-4 sm:grid-cols-2">
              {project.displayFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-6 opacity-85">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[420px] overflow-hidden lg:min-h-[620px]">
            <img
              src={project.gallery[1]}
              alt={c.mountAlt}
              width={1200}
              height={900}
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
            />
            <div className="absolute bottom-0 left-0 bg-primary p-5 text-primary-foreground sm:p-7">
              <Wrench className="h-6 w-6" />
              <p className="mt-3 max-w-48 text-sm font-semibold">{c.mount}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {c.photos}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">{c.gallery}</h2>
            </div>
            <Sun className="hidden h-10 w-10 text-primary sm:block" strokeWidth={1.4} />
          </div>
          <div className="mt-10 grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 lg:auto-rows-[280px] lg:grid-cols-4">
            {project.gallery.map((image, index) => (
              <figure
                key={`${image}-${index}`}
                className={`group overflow-hidden ${index === 0 ? "sm:col-span-2 lg:row-span-2" : ""}`}
              >
                <img
                  src={image}
                  alt={`${c.photoAlt} ${index + 1}`}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </figure>
            ))}
            {project.video && (
              <figure className="overflow-hidden bg-[#071a14] sm:col-span-2 lg:col-span-2 lg:row-span-2">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={project.videoPoster}
                  className="h-full w-full object-cover object-center fullscreen:bg-black fullscreen:object-contain"
                  aria-label={c.video}
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              </figure>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#071a14] py-16 md:py-20">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 xl:grid-cols-[1fr_3fr_auto] xl:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {c.results}
              </p>
              <h2 className="mt-4 text-3xl font-bold">{c.efficiency}</h2>
            </div>
            <div className="grid grid-cols-2 border-l border-white/10 md:grid-cols-4">
              {project.displayResults.map((result) => (
                <div key={result.label} className="border-r border-white/10 px-5 py-2">
                  <p className="text-2xl font-bold text-primary md:text-3xl">{result.value}</p>
                  <p className="mt-2 text-xs leading-5 opacity-55">{result.label}</p>
                </div>
              ))}
            </div>
            <Link
              to="/calculator"
              className="inline-flex min-h-14 items-center justify-center gap-5 bg-primary px-7 font-semibold text-primary-foreground transition hover:brightness-110 active:translate-y-px"
            >
              {c.calculate} <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
