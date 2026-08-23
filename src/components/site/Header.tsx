import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { useI18n, type Lang } from "@/lib/i18n";
import logo from "@/assets/dmk-solar-logo.png";
import { siteContacts } from "@/config/site";

const nav = [
  { to: "/projects", key: "nav.projects" },
  { to: "/calculator", key: "nav.calculator" },
  { to: "/referral", key: "nav.referral" },
] as const;

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const desktopLinkClass =
    "relative flex h-full items-center px-2.5 text-[13px] font-medium opacity-75 transition duration-200 after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-primary after:transition-transform hover:text-primary hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-dark text-dark-foreground shadow-[0_10px_30px_rgba(4,18,14,0.16)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 xl:grid xl:h-[72px] xl:grid-cols-[minmax(190px,1fr)_auto_minmax(190px,1fr)] xl:gap-6 xl:px-8 2xl:max-w-[1536px]">
        <Link
          to="/"
          aria-label="DMK Solar — головна"
          className="flex w-fit items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <img
            src={logo}
            alt="DMK Solar"
            width={1330}
            height={433}
            className="h-11 w-auto mix-blend-lighten sm:h-12"
          />
        </Link>

        <nav
          aria-label={t("nav.main")}
          className="hidden h-full items-center justify-center xl:flex"
        >
          <Link
            to="/about"
            className={desktopLinkClass}
            activeProps={{ className: "text-primary opacity-100 after:scale-x-100" }}
          >
            {t("nav.about")}
          </Link>
          <div className="group relative flex h-full items-center">
            <Link
              to="/services"
              className={`${desktopLinkClass} gap-1`}
              activeProps={{ className: "text-primary opacity-100 after:scale-x-100" }}
            >
              {t("nav.services")}
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
            </Link>
            <div className="invisible absolute left-0 top-full w-52 translate-y-2 border border-white/10 bg-dark/98 p-2 opacity-0 shadow-[0_20px_45px_rgba(2,12,9,0.35)] backdrop-blur-xl transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <Link
                to="/services/home"
                className="block px-4 py-3 text-sm opacity-80 transition hover:bg-white/5 hover:text-primary hover:opacity-100"
              >
                {t("nav.for_home")}
              </Link>
              <Link
                to="/services/business"
                className="block px-4 py-3 text-sm opacity-80 transition hover:bg-white/5 hover:text-primary hover:opacity-100"
              >
                {t("nav.for_business")}
              </Link>
            </div>
          </div>
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={desktopLinkClass}
              activeProps={{ className: "text-primary opacity-100 after:scale-x-100" }}
            >
              {t(n.key)}
            </Link>
          ))}
          <Link
            to="/contacts"
            className={desktopLinkClass}
            activeProps={{ className: "text-primary opacity-100 after:scale-x-100" }}
          >
            {t("nav.contacts")}
          </Link>
        </nav>

        <div className="flex min-w-0 items-center justify-end gap-3">
          <a
            href={siteContacts.phones[0].href}
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap text-sm opacity-80 transition hover:text-primary hover:opacity-100 2xl:flex"
          >
            <Phone className="w-4 h-4" /> {siteContacts.phones[0].label}
          </a>
          <div className="hidden shrink-0 items-center gap-1 border border-white/10 bg-white/[0.04] p-1 text-xs md:flex">
            {(["ua", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`min-w-8 px-2 py-1 font-medium transition ${lang === l ? "bg-primary text-primary-foreground" : "opacity-60 hover:bg-white/5 hover:opacity-100"}`}
                aria-pressed={lang === l}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link
            to="/contacts"
            className="hidden shrink-0 whitespace-nowrap bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 active:translate-y-px 2xl:inline-flex"
          >
            {t("cta.request")}
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.04] transition hover:border-primary hover:text-primary active:scale-[0.98] xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label={t("nav.menu")}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav
          aria-label={t("nav.mobile")}
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-dark xl:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-5 sm:px-6">
            <Link to="/about" onClick={() => setOpen(false)} className="py-2 text-sm">
              {t("nav.about")}
            </Link>
            <Link
              to="/services"
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-semibold text-primary"
            >
              {t("nav.services")}
            </Link>
            <div className="mb-2 border-l border-white/15 pl-4">
              <Link
                to="/services/home"
                onClick={() => setOpen(false)}
                className="block py-2 text-sm opacity-80"
              >
                {t("nav.for_home")}
              </Link>
              <Link
                to="/services/business"
                onClick={() => setOpen(false)}
                className="block py-2 text-sm opacity-80"
              >
                {t("nav.for_business")}
              </Link>
            </div>
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-sm">
                {t(n.key)}
              </Link>
            ))}
            <Link to="/contacts" onClick={() => setOpen(false)} className="py-2 text-sm">
              {t("nav.contacts")}
            </Link>
            <div className="flex items-center gap-2 pt-3">
              {(["ua", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 text-xs ${lang === l ? "bg-primary text-primary-foreground" : "bg-white/10"}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
