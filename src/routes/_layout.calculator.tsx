import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import {
  Building2,
  Check,
  Factory,
  Home,
  Info,
  Landmark,
  Network,
  RotateCcw,
  Sun,
  WalletCards,
  Zap,
} from "lucide-react";

import { Section } from "@/components/site/Section";
import { useI18n } from "@/lib/i18n";
import {
  POWER_RANGES,
  REFERENCE_PRICING,
  calculateSolarEstimate,
  recommendPower,
  type MountingType,
  type ObjectType,
  type PhaseType,
  type SolarEstimate,
  type StationType,
} from "@/lib/solar-calculator";

export const Route = createFileRoute("/_layout/calculator")({
  component: Calculator,
  head: () => ({
    meta: [
      { title: "Калькулятор СЕС — розрахунок вартості та окупності" },
      {
        name: "description",
        content:
          "Розрахуйте рекомендовану потужність, орієнтовну вартість і термін окупності сонячної електростанції.",
      },
    ],
  }),
});

const copy = {
  ua: {
    eyebrow: "Калькулятор СЕС",
    title: "Розрахуйте вашу сонячну станцію",
    subtitle:
      "Заповніть 4 кроки — ми підберемо потужність, розрахуємо вартість і орієнтовний термін окупності.",
    step: "Крок",
    objectTitle: "Оберіть тип об’єкта",
    objectHint: "Для якого об’єкта планується встановлення?",
    home: "Будинок",
    business: "Підприємство",
    stationTitle: "Оберіть тип СЕС",
    stationHint: "Тип станції визначає склад обладнання та базову вартість.",
    grid: "Мережева",
    gridDescription: "Працює разом із загальною мережею без акумуляторів.",
    hybrid: "Гібридна",
    hybridDescription: "Підтримує акумулятори та резервне живлення.",
    paramsTitle: "Параметри підключення",
    phases: "Кількість фаз",
    single: "1 фаза",
    three: "3 фази",
    power: "Необхідна потужність станції",
    powerHint: "Значення автоматично підбирається за споживанням, але його можна змінити.",
    detailsTitle: "Споживання та монтаж",
    consumption: "Середньомісячне споживання",
    consumptionUnit: "кВт·год/міс.",
    consumptionPlaceholder: "Наприклад, 450",
    mounting: "Тип кріплення",
    roof: "На даху",
    ground: "На землі",
    tariff: "Ваш поточний тариф на електроенергію",
    tariffUnit: "грн/кВт·год",
    tariffPlaceholder: "Наприклад, 4,32",
    calculate: "Розрахувати",
    reset: "Очистити",
    completeTitle: "Заповніть усі параметри",
    completeText:
      "Оберіть тип об’єкта, станції, кількість фаз і кріплення, а також вкажіть споживання та тариф.",
    waitingTitle: "Тут з’явиться ваш розрахунок",
    waitingText:
      "Після заповнення форми натисніть «Розрахувати», щоб побачити рекомендовану потужність, бюджет та окупність.",
    resultEyebrow: "Персональний розрахунок",
    resultTitle: "Результат розрахунку СЕС",
    recommended: "Рекомендована потужність",
    cost: "Орієнтовна вартість під ключ",
    annualConsumption: "Річне споживання",
    annualCost: "Річні витрати на електроенергію",
    payback: "Орієнтовний термін окупності",
    years: "років",
    consultation: "Записатися на консультацію",
    resultNote:
      "Розрахунок попередній. Остаточна вартість залежить від проєкту, обладнання та умов монтажу.",
    pricingNote: `Базові ціни прикладу: мережева — ${REFERENCE_PRICING.gridUsdPerKw} $/кВт, гібридна — ${REFERENCE_PRICING.hybridUsdPerKw} $/кВт; наземне кріплення +20%. Перерахунок: ${REFERENCE_PRICING.uahPerUsd} грн/$.`,
  },
  en: {
    eyebrow: "Solar calculator",
    title: "Calculate your solar power plant",
    subtitle:
      "Complete 4 steps to estimate the recommended capacity, turnkey cost and payback period.",
    step: "Step",
    objectTitle: "Select property type",
    objectHint: "Where will the solar power plant be installed?",
    home: "House",
    business: "Business",
    stationTitle: "Select solar plant type",
    stationHint: "The plant type determines its equipment and base price.",
    grid: "Grid-tied",
    gridDescription: "Works with the public grid without batteries.",
    hybrid: "Hybrid",
    hybridDescription: "Supports batteries and backup power.",
    paramsTitle: "Connection parameters",
    phases: "Number of phases",
    single: "1 phase",
    three: "3 phases",
    power: "Required plant capacity",
    powerHint: "Capacity is suggested from consumption and can be adjusted manually.",
    detailsTitle: "Consumption and mounting",
    consumption: "Average monthly consumption",
    consumptionUnit: "kWh/month",
    consumptionPlaceholder: "For example, 450",
    mounting: "Mounting type",
    roof: "On the roof",
    ground: "Ground mounted",
    tariff: "Your current electricity tariff",
    tariffUnit: "UAH/kWh",
    tariffPlaceholder: "For example, 4.32",
    calculate: "Calculate",
    reset: "Reset",
    completeTitle: "Complete all parameters",
    completeText:
      "Select the property, plant, phase and mounting types, then enter consumption and tariff.",
    waitingTitle: "Your estimate will appear here",
    waitingText:
      "Complete the form and press Calculate to see the recommended capacity, budget and payback.",
    resultEyebrow: "Personal estimate",
    resultTitle: "Solar estimate",
    recommended: "Recommended capacity",
    cost: "Estimated turnkey cost",
    annualConsumption: "Annual consumption",
    annualCost: "Annual electricity cost",
    payback: "Estimated payback",
    years: "years",
    consultation: "Book a consultation",
    resultNote:
      "This is a preliminary estimate. Final cost depends on engineering, equipment and installation conditions.",
    pricingNote: `Reference prices: grid-tied — $${REFERENCE_PRICING.gridUsdPerKw}/kW, hybrid — $${REFERENCE_PRICING.hybridUsdPerKw}/kW; ground mounting +20%. Conversion: ${REFERENCE_PRICING.uahPerUsd} UAH/$.`,
  },
} as const;

const parseNumber = (value: string) => Number(value.trim().replace(/\s/g, "").replace(",", "."));

function StepCard({
  number,
  stepLabel,
  title,
  hint,
  children,
}: {
  number: number;
  stepLabel: string;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">
          {String(number).padStart(2, "0")}
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {stepLabel} {number}
          </div>
          <h2 className="mt-1 text-xl font-bold">{title}</h2>
          {hint && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{hint}</p>}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ChoiceButton({
  active,
  title,
  description,
  icon,
  onClick,
}: {
  active: boolean;
  title: string;
  description?: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`relative flex min-h-24 w-full items-start gap-3 rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        active
          ? "border-primary bg-primary/10 shadow-[0_0_0_1px_var(--color-primary)]"
          : "border-border bg-background hover:border-primary/70"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        }`}
      >
        {icon}
      </span>
      <span>
        <span className="block font-semibold">{title}</span>
        {description && (
          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
            {description}
          </span>
        )}
      </span>
      {active && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3.5 w-3.5" />
        </span>
      )}
    </button>
  );
}

function Metric({
  label,
  value,
  featured = false,
}: {
  label: string;
  value: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        featured ? "border-primary bg-primary/10" : "border-white/10 bg-white/5"
      }`}
    >
      <div className="text-xs uppercase tracking-wider text-white/60">{label}</div>
      <div
        className={`mt-2 font-bold ${featured ? "text-2xl text-primary" : "text-xl text-white"}`}
      >
        {value}
      </div>
    </div>
  );
}

function formatPowerValue(power: number, locale: string, lang: "ua" | "en") {
  if (power >= 1000) {
    const megawatts = power / 1000;
    const formatted = megawatts.toLocaleString(locale, {
      maximumFractionDigits: power % 1000 === 0 ? 0 : 1,
    });

    return `${formatted} ${lang === "en" ? "MW" : "МВт"}`;
  }

  return `${power} ${lang === "en" ? "kW" : "кВт"}`;
}

function Calculator() {
  const { lang } = useI18n();
  const c = copy[lang];
  const locale = lang === "ua" ? "uk-UA" : "en-US";
  const [objectType, setObjectType] = useState<ObjectType | null>(null);
  const [stationType, setStationType] = useState<StationType | null>(null);
  const [phaseType, setPhaseType] = useState<PhaseType | null>(null);
  const [mountingType, setMountingType] = useState<MountingType | null>(null);
  const [power, setPower] = useState(5);
  const [monthlyConsumption, setMonthlyConsumption] = useState("");
  const [tariff, setTariff] = useState("4,32");
  const [result, setResult] = useState<SolarEstimate | null>(null);
  const [showErrors, setShowErrors] = useState(false);

  const range = objectType ? POWER_RANGES[objectType] : POWER_RANGES.home;
  const consumptionNumber = parseNumber(monthlyConsumption);
  const tariffNumber = parseNumber(tariff);

  const isComplete =
    objectType !== null &&
    stationType !== null &&
    phaseType !== null &&
    mountingType !== null &&
    Number.isFinite(consumptionNumber) &&
    consumptionNumber > 0 &&
    Number.isFinite(tariffNumber) &&
    tariffNumber > 0;

  const fmt = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }), [locale]);
  const formattedPower = formatPowerValue(power, locale, lang);
  const formattedMinPower = formatPowerValue(range.min, locale, lang);
  const formattedMaxPower = formatPowerValue(range.max, locale, lang);

  const invalidateResult = () => {
    setResult(null);
    setShowErrors(false);
  };

  const chooseObject = (value: ObjectType) => {
    setObjectType(value);
    const nextRange = POWER_RANGES[value];
    const suggested =
      Number.isFinite(consumptionNumber) && consumptionNumber > 0
        ? recommendPower(consumptionNumber, value)
        : nextRange.min;
    setPower(suggested);
    invalidateResult();
  };

  const updatePower = (value: number) => {
    const nextPower = Number.isFinite(value) ? value : range.min;
    setPower(Math.min(range.max, Math.max(range.min, Math.round(nextPower))));
    invalidateResult();
  };

  const updateConsumption = (value: string) => {
    setMonthlyConsumption(value);
    const parsed = parseNumber(value);
    if (objectType && Number.isFinite(parsed) && parsed > 0) {
      setPower(recommendPower(parsed, objectType));
    }
    invalidateResult();
  };

  const calculate = () => {
    if (!isComplete || !objectType || !stationType || !mountingType) {
      setShowErrors(true);
      setResult(null);
      return;
    }

    setShowErrors(false);
    setResult(
      calculateSolarEstimate({
        objectType,
        stationType,
        mountingType,
        monthlyConsumption: consumptionNumber,
        tariff: tariffNumber,
        selectedPower: power,
      }),
    );
  };

  const reset = () => {
    setObjectType(null);
    setStationType(null);
    setPhaseType(null);
    setMountingType(null);
    setPower(5);
    setMonthlyConsumption("");
    setTariff("4,32");
    setResult(null);
    setShowErrors(false);
  };

  return (
    <Section eyebrow={c.eyebrow} title={c.title}>
      <p className="-mt-6 mb-10 max-w-3xl text-muted-foreground">{c.subtitle}</p>

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-5">
          <StepCard number={1} stepLabel={c.step} title={c.objectTitle} hint={c.objectHint}>
            <div className="grid gap-3 sm:grid-cols-2">
              <ChoiceButton
                active={objectType === "home"}
                title={c.home}
                icon={<Home className="h-5 w-5" />}
                onClick={() => chooseObject("home")}
              />
              <ChoiceButton
                active={objectType === "business"}
                title={c.business}
                icon={<Factory className="h-5 w-5" />}
                onClick={() => chooseObject("business")}
              />
            </div>
          </StepCard>

          <StepCard number={2} stepLabel={c.step} title={c.stationTitle} hint={c.stationHint}>
            <div className="grid gap-3 sm:grid-cols-2">
              <ChoiceButton
                active={stationType === "grid"}
                title={c.grid}
                description={c.gridDescription}
                icon={<Network className="h-5 w-5" />}
                onClick={() => {
                  setStationType("grid");
                  invalidateResult();
                }}
              />
              <ChoiceButton
                active={stationType === "hybrid"}
                title={c.hybrid}
                description={c.hybridDescription}
                icon={<Zap className="h-5 w-5" />}
                onClick={() => {
                  setStationType("hybrid");
                  invalidateResult();
                }}
              />
            </div>
          </StepCard>

          <StepCard number={3} stepLabel={c.step} title={c.paramsTitle}>
            <div>
              <div className="mb-3 text-sm font-semibold">{c.phases}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <ChoiceButton
                  active={phaseType === "single"}
                  title={c.single}
                  icon={<Zap className="h-5 w-5" />}
                  onClick={() => {
                    setPhaseType("single");
                    invalidateResult();
                  }}
                />
                <ChoiceButton
                  active={phaseType === "three"}
                  title={c.three}
                  icon={<Landmark className="h-5 w-5" />}
                  onClick={() => {
                    setPhaseType("three");
                    invalidateResult();
                  }}
                />
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-background p-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <label htmlFor="solar-power" className="text-sm font-semibold">
                    {c.power}
                  </label>
                  <p className="mt-1 max-w-lg text-xs text-muted-foreground">{c.powerHint}</p>
                </div>
                <div className="text-3xl font-extrabold text-primary">{formattedPower}</div>
              </div>
              <input
                id="solar-power"
                type="range"
                min={range.min}
                max={range.max}
                step={1}
                value={power}
                disabled={!objectType}
                onChange={(event) => updatePower(Number(event.target.value))}
                className="mt-5 w-full cursor-pointer accent-[color:var(--primary)] disabled:cursor-not-allowed disabled:opacity-40"
              />
              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_180px] sm:items-end">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formattedMinPower}</span>
                  <span>{formattedMaxPower}</span>
                </div>
                <label className="block">
                  <span className="mb-1 block text-xs font-semibold text-muted-foreground">
                    {lang === "en" ? "Enter capacity manually" : "Ввести потужність вручну"}
                  </span>
                  <input
                    type="number"
                    min={range.min}
                    max={range.max}
                    step={1}
                    value={power}
                    disabled={!objectType}
                    onChange={(event) => updatePower(Number(event.target.value))}
                    className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-40"
                  />
                </label>
              </div>
            </div>
          </StepCard>

          <StepCard number={4} stepLabel={c.step} title={c.detailsTitle}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold">{c.consumption}</span>
                <span className="mt-2 flex overflow-hidden rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={monthlyConsumption}
                    onChange={(event) => updateConsumption(event.target.value)}
                    placeholder={c.consumptionPlaceholder}
                    className="h-12 min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
                  />
                  <span className="flex items-center border-l border-border px-3 text-xs text-muted-foreground">
                    {c.consumptionUnit}
                  </span>
                </span>
              </label>

              <label className="block">
                <span className="text-sm font-semibold">{c.tariff}</span>
                <span className="mt-2 flex overflow-hidden rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={tariff}
                    onChange={(event) => {
                      setTariff(event.target.value);
                      invalidateResult();
                    }}
                    placeholder={c.tariffPlaceholder}
                    className="h-12 min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
                  />
                  <span className="flex items-center border-l border-border px-3 text-xs text-muted-foreground">
                    {c.tariffUnit}
                  </span>
                </span>
              </label>
            </div>

            <div className="mt-5">
              <div className="mb-3 text-sm font-semibold">{c.mounting}</div>
              <div className="grid gap-3 sm:grid-cols-2">
                <ChoiceButton
                  active={mountingType === "roof"}
                  title={c.roof}
                  icon={<Building2 className="h-5 w-5" />}
                  onClick={() => {
                    setMountingType("roof");
                    invalidateResult();
                  }}
                />
                <ChoiceButton
                  active={mountingType === "ground"}
                  title={c.ground}
                  icon={<Sun className="h-5 w-5" />}
                  onClick={() => {
                    setMountingType("ground");
                    invalidateResult();
                  }}
                />
              </div>
            </div>
          </StepCard>

          {showErrors && (
            <div
              role="alert"
              className="flex gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm"
            >
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <div>
                <div className="font-semibold">{c.completeTitle}</div>
                <p className="mt-1 text-muted-foreground">{c.completeText}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={calculate}
              className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <WalletCards className="h-5 w-5" />
              {c.calculate}
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 font-semibold transition hover:border-primary"
            >
              <RotateCcw className="h-4 w-4" />
              {c.reset}
            </button>
          </div>

          <div className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{c.pricingNote}</span>
          </div>
        </div>

        <aside className="xl:sticky xl:top-24">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-dark text-dark-foreground shadow-2xl">
            <div className="h-1.5 bg-primary" />
            {result ? (
              <div className="p-6 sm:p-8" aria-live="polite">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {c.resultEyebrow}
                </div>
                <h2 className="mt-2 text-2xl font-bold">{c.resultTitle}</h2>

                <div className="mt-6 grid gap-3">
                  <Metric
                    featured
                    label={c.recommended}
                    value={formatPowerValue(result.recommendedPower, locale, lang)}
                  />
                  <Metric
                    label={c.cost}
                    value={`${fmt.format(result.stationCostUah)} ${lang === "en" ? "UAH" : "грн"}`}
                  />
                  <div className="-mt-1 text-right text-xs text-white/45">
                    ≈ ${fmt.format(result.stationCostUsd)}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Metric
                      label={c.annualConsumption}
                      value={`${fmt.format(result.annualConsumption)} ${lang === "en" ? "kWh" : "кВт·год"}`}
                    />
                    <Metric
                      label={c.annualCost}
                      value={`${fmt.format(result.annualElectricityCost)} ${lang === "en" ? "UAH" : "грн"}`}
                    />
                  </div>
                  <Metric
                    featured
                    label={c.payback}
                    value={`${result.paybackYears.toLocaleString(locale, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })} ${c.years}`}
                  />
                </div>

                <Link
                  to="/contacts"
                  className="mt-6 inline-flex h-13 w-full items-center justify-center rounded-xl bg-primary px-5 text-center text-sm font-bold text-primary-foreground transition hover:brightness-110"
                >
                  {c.consultation}
                </Link>
                <p className="mt-4 text-xs leading-relaxed text-white/50">{c.resultNote}</p>
              </div>
            ) : (
              <div className="flex min-h-[430px] flex-col items-center justify-center p-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <Sun className="h-9 w-9" />
                </div>
                <h2 className="mt-6 text-2xl font-bold">{c.waitingTitle}</h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                  {c.waitingText}
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </Section>
  );
}
