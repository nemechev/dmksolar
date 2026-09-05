import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { referralForm } from "@/config/site";
import { useI18n } from "@/lib/i18n";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function PartnershipForm() {
  const { t } = useI18n();
  const [state, setState] = useState<SubmitState>("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setState("submitting");

    try {
      const formData = new FormData(form);
      const partnerName = String(formData.get(referralForm.fields.referrerName) ?? "").trim();
      const partnerPhone = String(formData.get(referralForm.fields.referrerPhone) ?? "").trim();
      const contactData = String(formData.get(referralForm.fields.contactData) ?? "").trim();
      const promoCode = String(formData.get(referralForm.fields.promocode) ?? "").trim();

      formData.set(referralForm.fields.referrerPhone, partnerPhone || "+380000000000");
      formData.set(
        referralForm.fields.referrerName,
        [
          partnerName,
          contactData ? `Контактні дані: ${contactData}` : "",
          promoCode ? `Промокод: ${promoCode}` : "",
        ]
          .filter(Boolean)
          .join(" | "),
      );
      formData.set(referralForm.fields.clientName, "Заявка на партнерську програму");
      formData.set(referralForm.fields.clientPhone, "+380000000000");

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
        <h2 className="mt-6 text-2xl font-bold">Заявку прийнято</h2>
        <p className="mt-3 leading-7 text-dark-foreground/70">
          Дякуємо! Ми зв’яжемося з вами та обговоримо формат співпраці.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-7 w-fit border-b border-primary pb-1 text-sm font-semibold text-primary"
        >
          Надіслати ще одну заявку
        </button>
      </div>
    );
  }

  const inputClass =
    "h-12 w-full border border-white/15 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <form onSubmit={submit} className="border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Партнерська форма
      </p>
      <h2 className="mt-3 text-2xl font-bold md:text-3xl">Хочу стати партнером</h2>

      <div className="mt-7 grid gap-3">
        <label className="sr-only" htmlFor="partner-name">
          ПІБ
        </label>
        <input
          id="partner-name"
          required
          name={referralForm.fields.referrerName}
          autoComplete="name"
          placeholder="ПІБ"
          className={inputClass}
        />
        <label className="sr-only" htmlFor="partner-phone">
          Номер телефону
        </label>
        <input
          id="partner-phone"
          name={referralForm.fields.referrerPhone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          pattern="[+0-9()\s-]{10,20}"
          placeholder="Номер телефону (не обов’язково)"
          className={inputClass}
        />
        <label className="sr-only" htmlFor="partner-contact-data">
          Контактні дані
        </label>
        <input
          id="partner-contact-data"
          name={referralForm.fields.contactData}
          autoComplete="off"
          placeholder="Контактні дані: WhatsApp, Viber, Telegram тощо (не обов’язково)"
          className={inputClass}
        />
        <label className="sr-only" htmlFor="partner-promocode">
          {t("form.promocode")}
        </label>
        <input
          id="partner-promocode"
          name={referralForm.fields.promocode}
          autoComplete="off"
          placeholder={`${t("form.promocode")} (не обов’язково)`}
          className={inputClass}
        />
      </div>

      <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-white/55">
        <input required type="checkbox" className="mt-1 accent-[color:var(--primary)]" />
        {t("form.consent")}
      </label>

      {state === "error" && (
        <p className="mt-4 text-sm text-red-300" role="alert">
          Дані не надіслано. Перевірте з’єднання та спробуйте ще раз.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-6 flex h-13 w-full items-center justify-center gap-3 bg-primary px-5 font-semibold text-primary-foreground transition hover:brightness-110 active:translate-y-px disabled:cursor-wait disabled:opacity-60"
      >
        {state === "submitting" && <LoaderCircle className="h-5 w-5 animate-spin" />}
        {state === "submitting" ? "Надсилання…" : "Стати партнером"}
      </button>
    </form>
  );
}
