import business from "@/assets/business-solar.jpg";
import businessProjectExterior from "@/assets/business-project-exterior.jpg";
import businessProjectRoof from "@/assets/business-project-roof.jpg";
import businessProjectVideoPoster from "@/assets/business-project-video-poster.jpg";
import house from "@/assets/house-solar.jpg";
import install from "@/assets/install-team.jpg";
import homeProjectExterior from "@/assets/home-project-exterior.jpg";
import homeStorageMain from "@/assets/home-storage-main.png";
import homeProjectInteriorConnections from "@/assets/home-project-interior-connections.jpg";
import homeProjectInteriorFront from "@/assets/home-project-interior-front.jpg";
import homeProjectInteriorLabel from "@/assets/home-project-interior-label.jpg";
import homeProjectInteriorWide from "@/assets/home-project-interior-wide.jpg";
import homeProjectVideoPoster from "@/assets/home-project-video-poster.jpg";
import homePoltava595Cover from "@/assets/home-poltava-595-cover.jpg";
import homePoltava595Roof1 from "@/assets/home-poltava-595-roof-1.jpg";
import homePoltava595Roof2 from "@/assets/home-poltava-595-roof-2.jpg";
import homePoltava595Exterior from "@/assets/home-poltava-595-exterior.jpg";
import homePoltava595Inverter from "@/assets/home-poltava-595-inverter.jpg";
import homePoltava595Battery from "@/assets/home-poltava-595-battery.jpg";
import homePoltava595InverterLabel from "@/assets/home-poltava-595-inverter-label.jpg";
import homePoltava595System from "@/assets/home-poltava-595-system.jpg";

export type ProjectMetric = {
  label: string;
  value: string;
  kind: "power" | "inverter" | "panels" | "battery" | "backup" | "generation";
};

export type ProjectResult = { label: string; value: string };

export type Project = {
  slug: string;
  title: string;
  cardTitle?: string;
  cardSubtitle?: string;
  location: string;
  locationEn?: string;
  type: string;
  category: "home" | "business";
  image: string;
  gallery: string[];
  video?: string;
  videoPoster?: string;
  intro: string;
  description: string[];
  features: string[];
  metrics: ProjectMetric[];
  results: ProjectResult[];
};

type ProjectValues = {
  inverter: string;
  panels: string;
  battery: string;
  backup: string;
  generation: string;
  intro: string;
  description: string[];
  results: ProjectResult[];
  features?: string[];
  metrics?: ProjectMetric[];
  gallery?: string[];
  video?: string;
  videoPoster?: string;
};

const createProject = (
  base: Pick<
    Project,
    | "slug"
    | "title"
    | "cardTitle"
    | "cardSubtitle"
    | "location"
    | "locationEn"
    | "type"
    | "category"
    | "image"
  >,
  values: ProjectValues,
): Project => ({
  ...base,
  gallery: values.gallery ?? [base.image, install, house, business],
  video: values.video,
  videoPoster: values.videoPoster,
  intro: values.intro,
  description: values.description,
  features: values.features ?? [
    "Р”РёСЃС‚Р°РЅС†С–Р№РЅРёР№ РјРѕРЅС–С‚РѕСЂРёРЅРі СЂРѕР±РѕС‚Рё СЃС‚Р°РЅС†С–С—",
    "РђРІС‚РѕРјР°С‚РёС‡РЅРµ СЂРµР·РµСЂРІСѓРІР°РЅРЅСЏ РєСЂРёС‚РёС‡РЅРёС… РЅР°РІР°РЅС‚Р°Р¶РµРЅСЊ",
    "Р—Р°С…РёСЃС‚ РѕР±Р»Р°РґРЅР°РЅРЅСЏ С‚Р° РїСЂРѕС„РµСЃС–Р№РЅРµ РЅР°Р»Р°С€С‚СѓРІР°РЅРЅСЏ",
    "Р“РѕС‚РѕРІРЅС–СЃС‚СЊ СЃРёСЃС‚РµРјРё РґРѕ РїРѕРґР°Р»СЊС€РѕРіРѕ СЂРѕР·С€РёСЂРµРЅРЅСЏ",
  ],
  metrics: values.metrics ?? [
    {
      label: "РџРѕС‚СѓР¶РЅС–СЃС‚СЊ РЎР•РЎ",
      value: base.title.replace("РЎР•РЎ ", ""),
      kind: "power",
    },
    { label: "Р†РЅРІРµСЂС‚РѕСЂ", value: values.inverter, kind: "inverter" },
    { label: "РЎРѕРЅСЏС‡РЅС– РїР°РЅРµР»С–", value: values.panels, kind: "panels" },
    { label: "Р„РјРЅС–СЃС‚СЊ РђРљР‘", value: values.battery, kind: "battery" },
    { label: "Р РµР·РµСЂРІРЅРµ Р¶РёРІР»РµРЅРЅСЏ", value: values.backup, kind: "backup" },
    { label: "Р С–С‡РЅР° РіРµРЅРµСЂР°С†С–СЏ", value: values.generation, kind: "generation" },
  ],
  results: values.results,
});

export const homeProjects: Project[] = [
  createProject(
    {
      slug: "home-solar-5-95-poltava",
      title: "РЎРѕРЅСЏС‡РЅР° РµР»РµРєС‚СЂРѕСЃС‚Р°РЅС†С–СЏ",
      cardSubtitle: "5,95 РєР’С‚",
      location: "Рј. РџРѕР»С‚Р°РІР°, РџРѕР»С‚Р°РІСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ",
      locationEn: "Poltava, Poltava region",
      type: "РџСЂРёРІР°С‚РЅРёР№ Р±СѓРґРёРЅРѕРє",
      category: "home",
      image: homePoltava595Cover,
    },
    {
      inverter: "6 РєР’С‚",
      panels: "10 С€С‚. Г— 595 Р’С‚",
      battery: "5 РєР’С‚В·РіРѕРґ",
      backup: "РІС–Рґ 5 РіРѕРґ РїСЂРё 1 РєР’С‚",
      generation: "5,95 РєР’С‚ РїРѕС‚СѓР¶РЅС–СЃС‚СЊ Р¤Р•Рњ",
      intro:
        "Р“С–Р±СЂРёРґРЅР° СЃРѕРЅСЏС‡РЅР° РµР»РµРєС‚СЂРѕСЃС‚Р°РЅС†С–СЏ РґР»СЏ РїСЂРёРІР°С‚РЅРѕРіРѕ Р±СѓРґРёРЅРєСѓ Р· Р°РєСѓРјСѓР»СЏС‚РѕСЂРЅРѕСЋ Р±Р°С‚Р°СЂРµС”СЋ С‚Р° СЂРµР·РµСЂРІРЅРёРј Р¶РёРІР»РµРЅРЅСЏРј РїС–Рґ С‡Р°СЃ Р±Р»РµРєР°СѓС‚С–РІ.",
      description: [
        "РћР±вЂ™С”РєС‚ вЂ” РїСЂРёРІР°С‚РЅРёР№ Р±СѓРґРёРЅРѕРє Сѓ РјС–СЃС‚С– РџРѕР»С‚Р°РІР°, РџРѕР»С‚Р°РІСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ. РўРёРї РЎР•РЎ: РіС–Р±СЂРёРґРЅР° СЃРѕРЅСЏС‡РЅР° РµР»РµРєС‚СЂРѕСЃС‚Р°РЅС†С–СЏ Р· Р°РєСѓРјСѓР»СЏС‚РѕСЂРЅРѕСЋ Р±Р°С‚Р°СЂРµС”СЋ РґР»СЏ РїРѕРІРЅРѕС— Р°РІС‚РѕРЅРѕРјРЅРѕСЃС‚С– Сѓ РІРёРїР°РґРєСѓ Р±Р»РµРєР°СѓС‚С–РІ РїРѕС‚СѓР¶РЅС–СЃС‚СЋ 6 РєР’С‚.",
        "Р¤РѕС‚РѕРµР»РµРєС‚СЂРёС‡РЅС– РјРѕРґСѓР»С– СЂРѕР·С‚Р°С€РѕРІР°РЅС– РЅР° РґР°С…Сѓ Р±СѓРґС–РІР»С– РїС–Рґ РєСѓС‚РѕРј РЅР°С…РёР»Сѓ РєРѕРЅСЃС‚СЂСѓРєС†С–С— 25В°. РЎС‚Р°РЅС†С–СЋ СЂРµР°Р»С–Р·РѕРІР°РЅРѕ Р±РµР· РїС–РґРєР»СЋС‡РµРЅРЅСЏ РґРѕ Р·РµР»РµРЅРѕРіРѕ С‚Р°СЂРёС„Сѓ.",
        "Р—Р°РїР°СЃ СЂРµР·РµСЂРІРЅРѕРіРѕ РµРЅРµСЂРіРѕРїРѕСЃС‚Р°С‡Р°РЅРЅСЏ вЂ” РЅРµ РјРµРЅС€Рµ 5 РіРѕРґ РїСЂРё РЅР°РІР°РЅС‚Р°Р¶РµРЅРЅС– 1 РєР’С‚В·РіРѕРґ. Р”Р»СЏ РґРѕРІРіРѕС‚СЂРёРІР°Р»РѕРіРѕ РІРёРєРѕСЂРёСЃС‚Р°РЅРЅСЏ РђРљР‘ РїСЂРё РґРѕСЃСЏРіРЅРµРЅРЅС– Р·Р°СЂСЏРґСѓ РјРµРЅС€Рµ 10% СЂРµР·РµСЂРІРЅРµ Р¶РёРІР»РµРЅРЅСЏ РЅРµ РїРѕРґР°С”С‚СЊСЃСЏ. Р§Р°СЃ РїРѕРІРЅРѕС— Р·Р°СЂСЏРґРєРё РђРљР‘ Р·Р°Р»РµР¶РёС‚СЊ РІС–Рґ РїРѕРіРѕРґРЅРёС… СѓРјРѕРІ С‚Р° СЃРїРѕР¶РёРІР°РЅРЅСЏ РµР»РµРєС‚СЂРѕРµРЅРµСЂРіС–С— РѕР±вЂ™С”РєС‚РѕРј.",
      ],
      features: [
        "РџРѕРІРЅР° Р°РІС‚РѕРЅРѕРјРЅС–СЃС‚СЊ РїСЂРёРІР°С‚РЅРѕРіРѕ Р±СѓРґРёРЅРєСѓ Сѓ РІРёРїР°РґРєСѓ Р±Р»РµРєР°СѓС‚С–РІ",
        "10 С„РѕС‚РѕРµР»РµРєС‚СЂРёС‡РЅРёС… РјРѕРґСѓР»С–РІ РїРѕС‚СѓР¶РЅС–СЃС‚СЋ 595 Р’С‚",
        "Р РѕР·РјС–С‰РµРЅРЅСЏ РјРѕРґСѓР»С–РІ РЅР° РґР°С…Сѓ РїС–Рґ РєСѓС‚РѕРј 25В°",
        "Р РѕР±РѕС‚Р° Р±РµР· РїС–РґРєР»СЋС‡РµРЅРЅСЏ РґРѕ Р·РµР»РµРЅРѕРіРѕ С‚Р°СЂРёС„Сѓ",
      ],
      metrics: [
        { label: "РџРѕС‚СѓР¶РЅС–СЃС‚СЊ РЎР•РЎ", value: "5,95 РєР’С‚", kind: "power" },
        { label: "Р“С–Р±СЂРёРґРЅРёР№ С–РЅРІРµСЂС‚РѕСЂ", value: "6 РєР’С‚", kind: "inverter" },
        { label: "РљС–Р»СЊРєС–СЃС‚СЊ Р¤Р•Рњ", value: "10", kind: "panels" },
        { label: "РџРѕС‚СѓР¶РЅС–СЃС‚СЊ РїР°РЅРµР»С–", value: "595 Р’С‚", kind: "panels" },
        { label: "Р„РјРЅС–СЃС‚СЊ РђРљР‘", value: "5 РєР’С‚В·РіРѕРґ", kind: "battery" },
        {
          label: "Р РµР·РµСЂРІ РїСЂРё РЅР°РІР°РЅС‚Р°Р¶РµРЅРЅС– 1 РєР’С‚",
          value: "РІС–Рґ 5 РіРѕРґ",
          kind: "backup",
        },
      ],
      gallery: [
        homePoltava595Cover,
        homePoltava595Roof1,
        homePoltava595Roof2,
        homePoltava595Exterior,
        homePoltava595Inverter,
        homePoltava595Battery,
        homePoltava595InverterLabel,
        homePoltava595System,
      ],
      video: "/media/home-poltava-595-tour.mp4",
      videoPoster: homePoltava595Cover,
      results: [
        {
          value: "5,95 РєР’С‚",
          label: "РїРѕС‚СѓР¶РЅС–СЃС‚СЊ РїРѕ С„РѕС‚РѕРµР»РµРєС‚СЂРёС‡РЅРёС… РјРѕРґСѓР»СЏС…",
        },
        { value: "10 Р¤Р•Рњ", label: "СЃРѕРЅСЏС‡РЅРёС… РјРѕРґСѓР»С–РІ РїРѕ 595 Р’С‚" },
        {
          value: "6 РєР’С‚",
          label: "РїРѕС‚СѓР¶РЅС–СЃС‚СЊ РіС–Р±СЂРёРґРЅРѕРіРѕ С–РЅРІРµСЂС‚РѕСЂР°",
        },
        {
          value: "РІС–Рґ 5 РіРѕРґ",
          label: "СЂРµР·РµСЂРІРЅРѕРіРѕ Р¶РёРІР»РµРЅРЅСЏ РїСЂРё 1 РєР’С‚",
        },
      ],
    },
  ),
  createProject(
    {
      slug: "smart-storage-system-poltava",
      title: "Smart Storage System",
      cardSubtitle: "5 РєР’С‚",
      location: "Рј. РџРѕР»С‚Р°РІР°, РџРѕР»С‚Р°РІСЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ",
      locationEn: "Poltava, Poltava region",
      type: "SSS РґР»СЏ РєРІР°СЂС‚РёСЂРё",
      category: "home",
      image: homeStorageMain,
    },
    {
      inverter: "6 РєР’С‚",
      panels: "РјРѕР¶Р»РёРІРµ РїС–РґРєР»СЋС‡РµРЅРЅСЏ",
      battery: "5 РєР’С‚В·РіРѕРґ",
      backup: "РІС–Рґ 5 РіРѕРґ РїСЂРё 1 РєР’С‚",
      generation: "СЃРёСЃС‚РµРјР° РЅР°РєРѕРїРёС‡РµРЅРЅСЏ",
      intro:
        "Р†РЅС‚РµР»РµРєС‚СѓР°Р»СЊРЅР° СЃРёСЃС‚РµРјР° РЅР°РєРѕРїРёС‡РµРЅРЅСЏ С‚Р° РєРµСЂСѓРІР°РЅРЅСЏ РµРЅРµСЂРіС–С”СЋ РґР»СЏ Р±РµР·РїРµСЂРµР±С–Р№РЅРѕРіРѕ РµР»РµРєС‚СЂРѕР¶РёРІР»РµРЅРЅСЏ РєРІР°СЂС‚РёСЂРё.",
      description: [
        "РћР±вЂ™С”РєС‚ вЂ” РєРІР°СЂС‚РёСЂР° Сѓ РјС–СЃС‚С– РџРѕР»С‚Р°РІР°. РўРёРї СЃРёСЃС‚РµРјРё: SSS (Smart Storage System). Р’СЃС‚Р°РЅРѕРІР»РµРЅРѕ РіС–Р±СЂРёРґРЅРёР№ С–РЅРІРµСЂС‚РѕСЂ РїРѕС‚СѓР¶РЅС–СЃС‚СЋ 6 РєР’С‚ С‚Р° Р°РєСѓРјСѓР»СЏС‚РѕСЂРЅРёР№ Р±Р»РѕРє С”РјРЅС–СЃС‚СЋ 5 РєР’С‚В·РіРѕРґ.",
        "SSS РїСЂР°С†СЋС” СЏРє СЂРµР·РµСЂРІРЅРµ РґР¶РµСЂРµР»Рѕ РїС–Рґ С‡Р°СЃ РІС–РґРєР»СЋС‡РµРЅСЊ РјРµСЂРµР¶С– Р°Р±Рѕ СЏРє РїРѕРІРЅРѕС†С–РЅРЅР° Р°Р»СЊС‚РµСЂРЅР°С‚РёРІР° С†РµРЅС‚СЂР°Р»С–Р·РѕРІР°РЅРѕРјСѓ РµРЅРµСЂРіРѕРїРѕСЃС‚Р°С‡Р°РЅРЅСЋ. РЎРёСЃС‚РµРјСѓ РјРѕР¶РЅР° РЅР°РґР°Р»С– СЂРѕР·С€РёСЂРёС‚Рё С„РѕС‚РѕРµР»РµРєС‚СЂРёС‡РЅРёРјРё РјРѕРґСѓР»СЏРјРё.",
      ],
      features: [
        "Р†РЅС‚РµР»РµРєС‚СѓР°Р»СЊРЅРµ РєРµСЂСѓРІР°РЅРЅСЏ РЅР°РєРѕРїРёС‡РµРЅРЅСЏРј РµРЅРµСЂРіС–С—",
        "Р‘РµР·РїРµСЂРµР±С–Р№РЅРµ Р¶РёРІР»РµРЅРЅСЏ РїС–Рґ С‡Р°СЃ РІС–РґРєР»СЋС‡РµРЅСЊ",
        "РђР»СЊС‚РµСЂРЅР°С‚РёРІР° С†РµРЅС‚СЂР°Р»С–Р·РѕРІР°РЅРѕРјСѓ РµРЅРµСЂРіРѕРїРѕСЃС‚Р°С‡Р°РЅРЅСЋ",
        "РњРѕР¶Р»РёРІС–СЃС‚СЊ РїРѕРґР°Р»СЊС€РѕРіРѕ РґРѕРґР°РІР°РЅРЅСЏ СЃРѕРЅСЏС‡РЅРёС… РјРѕРґСѓР»С–РІ",
      ],
      metrics: [
        { label: "Р„РјРЅС–СЃС‚СЊ РђРљР‘", value: "5 РєР’С‚В·РіРѕРґ", kind: "battery" },
        { label: "Р“С–Р±СЂРёРґРЅРёР№ С–РЅРІРµСЂС‚РѕСЂ", value: "6 РєР’С‚", kind: "inverter" },
        {
          label: "Р РµР·РµСЂРІ РїСЂРё РЅР°РІР°РЅС‚Р°Р¶РµРЅРЅС– 1 РєР’С‚",
          value: "РІС–Рґ 5 РіРѕРґ",
          kind: "backup",
        },
      ],
      gallery: [
        homeStorageMain,
        homeProjectInteriorFront,
        homeProjectInteriorConnections,
        homeProjectInteriorLabel,
      ],
      video: "/media/home-project-tour.mp4",
      videoPoster: homeProjectVideoPoster,
      results: [
        {
          value: "5 РєР’С‚В·РіРѕРґ",
          label: "С”РјРЅС–СЃС‚СЊ Р°РєСѓРјСѓР»СЏС‚РѕСЂРЅРѕРіРѕ Р±Р»РѕРєСѓ",
        },
        {
          value: "6 РєР’С‚",
          label: "РїРѕС‚СѓР¶РЅС–СЃС‚СЊ РіС–Р±СЂРёРґРЅРѕРіРѕ С–РЅРІРµСЂС‚РѕСЂР°",
        },
        {
          value: "РІС–Рґ 5 РіРѕРґ",
          label: "СЂРµР·РµСЂРІСѓ РїСЂРё РЅР°РІР°РЅС‚Р°Р¶РµРЅРЅС– 1 РєР’С‚",
        },
        {
          value: "SSS",
          label: "РµРЅРµСЂРіРѕРЅРµР·Р°Р»РµР¶РЅС–СЃС‚СЊ С– СЃС‚Р°Р±С–Р»СЊРЅС–СЃС‚СЊ РґР»СЏ РґРѕРјСѓ",
        },
      ],
    },
  ),
];

export const businessProjects: Project[] = [
  createProject(
    {
      slug: "agro-59-52-cherkasy",
      title: "РЎР•РЎ 59,52 РєР’С‚",
      cardTitle: "РЎРѕРЅСЏС‡РЅР° РµР»РµРєС‚СЂРѕСЃС‚Р°РЅС†С–СЏ",
      cardSubtitle: "60 РєР’С‚",
      location: "Р§РµСЂРєР°СЃСЊРєР° РѕР±Р»Р°СЃС‚СЊ, СЃ. Р‘Р°РіРІР°",
      locationEn: "Cherkasy region, Bahva village",
      type: "РЎС–Р»СЊСЃСЊРєРѕРіРѕСЃРїРѕРґР°СЂСЃСЊРєРµ РїС–РґРїСЂРёС”РјСЃС‚РІРѕ",
      category: "business",
      image: businessProjectExterior,
    },
    {
      inverter: "60 РєР’С‚",
      panels: "96 С€С‚. Г— 620 Р’С‚",
      battery: "50 РєР’С‚В·РіРѕРґ",
      backup: "РґРѕ 45 РіРѕРґ РїСЂРё 1 РєР’С‚",
      generation: "69 000 РєР’С‚В·РіРѕРґ",
      intro:
        "Р“С–Р±СЂРёРґРЅР° СЃРѕРЅСЏС‡РЅР° РµР»РµРєС‚СЂРѕСЃС‚Р°РЅС†С–СЏ Р· Р°РєСѓРјСѓР»СЏС‚РѕСЂРЅРёРј СЂРµР·РµСЂРІРѕРј РґР»СЏ Р°РІС‚РѕРЅРѕРјРЅРѕС— СЂРѕР±РѕС‚Рё СЃС–Р»СЊСЃСЊРєРѕРіРѕСЃРїРѕРґР°СЂСЃСЊРєРѕРіРѕ РїС–РґРїСЂРёС”РјСЃС‚РІР°.",
      description: [
        "РћР±вЂ™С”РєС‚ вЂ” СЃС–Р»СЊСЃСЊРєРѕРіРѕСЃРїРѕРґР°СЂСЃСЊРєРµ РїС–РґРїСЂРёС”РјСЃС‚РІРѕ Сѓ СЃРµР»С– Р‘Р°РіРІР° Р§РµСЂРєР°СЃСЊРєРѕС— РѕР±Р»Р°СЃС‚С–. Р“С–Р±СЂРёРґРЅР° РЎР•РЎ РїРѕС‚СѓР¶РЅС–СЃС‚СЋ 59,52 РєР’С‚ Р·Р°Р±РµР·РїРµС‡СѓС” РїРѕРІРЅСѓ Р°РІС‚РѕРЅРѕРјРЅС–СЃС‚СЊ Сѓ СЂР°Р·С– Р±Р»РµРєР°СѓС‚С–РІ.",
        "РќР° РґР°С…Сѓ Р±СѓРґС–РІР»С– РїС–Рґ РєСѓС‚РѕРј 10В° РІСЃС‚Р°РЅРѕРІР»РµРЅРѕ 96 С„РѕС‚РѕРµР»РµРєС‚СЂРёС‡РЅРёС… РјРѕРґСѓР»С–РІ РїРѕС‚СѓР¶РЅС–СЃС‚СЋ 620 Р’С‚ РєРѕР¶РµРЅ. РЎС‚Р°РЅС†С–СЋ СЂРµР°Р»С–Р·РѕРІР°РЅРѕ Р±РµР· РїС–РґРєР»СЋС‡РµРЅРЅСЏ РґРѕ Р·РµР»РµРЅРѕРіРѕ С‚Р°СЂРёС„Сѓ.",
      ],
      features: [
        "РџРѕРІРЅР° Р°РІС‚РѕРЅРѕРјРЅС–СЃС‚СЊ РїС–РґРїСЂРёС”РјСЃС‚РІР° Сѓ СЂР°Р·С– Р±Р»РµРєР°СѓС‚С–РІ",
        "96 С„РѕС‚РѕРµР»РµРєС‚СЂРёС‡РЅРёС… РјРѕРґСѓР»С–РІ РїРѕС‚СѓР¶РЅС–СЃС‚СЋ 620 Р’С‚",
        "Р РѕР·РјС–С‰РµРЅРЅСЏ РјРѕРґСѓР»С–РІ РЅР° РґР°С…Сѓ РїС–Рґ РєСѓС‚РѕРј 10В°",
        "Р РѕР±РѕС‚Р° Р±РµР· РїС–РґРєР»СЋС‡РµРЅРЅСЏ РґРѕ Р·РµР»РµРЅРѕРіРѕ С‚Р°СЂРёС„Сѓ",
      ],
      metrics: [
        { label: "РџРѕС‚СѓР¶РЅС–СЃС‚СЊ РЎР•РЎ", value: "59,52 РєР’С‚", kind: "power" },
        { label: "Р“С–Р±СЂРёРґРЅРёР№ С–РЅРІРµСЂС‚РѕСЂ", value: "60 РєР’С‚", kind: "inverter" },
        { label: "РљС–Р»СЊРєС–СЃС‚СЊ Р¤Р•Рњ", value: "96", kind: "panels" },
        { label: "РџРѕС‚СѓР¶РЅС–СЃС‚СЊ РїР°РЅРµР»С–", value: "620 Р’С‚", kind: "panels" },
        { label: "Р„РјРЅС–СЃС‚СЊ РђРљР‘", value: "50 РєР’С‚В·РіРѕРґ", kind: "battery" },
        {
          label: "Р РµР·РµСЂРІ РїСЂРё РЅР°РІР°РЅС‚Р°Р¶РµРЅРЅС– 1 РєР’С‚",
          value: "РґРѕ 45 РіРѕРґ",
          kind: "backup",
        },
      ],
      gallery: [businessProjectExterior, businessProjectRoof],
      video: "/media/business-project-tour.mp4",
      videoPoster: businessProjectVideoPoster,
      results: [
        { value: "69 000 РєР’С‚В·РіРѕРґ", label: "РіРµРЅРµСЂР°С†С–С— РЅР° СЂС–Рє" },
        { value: "в‰€ 4 СЂРѕРєРё", label: "РѕРєСѓРїРЅС–СЃС‚СЊ СЃС‚Р°РЅС†С–С—" },
        {
          value: "в‰€ 8,1 РіСЂРЅ/РєР’С‚",
          label: "С‚Р°СЂРёС„ РЅР° РµР»РµРєС‚СЂРѕРµРЅРµСЂРіС–СЋ РґР»СЏ РїС–РґРїСЂРёС”РјСЃС‚РІР°",
        },
        {
          value: "24/7",
          label:
            "РµРЅРµСЂРіРѕРЅРµР·Р°Р»РµР¶РЅС–СЃС‚СЊ С– СЃС‚Р°Р±С–Р»СЊРЅС–СЃС‚СЊ РґР»СЏ Р±С–Р·РЅРµСЃСѓ",
        },
      ],
    },
  ),
];

export const allProjects = [...homeProjects, ...businessProjects];

export const getProjectBySlug = (slug: string) => allProjects.find((item) => item.slug === slug);
