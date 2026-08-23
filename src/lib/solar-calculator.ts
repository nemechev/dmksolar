export type ObjectType = "home" | "business";
export type StationType = "grid" | "hybrid";
export type MountingType = "roof" | "ground";
export type PhaseType = "single" | "three";

export const REFERENCE_PRICING = {
  gridUsdPerKw: 340,
  hybridUsdPerKw: 800,
  roofMultiplier: 1,
  groundMultiplier: 1.2,
  uahPerUsd: 42,
  annualGenerationPerKw: 1100,
} as const;

export const POWER_RANGES: Record<ObjectType, { min: number; max: number }> = {
  home: { min: 5, max: 30 },
  business: { min: 5, max: 500 },
};

export type SolarEstimateInput = {
  objectType: ObjectType;
  stationType: StationType;
  mountingType: MountingType;
  monthlyConsumption: number;
  tariff: number;
  selectedPower?: number;
};

export type SolarEstimate = {
  recommendedPower: number;
  stationCostUsd: number;
  stationCostUah: number;
  annualConsumption: number;
  annualElectricityCost: number;
  paybackYears: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function recommendPower(monthlyConsumption: number, objectType: ObjectType): number {
  const annualConsumption = monthlyConsumption * 12;
  const calculatedPower = Math.ceil(annualConsumption / REFERENCE_PRICING.annualGenerationPerKw);
  const { min, max } = POWER_RANGES[objectType];

  return clamp(calculatedPower, min, max);
}

export function calculateSolarEstimate(input: SolarEstimateInput): SolarEstimate {
  const range = POWER_RANGES[input.objectType];
  const recommendedPower = clamp(
    input.selectedPower ?? recommendPower(input.monthlyConsumption, input.objectType),
    range.min,
    range.max,
  );
  const usdPerKw =
    input.stationType === "grid"
      ? REFERENCE_PRICING.gridUsdPerKw
      : REFERENCE_PRICING.hybridUsdPerKw;
  const mountingMultiplier =
    input.mountingType === "ground"
      ? REFERENCE_PRICING.groundMultiplier
      : REFERENCE_PRICING.roofMultiplier;
  const stationCostUsd = Math.round(recommendedPower * usdPerKw * mountingMultiplier);
  const stationCostUah = Math.round(stationCostUsd * REFERENCE_PRICING.uahPerUsd);
  const annualConsumption = Math.round(input.monthlyConsumption * 12);
  const annualElectricityCost = Math.round(annualConsumption * input.tariff);
  const paybackYears =
    annualElectricityCost > 0 ? stationCostUah / annualElectricityCost : Number.POSITIVE_INFINITY;

  return {
    recommendedPower,
    stationCostUsd,
    stationCostUah,
    annualConsumption,
    annualElectricityCost,
    paybackYears,
  };
}
