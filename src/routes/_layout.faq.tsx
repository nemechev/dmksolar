import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { useI18n } from "@/lib/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/_layout/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "FAQ — DMK SOLAR" },
      {
        name: "description",
        content: "Часті питання про сонячні електростанції, встановлення, гарантії.",
      },
    ],
  }),
});

function FAQ() {
  const { t } = useI18n();
  const calculatorLink = (
    <Link
      to="/calculator"
      className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 transition hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      {t("nav.calculator")}
    </Link>
  );
  const items = [
    {
      q: t("faq.cost.q"),
      a: (
        <p>
          {t("faq.cost.before")} «{calculatorLink}».
        </p>
      ),
    },
    {
      q: t("faq.warranty.q"),
      a: (
        <div className="space-y-3">
          <p>{t("faq.warranty.panels")}</p>
          <p>{t("faq.warranty.equipment")}</p>
        </div>
      ),
    },
    {
      q: t("faq.payback.q"),
      a: (
        <div className="space-y-3">
          <p>
            {t("faq.payback.before")} «{calculatorLink}».
          </p>
          <p>{t("faq.payback.dependency")}</p>
        </div>
      ),
    },
  ];
  return (
    <Section eyebrow={t("faq.subtitle")} title={t("faq.title")}>
      <Accordion type="single" collapsible className="max-w-3xl">
        {items.map((it, i) => (
          <AccordionItem key={i} value={`i-${i}`}>
            <AccordionTrigger className="text-left text-base font-semibold">
              {it.q}
            </AccordionTrigger>
            <AccordionContent className="text-base leading-7 text-muted-foreground">
              {it.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
