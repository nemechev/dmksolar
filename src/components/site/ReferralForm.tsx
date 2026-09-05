import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { referralForm } from "@/config/site";
import { useI18n } from "@/lib/i18n";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ReferralForm() {
  const { t } = useI18n();
  const [state, setState] = useState<SubmitState>("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting");

    try {
      const formData = new FormData(form);
      const referrerPhone = String(formData.get(referralForm.fields.referrerPhone) ?? "").trim();
      const clientPhone = String(formData.get(referralForm.fields.clientPhone) ?? "").trim();
      const contactData = String(formData.get(referralForm.fields.contactData) ?? "").trim();
      const promoCode = String(formData.get(referralForm.fields.promocode) ?? "").trim();
      const referrerName = String(formData.get(referralForm.fields.referrerName) ?? "").trim();
      const clientName = String(formData.get(referralForm.fields.clientName) ?? "").trim();

      formData.set(referralForm.fields.referrerPhone, referrerPhone || "Не вказано");
      formData.set(referralForm.fields.clientPhone, clientPhone || "Не вказано");
      formData.set(
        referralForm.fields.referrerName,
        [
          referrerName,
          contactData ? `Контактні дані: ${contactData}` : "",
          promoCode ? `Промокод: ${promoCode}` : "",
        ]
          .filter(Boolean)
          .join(" | "),
      );
      formData.set(referralForm.fields.clientName, clientName || "Партнерська заявка");

      await fetch(referralForm.action, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div
        className="flex min-h-80 flex-col justify-center border border-primary/30 bg-primary/5 p-7"
        role="status"
      >
        <CheckCircle2 className="h-9 w-9 text-primary" />
        <h2 className="mt-6 text-2xl font-bold">{t("referral.form.success.title")}</h2>
        <p className="mt-3 leading-7 text-dark-foreground/70">{t("referral.form.success")}</p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-7 w-fit border-b border-primary pb-1 text-sm font-semibold text-primary"
        >
          {t("referral.form.another")}
        </button>
      </div>
    );
  }

  const inputClass =
    "h-12 w-full border border-white/15 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <form onSubmit={submit} className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {t("referral.form.eyebrow")}
      </p>
      <h2 className="mt-3 text-2xl font-bold md:text-3xl">{t("referral.form.title")}</h2>

      <fieldset className="mt-7 grid gap-3">
        <legend className="mb-3 text-sm font-semibold">{t("referral.form.referrer")}</legend>
        <label className="sr-only" htmlFor="referrer-name">
          {t("referral.form.full_name")}
        </label>
        <input
          id="referrer-name"
          required
          name={referralForm.fields.referrerName}
          autoComplete="name"
          placeholder={t("referral.form.full_name")}
          className={inputClass}
        />
        <label className="sr-only" htmlFor="referrer-phone">
          {t("referral.form.phone")}
        </label>
        <input
          id="referrer-phone"
          name={referralForm.fields.referrerPhone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          pattern="[+0-9()\s-]{10,20}"
          placeholder={t("referral.form.phone")}
          className={inputClass}
        />
        <label className="sr-only" htmlFor="referrer-contact-data">
          {t("referral.form.contact_data")}
        </label>
        <input
          id="referrer-contact-data"
          name={referralForm.fields.contactData}
          autoComplete="off"
          placeholder={t("referral.form.contact_data")}
          className={inputClass}
        />
        <label className="sr-only" htmlFor="referrer-promocode">
          {t("form.promocode")}
        </label>
        <input
          id="referrer-promocode"
          name={referralForm.fields.promocode}
          autoComplete="off"
          placeholder={t("form.promocode")}
          className={inputClass}
        />
      </fieldset>

      <fieldset className="mt-6 grid gap-3">
        <legend className="mb-3 text-sm font-semibold">{t("referral.form.client")}</legend>
        <label className="sr-only" htmlFor="client-name">
          {t("referral.form.full_name")}
        </label>
        <input
          id="client-name"
          required
          name={referralForm.fields.clientName}
          autoComplete="off"
          placeholder={t("referral.form.full_name")}
          className={inputClass}
        />
        <label className="sr-only" htmlFor="client-phone">
          {t("referral.form.phone")}
        </label>
        <input
          id="client-phone"
          name={referralForm.fields.clientPhone}
          type="tel"
          inputMode="tel"
          autoComplete="off"
          pattern="[+0-9()\s-]{10,20}"
          placeholder={t("referral.form.phone")}
          className={inputClass}
        />
      </fieldset>

      <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-white/55">
        <input required type="checkbox" className="mt-1 accent-[color:var(--primary)]" />
        {t("form.consent")}
      </label>

      {state === "error" && (
        <p className="mt-4 text-sm text-red-300" role="alert">
          {t("referral.form.error")}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-6 flex h-13 w-full items-center justify-center gap-3 bg-primary px-5 font-semibold text-primary-foreground transition hover:brightness-110 active:translate-y-px disabled:cursor-wait disabled:opacity-60"
      >
        {state === "submitting" && <LoaderCircle className="h-5 w-5 animate-spin" />}
        {state === "submitting" ? t("referral.form.sending") : t("referral.form.submit")}
      </button>
    </form>
  );
}
