import { useMemo, useState } from "react";
import { contactForm } from "@/config/site";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const initialPromoCode = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("promocode") ?? "";
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    try {
      const formData = new FormData(form);
      const promoCode = String(formData.get(contactForm.fields.promocode) ?? "").trim();
      if (promoCode) {
        const currentMessage = String(formData.get(contactForm.fields.message) ?? "").trim();
        formData.set(
          contactForm.fields.message,
          [currentMessage, `Промокод: ${promoCode}`].filter(Boolean).join("\n"),
        );
      }

      await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      form.reset();
      toast.success(t("form.success"));
    } catch {
      toast.error(t("referral.form.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className={compact ? "grid gap-3" : "grid gap-3 sm:grid-cols-2"}>
        <input
          required
          name={contactForm.fields.name}
          placeholder={t("form.name")}
          className="h-12 rounded-md border text-black border-border bg-background px-4 text-sm outline-none focus:border-primary"
        />
        <input
          required
          name={contactForm.fields.phone}
          type="tel"
          inputMode="tel"
          placeholder={t("form.phone")}
          className="h-12 rounded-md border text-black border-border bg-background px-4 text-sm outline-none focus:border-primary"
        />
      </div>
      <input
        type="email"
        name={contactForm.fields.email}
        placeholder={t("form.email")}
        className="h-12 rounded-md border text-black border-border bg-background px-4 text-sm outline-none focus:border-primary"
      />
      <input
        name={contactForm.fields.promocode}
        defaultValue={initialPromoCode}
        placeholder={t("form.promocode")}
        className="h-12 rounded-md border text-black border-border bg-background px-4 text-sm outline-none focus:border-primary"
      />
      {!compact && (
        <textarea
          name={contactForm.fields.message}
          placeholder={t("form.message")}
          rows={4}
          className="rounded-md border text-black border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
      )}
      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input required type="checkbox" className="mt-0.5 accent-[color:var(--primary)]" />
        {t("form.consent")}
      </label>
      <button
        type="submit"
        disabled={loading}
        className="h-12 rounded-md bg-primary text-primary-foreground font-semibold hover:brightness-110 disabled:opacity-50 transition"
      >
        {loading ? "..." : t("cta.send")}
      </button>
    </form>
  );
}
