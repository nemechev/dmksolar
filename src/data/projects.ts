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
    "Дистанційний моніторинг роботи станції",
    "Автоматичне резервування критичних навантажень",
    "Захист обладнання та професійне налаштування",
    "Готовність системи до подальшого розширення",
  ],
  metrics: values.metrics ?? [
    { label: "Потужність СЕС", value: base.title.replace("СЕС ", ""), kind: "power" },
    { label: "Інвертор", value: values.inverter, kind: "inverter" },
    { label: "Сонячні панелі", value: values.panels, kind: "panels" },
    { label: "Ємність АКБ", value: values.battery, kind: "battery" },
    { label: "Резервне живлення", value: values.backup, kind: "backup" },
    { label: "Річна генерація", value: values.generation, kind: "generation" },
  ],
  results: values.results,
});

export const homeProjects: Project[] = [
  createProject(
    {
      slug: "home-solar-5-95-poltava",
      title: "Сонячна електростанція",
      cardSubtitle: "5,95 кВт",
      location: "м. Полтава, Полтавська область",
      locationEn: "Poltava, Poltava region",
      type: "Приватний будинок",
      category: "home",
      image: homePoltava595Cover,
    },
    {
      inverter: "6 кВт",
      panels: "10 шт. × 595 Вт",
      battery: "5 кВт·год",
      backup: "від 5 год при 1 кВт",
      generation: "5,95 кВт потужність ФЕМ",
      intro:
        "Гібридна сонячна електростанція для приватного будинку з акумуляторною батареєю та резервним живленням під час блекаутів.",
      description: [
        "Об’єкт — приватний будинок у місті Полтава, Полтавська область. Тип СЕС: гібридна сонячна електростанція з акумуляторною батареєю для повної автономності у випадку блекаутів потужністю 6 кВт.",
        "Фотоелектричні модулі розташовані на даху будівлі під кутом нахилу конструкції 25°. Станцію реалізовано без підключення до зеленого тарифу.",
        "Запас резервного енергопостачання — не менше 5 год при навантаженні 1 кВт·год. Для довготривалого використання АКБ при досягненні заряду менше 10% резервне живлення не подається. Час повної зарядки АКБ залежить від погодних умов та споживання електроенергії об’єктом.",
      ],
      features: [
        "Повна автономність приватного будинку у випадку блекаутів",
        "10 фотоелектричних модулів потужністю 595 Вт",
        "Розміщення модулів на даху під кутом 25°",
        "Робота без підключення до зеленого тарифу",
      ],
      metrics: [
        { label: "Потужність СЕС", value: "5,95 кВт", kind: "power" },
        { label: "Гібридний інвертор", value: "6 кВт", kind: "inverter" },
        { label: "Кількість ФЕМ", value: "10", kind: "panels" },
        { label: "Потужність панелі", value: "595 Вт", kind: "panels" },
        { label: "Ємність АКБ", value: "5 кВт·год", kind: "battery" },
        {
          label: "Резерв при навантаженні 1 кВт",
          value: "від 5 год",
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
          value: "5,95 кВт",
          label: "потужність по фотоелектричних модулях",
        },
        { value: "10 ФЕМ", label: "сонячних модулів по 595 Вт" },
        {
          value: "6 кВт",
          label: "потужність гібридного інвертора",
        },
        {
          value: "від 5 год",
          label: "резервного живлення при 1 кВт",
        },
      ],
    },
  ),
  createProject(
    {
      slug: "smart-storage-system-poltava",
      title: "Smart Storage System",
      cardSubtitle: "5 кВт",
      location: "м. Полтава, Полтавська область",
      locationEn: "Poltava, Poltava region",
      type: "SSS для квартири",
      category: "home",
      image: homeStorageMain,
    },
    {
      inverter: "6 кВт",
      panels: "можливе підключення",
      battery: "5 кВт·год",
      backup: "від 5 год при 1 кВт",
      generation: "система накопичення",
      intro:
        "Інтелектуальна система накопичення та керування енергією для безперебійного електроживлення квартири.",
      description: [
        "Об’єкт — квартира у місті Полтава. Тип системи: SSS (Smart Storage System). Встановлено гібридний інвертор потужністю 6 кВт та акумуляторний блок ємністю 5 кВт·год.",
        "SSS працює як резервне джерело під час відключень мережі або як повноцінна альтернатива централізованому енергопостачанню. Систему можна надалі розширити фотоелектричними модулями.",
      ],
      features: [
        "Інтелектуальне керування накопиченням енергії",
        "Безперебійне живлення під час відключень",
        "Альтернатива централізованому енергопостачанню",
        "Можливість подальшого додавання сонячних модулів",
      ],
      metrics: [
        { label: "Ємність АКБ", value: "5 кВт·год", kind: "battery" },
        { label: "Гібридний інвертор", value: "6 кВт", kind: "inverter" },
        { label: "Резерв при навантаженні 1 кВт", value: "від 5 год", kind: "backup" },
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
        { value: "5 кВт·год", label: "ємність акумуляторного блоку" },
        { value: "6 кВт", label: "потужність гібридного інвертора" },
        { value: "від 5 год", label: "резерву при навантаженні 1 кВт" },
        { value: "SSS", label: "енергонезалежність і стабільність для дому" },
      ],
    },
  ),
];

export const businessProjects: Project[] = [
  createProject(
    {
      slug: "agro-59-52-cherkasy",
      title: "СЕС 59,52 кВт",
      cardTitle: "Сонячна електростанція",
      cardSubtitle: "60 кВт",
      location: "Черкаська область, с. Багва",
      locationEn: "Cherkasy region, Bahva village",
      type: "Сільськогосподарське підприємство",
      category: "business",
      image: businessProjectExterior,
    },
    {
      inverter: "60 кВт",
      panels: "96 шт. × 620 Вт",
      battery: "50 кВт·год",
      backup: "до 45 год при 1 кВт",
      generation: "69 000 кВт·год",
      intro:
        "Гібридна сонячна електростанція з акумуляторним резервом для автономної роботи сільськогосподарського підприємства.",
      description: [
        "Об’єкт — сільськогосподарське підприємство у селі Багва Черкаської області. Гібридна СЕС потужністю 59,52 кВт забезпечує повну автономність у разі блекаутів.",
        "На даху будівлі під кутом 10° встановлено 96 фотоелектричних модулів потужністю 620 Вт кожен. Станцію реалізовано без підключення до зеленого тарифу.",
      ],
      features: [
        "Повна автономність підприємства у разі блекаутів",
        "96 фотоелектричних модулів потужністю 620 Вт",
        "Розміщення модулів на даху під кутом 10°",
        "Робота без підключення до зеленого тарифу",
      ],
      metrics: [
        { label: "Потужність СЕС", value: "59,52 кВт", kind: "power" },
        { label: "Гібридний інвертор", value: "60 кВт", kind: "inverter" },
        { label: "Кількість ФЕМ", value: "96", kind: "panels" },
        { label: "Потужність панелі", value: "620 Вт", kind: "panels" },
        { label: "Ємність АКБ", value: "50 кВт·год", kind: "battery" },
        { label: "Резерв при навантаженні 1 кВт", value: "до 45 год", kind: "backup" },
      ],
      gallery: [businessProjectExterior, businessProjectRoof],
      video: "/media/business-project-tour.mp4",
      videoPoster: businessProjectVideoPoster,
      results: [
        { value: "69 000 кВт·год", label: "генерації на рік" },
        { value: "≈ 4 роки", label: "окупність станції" },
        { value: "≈ 8,1 грн/кВт", label: "тариф на електроенергію для підприємства" },
        { value: "24/7", label: "енергонезалежність і стабільність для бізнесу" },
      ],
    },
  ),
];

export const allProjects = [...homeProjects, ...businessProjects];

export const getProjectBySlug = (slug: string) => allProjects.find((item) => item.slug === slug);
