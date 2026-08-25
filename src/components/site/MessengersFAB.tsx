import { Facebook, Instagram, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import { siteContacts, socialLinks } from "@/config/site";

export function MessengersFAB() {
  const [open, setOpen] = useState(false);
  const items = [
    {
      label: "Telegram",
      href: socialLinks.telegram,
      color: "bg-[#229ED9]",
      icon: <Send className="w-5 h-5" />,
    },
    {
      label: "Viber",
      href: "viber://chat?number=%2B380967067743",
      color: "bg-[#7360F2]",
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      label: "WhatsApp",
      href: socialLinks.whatsapp,
      color: "bg-[#25D366]",
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      label: "Instagram",
      href: socialLinks.instagram,
      color: "bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FCAF45]",
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      label: "Facebook",
      href: socialLinks.facebook,
      color: "bg-[#1877F2]",
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      label: siteContacts.phones[0].label,
      href: siteContacts.phones[0].href,
      color: "bg-primary",
      icon: <Phone className="w-5 h-5" />,
    },
    {
      label: siteContacts.phones[1].label,
      href: siteContacts.phones[1].href,
      color: "bg-primary",
      icon: <Phone className="w-5 h-5" />,
    },
  ];
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open &&
        items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target="_blank"
            rel="noreferrer"
            className={`${it.color} text-white shadow-lg rounded-full pl-4 pr-5 py-2.5 flex items-center gap-2 text-sm font-medium hover:brightness-110 transition`}
          >
            {it.icon}
            <span>{it.label}</span>
          </a>
        ))}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Messengers"
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:brightness-110 transition"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
