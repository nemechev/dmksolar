import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Send,
  Youtube,
} from "lucide-react";
import logo from "@/assets/dmk-solar-logo.png";
import { siteContacts, socialLinks } from "@/config/site";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-dark text-dark-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link to="/" aria-label="DMK Solar — головна">
            <img
              src={logo}
              alt="DMK Solar"
              width={1330}
              height={433}
              className="h-14 w-auto mix-blend-lighten"
              loading="lazy"
            />
          </Link>
          <p className="mt-4 text-sm opacity-70 max-w-xs">{t("footer.tagline")}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">{t("footer.company")}</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              <Link to="/about" className="hover:text-primary">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-primary">
                {t("nav.projects")}
              </Link>
            </li>
            <li>
              <Link to="/referral" className="hover:text-primary">
                {t("nav.referral")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">{t("footer.services")}</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              <Link to="/services/home" className="hover:text-primary">
                {t("nav.for_home")}
              </Link>
            </li>
            <li>
              <Link to="/services/business" className="hover:text-primary">
                {t("nav.for_business")}
              </Link>
            </li>
            <li>
              <Link to="/calculator" className="hover:text-primary">
                {t("nav.calculator")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">{t("footer.info")}</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              <Link to="/faq" className="hover:text-primary">
                {t("nav.faq")}
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="hover:text-primary">
                {t("nav.contacts")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">{t("footer.contacts")}</h4>
          <ul className="space-y-3 text-sm opacity-80">
            {siteContacts.phones.map((phone) => (
              <li key={phone.href}>
                <a
                  href={phone.href}
                  className="flex items-start gap-2 whitespace-nowrap hover:text-primary"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {phone.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${siteContacts.email}`}
                className="flex items-start gap-2 hover:text-primary"
              >
                <Mail className="w-4 h-4 mt-0.5 text-primary" /> {siteContacts.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-primary" /> {t("contacts.city")}
            </li>
          </ul>
          <div className="flex items-center gap-3 mt-4">
            <a
              href={socialLinks.telegram}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="opacity-70 hover:text-primary"
            >
              <Send className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="opacity-70 hover:text-primary"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="opacity-70 hover:text-primary"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="opacity-70 hover:text-primary"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="opacity-70 hover:text-primary"
            >
              <Music2 className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="opacity-70 hover:text-primary"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs opacity-60">
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
