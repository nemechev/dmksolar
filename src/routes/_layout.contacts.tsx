import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Music2, Phone, Send, Youtube } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { Section } from "@/components/site/Section";
import { siteContacts, socialLinks } from "@/config/site";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_layout/contacts")({
  component: Contacts,
  head: () => ({
    meta: [
      { title: "Контакти — DMK SOLAR" },
      {
        name: "description",
        content: "Контакти DMK SOLAR у Полтаві: телефони, email і соціальні мережі.",
      },
    ],
  }),
});

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        <span className="mt-1 block font-semibold">{value}</span>
      </span>
    </>
  );

  return href ? (
    <a
      href={href}
      className="flex items-start gap-4 border-b border-border py-5 transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      {content}
    </a>
  ) : (
    <div className="flex items-start gap-4 border-b border-border py-5">{content}</div>
  );
}

function Contacts() {
  const { t } = useI18n();
  const socials = [
    { icon: Send, label: "Telegram", href: socialLinks.telegram },
    { icon: Music2, label: "TikTok", href: socialLinks.tiktok },
    { icon: Youtube, label: "YouTube", href: socialLinks.youtube },
  ] as const;

  return (
    <Section eyebrow={t("contacts.subtitle")} title={t("contacts.title")}>
      <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <ContactRow icon={MapPin} label={t("contacts.address")} value={siteContacts.city} />
          {siteContacts.phones.map((phone) => (
            <ContactRow
              key={phone.href}
              icon={Phone}
              label={t("contacts.phone")}
              value={phone.label}
              href={phone.href}
            />
          ))}
          <ContactRow
            icon={Mail}
            label={t("contacts.email")}
            value={siteContacts.email}
            href={`mailto:${siteContacts.email}`}
          />

          <div className="mt-9">
            <h2 className="text-lg font-semibold">{t("contacts.social")}</h2>
            <div className="mt-4 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-12 w-12 items-center justify-center border border-border text-foreground transition hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-dark p-6 text-dark-foreground md:p-9">
          <h2 className="mb-5 text-2xl font-bold">{t("cta.request")}</h2>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
