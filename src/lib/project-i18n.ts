import type { Project, ProjectMetric, ProjectResult } from "@/data/projects";
import type { Lang } from "@/lib/i18n";

type LocalizedProject = Project & {
  displayTitle: string;
  displayCardTitle?: string;
  displayType: string;
  displayLocation: string;
  displayIntro: string;
  displayDescription: string[];
  displayFeatures: string[];
  displayMetrics: ProjectMetric[];
  displayResults: ProjectResult[];
};

const translations: Record<string, Partial<LocalizedProject>> = {
  "home-solar-5-95-poltava": {
    displayTitle: "Solar power plant",
    displayType: "Private house",
    displayLocation: "Poltava, Poltava region",
    displayIntro:
      "Hybrid solar power plant for a private house with a battery system and backup power during blackouts.",
    displayDescription: [
      "The site is a private house in Poltava, Poltava region. System type: hybrid solar power plant with a battery for full autonomy during blackouts, rated at 6 kW.",
      "The photovoltaic modules are installed on the roof at a 25° structural tilt. The plant was implemented without connection to the green tariff.",
      "Backup power reserve is at least 5 hours with a 1 kW load. To preserve battery life, backup power is not supplied when the charge drops below 10%. Full battery charging time depends on weather conditions and the site’s electricity consumption.",
    ],
    displayFeatures: [
      "Full autonomy for a private house during blackouts",
      "10 photovoltaic modules rated at 595 W each",
      "Roof-mounted modules at a 25° tilt",
      "Operation without connection to the green tariff",
    ],
    displayMetrics: [
      { label: "Plant capacity", value: "5.95 kW", kind: "power" },
      { label: "Hybrid inverter", value: "6 kW", kind: "inverter" },
      { label: "PV modules", value: "10", kind: "panels" },
      { label: "Panel power", value: "595 W", kind: "panels" },
      { label: "Battery capacity", value: "5 kWh", kind: "battery" },
      { label: "Backup at 1 kW load", value: "from 5 h", kind: "backup" },
    ],
    displayResults: [
      { value: "5.95 kW", label: "photovoltaic module capacity" },
      { value: "10 PV modules", label: "solar modules rated at 595 W" },
      { value: "6 kW", label: "hybrid inverter capacity" },
      { value: "from 5 h", label: "backup power at 1 kW load" },
    ],
  },
  "smart-storage-system-poltava": {
    displayTitle: "Smart Storage System",
    displayType: "SSS for an apartment",
    displayLocation: "Poltava, Poltava region",
    displayIntro:
      "Intelligent energy storage and management system for uninterrupted apartment power supply.",
    displayDescription: [
      "The site is an apartment in Poltava. System type: SSS (Smart Storage System). A 6 kW hybrid inverter and a 5 kWh battery block were installed.",
      "SSS works as a backup source during grid outages or as a full alternative to centralized power supply. The system can later be expanded with photovoltaic modules.",
    ],
    displayFeatures: [
      "Intelligent energy storage management",
      "Uninterrupted power during outages",
      "Alternative to centralized power supply",
      "Ready for future solar module expansion",
    ],
    displayMetrics: [
      { label: "Battery capacity", value: "5 kWh", kind: "battery" },
      { label: "Hybrid inverter", value: "6 kW", kind: "inverter" },
      { label: "Backup at 1 kW load", value: "from 5 h", kind: "backup" },
    ],
    displayResults: [
      { value: "5 kWh", label: "battery block capacity" },
      { value: "6 kW", label: "hybrid inverter capacity" },
      { value: "from 5 h", label: "backup at 1 kW load" },
      { value: "SSS", label: "energy independence and stability for home" },
    ],
  },
  "agro-59-52-cherkasy": {
    displayTitle: "Solar power plant",
    displayCardTitle: "Solar power plant",
    displayType: "Agricultural enterprise",
    displayLocation: "Cherkasy region, Bahva village",
    displayIntro:
      "Hybrid solar power plant with battery reserve for autonomous operation of an agricultural enterprise.",
    displayDescription: [
      "The site is an agricultural enterprise in Bahva village, Cherkasy region. The 59.52 kW hybrid solar plant provides full autonomy in case of blackouts.",
      "96 photovoltaic modules rated at 620 W each are installed on the building roof at a 10° angle. The plant was implemented without connection to the green tariff.",
    ],
    displayFeatures: [
      "Full autonomy for the enterprise during blackouts",
      "96 photovoltaic modules rated at 620 W each",
      "Roof-mounted modules at a 10° angle",
      "Operation without connection to the green tariff",
    ],
    displayMetrics: [
      { label: "Plant capacity", value: "59.52 kW", kind: "power" },
      { label: "Hybrid inverter", value: "60 kW", kind: "inverter" },
      { label: "PV modules", value: "96", kind: "panels" },
      { label: "Panel power", value: "620 W", kind: "panels" },
      { label: "Battery capacity", value: "50 kWh", kind: "battery" },
      { label: "Backup at 1 kW load", value: "up to 45 h", kind: "backup" },
    ],
    displayResults: [
      { value: "69,000 kWh", label: "annual generation" },
      { value: "≈ 4 years", label: "plant payback" },
      { value: "≈ 8.1 UAH/kWh", label: "electricity tariff for the enterprise" },
      { value: "24/7", label: "energy independence and stability for business" },
    ],
  },
};

export function localizeProject(project: Project, lang: Lang): LocalizedProject {
  if (lang !== "en") {
    return {
      ...project,
      displayTitle: project.title,
      displayCardTitle: project.cardTitle,
      displayType: project.type,
      displayLocation: project.location,
      displayIntro: project.intro,
      displayDescription: project.description,
      displayFeatures: project.features,
      displayMetrics: project.metrics,
      displayResults: project.results,
    };
  }

  const translated = translations[project.slug] ?? {};
  return {
    ...project,
    displayTitle: translated.displayTitle ?? project.title,
    displayCardTitle: translated.displayCardTitle ?? project.cardTitle,
    displayType: translated.displayType ?? project.type,
    displayLocation: translated.displayLocation ?? project.locationEn ?? project.location,
    displayIntro: translated.displayIntro ?? project.intro,
    displayDescription: translated.displayDescription ?? project.description,
    displayFeatures: translated.displayFeatures ?? project.features,
    displayMetrics: translated.displayMetrics ?? project.metrics,
    displayResults: translated.displayResults ?? project.results,
  };
}
