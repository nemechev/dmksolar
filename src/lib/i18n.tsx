import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ua" | "en";

type Dict = Record<string, string>;

const ua: Dict = {
  "nav.home": "Головна",
  "nav.about": "Про компанію",
  "nav.services": "Наші послуги",
  "nav.catalog": "Каталог",
  "nav.projects": "Наші проєкти",
  "nav.calculator": "Калькулятор",
  "nav.prices": "Ціни",
  "nav.blog": "Блог",
  "nav.faq": "FAQ",
  "nav.contacts": "Контакти",
  "nav.referral": "Партнерська програма",
  "nav.main": "Головна навігація",
  "nav.mobile": "Мобільна навігація",
  "nav.menu": "Відкрити меню",
  "nav.for_home": "Для будинку",
  "nav.for_business": "Для бізнесу",

  "cta.consult": "Замовити консультацію",
  "cta.calc": "Безкоштовний розрахунок",
  "cta.request": "Залишити заявку",
  "cta.more": "Дізнатися більше",
  "cta.send": "Надіслати",
  "cta.all_projects": "Дивитись усі проєкти",

  "hero.tag": "Проєктування та встановлення СЕС",
  "hero.title": "Сонячні електростанції під ключ",
  "hero.location": "Україна",
  "hero.subtitle":
    "Проєктуємо, монтуємо та обслуговуємо СЕС для будинків і бізнесу по всій Україні",

  "home.metrics.title": "Ключові показники",
  "home.metrics.subtitle": "Про компанію",
  "home.m1.k": "12+ років",
  "home.m1.v": "на ринку сонячної енергетики",
  "home.m2.k": "500+",
  "home.m2.v": "реалізованих проєктів",
  "home.m3.k": "45 МВт",
  "home.m3.v": "загальна встановлена потужність",
  "home.m4.k": "25 років",
  "home.m4.v": "гарантії на панелі",

  "home.services.title": "Наші послуги",
  "home.services.subtitle": "Що ми робимо",
  "svc.design.t": "Проєктування",
  "svc.design.d": "Технічний аудит об’єкта, розрахунок і 3D-модель СЕС.",
  "svc.supply.t": "Постачання обладнання",
  "svc.supply.d": "Панелі, інвертори та кріплення сертифікованих виробників.",
  "svc.install.t": "Монтаж",
  "svc.install.d": "Професійний монтаж під ключ бригадами з досвідом 5+ років.",
  "svc.connect.t": "Підключення",
  "svc.connect.d": "Підключення до мережі, оформлення документів «зеленого» тарифу.",
  "svc.service.t": "Сервіс та підтримка",
  "svc.service.d": "Гарантійне та післягарантійне обслуговування, моніторинг 24/7.",

  "home.for.title": "Рішення для вас",
  "home.for.home.t": "Для будинку",
  "home.for.home.d":
    "СЕС 5–30 кВт для приватних будинків. Автономність та економія на комунальних.",
  "home.for.biz.t": "Для бізнесу",
  "home.for.biz.d": "Промислові СЕС від 30 кВт до кількох МВт. Швидка окупність, стабільність.",

  "home.stages.title": "Етапи реалізації",
  "stage.1.t": "Проєктування",
  "stage.1.d": "Розробка технічного рішення та моделювання",
  "stage.2.t": "Постачання обладнання",
  "stage.2.d": "Підбір та доставка сертифікованого обладнання",
  "stage.3.t": "Монтаж",
  "stage.3.d": "Професійний монтаж та налаштування систем",
  "stage.4.t": "Підключення",
  "stage.4.d": "Підключення до мережі та запуск",
  "stage.5.t": "Сервіс та підтримка",
  "stage.5.d": "Гарантійне та післягарантійне обслуговування",

  "home.guarantee.title": "Наші гарантії",
  "home.guarantee.sub": "Гарантії",
  "g.1.t": "25 років на панелі",
  "g.1.d": "Продуктивність не менше 80% через 25 років експлуатації.",
  "g.2.t": "10 років на монтаж",
  "g.2.d": "Гарантія на всі монтажні роботи та кріплення.",
  "g.3.t": "5 років на інвертори",
  "g.3.d": "Розширена гарантія від виробників інверторів.",
  "g.4.t": "Договір і документи",
  "g.4.d": "Офіційний договір, гарантійні талони, повний пакет документів.",

  "home.partners.title": "Партнери",
  "home.partners.sub": "З ким ми працюємо",
  "home.partners.desc":
    "Ми співпрацюємо з провідними світовими виробниками сонячних панелей, інверторів та систем накопичення енергії.",

  "home.cta.title": "Хочете таку ж СЕС для свого об’єкта?",
  "home.cta.desc": "Залиште заявку і ми підготуємо індивідуальний розрахунок.",

  "form.name": "Ім’я",
  "form.phone": "Телефон",
  "form.email": "Email",
  "form.message": "Повідомлення",
  "form.promocode": "Промокод",
  "form.consent": "Погоджуюсь з обробкою персональних даних",
  "form.success": "Дякуємо! Ми зв’яжемось з вами найближчим часом.",

  "calc.title": "Калькулятор СЕС",
  "calc.subtitle": "Розрахуйте орієнтовну вартість вашої станції за 30 секунд",
  "calc.type": "Тип об’єкта",
  "calc.type.home": "Приватний будинок",
  "calc.type.biz": "Бізнес / підприємство",
  "calc.power": "Потужність, кВт",
  "calc.roof": "Тип даху",
  "calc.roof.flat": "Плоский",
  "calc.roof.pitched": "Скатний",
  "calc.roof.ground": "Наземна",
  "calc.result.title": "Орієнтовна вартість",
  "calc.result.gen": "Річна генерація",
  "calc.result.pay": "Окупність",
  "calc.result.note": "Розрахунок орієнтовний. Для точної пропозиції залиште заявку.",

  "footer.company": "Компанія",
  "footer.services": "Послуги",
  "footer.info": "Інформація",
  "footer.contacts": "Контакти",
  "footer.rights": "© 2026 DMK SOLAR. Усі права захищено.",
  "footer.tagline": "Енергія сонця для вашого успішного бізнесу.",

  "about.title": "Енергія, яка працює на вас",
  "about.lead":
    "Ми — компанія, що спеціалізується на проєктуванні та монтажі сучасних сонячних електростанцій для приватних будинків, бізнесу та підприємств.",
  "about.p1":
    "Ми не просто встановлюємо сонячні панелі — ми створюємо цілісні енергетичні рішення, адаптовані під потреби кожного клієнта.",
  "about.p2":
    "Аналізуємо споживання електроенергії, підбираємо оптимальне обладнання, розраховуємо потужність системи та реалізуємо проєкт «під ключ» — від першої консультації до запуску готової станції.",
  "about.p3":
    "У наших проєктах поєднуються сонячні панелі, інверторні системи, акумуляторні батареї та резервне живлення, що дозволяє не лише виробляти власну електроенергію, а й підвищувати енергонезалежність об’єкта.",
  "about.image_alt": "Команда монтує сонячну електростанцію",
  "about.reasons.eyebrow": "Наш підхід",
  "about.reasons.title": "Чому обирають нас",
  "about.reason.1.title": "Індивідуальний підхід",
  "about.reason.1.description":
    "Кожна станція розраховується відповідно до реального споживання, особливостей об’єкта та цілей клієнта.",
  "about.reason.2.title": "Комплексна реалізація",
  "about.reason.2.description":
    "Ми беремо на себе весь процес: проєктування, підбір обладнання, постачання, монтаж, налаштування та введення системи в експлуатацію.",
  "about.reason.3.title": "Сучасні технології",
  "about.reason.3.description":
    "Використовуємо перевірене обладнання та сучасні рішення для ефективної роботи сонячних електростанцій.",
  "about.reason.4.title": "Енергонезалежність",
  "about.reason.4.description":
    "Проєктуємо системи, які допомагають зменшити залежність від електромережі та забезпечити резервне живлення під час перебоїв.",
  "about.reason.5.title": "Прозорість",
  "about.reason.5.description":
    "Клієнт розуміє, за що платить, яке обладнання встановлюється та який результат отримує.",
  "about.closing":
    "Ми будуємо не просто сонячні електростанції. Ми створюємо власну енергетику для наших клієнтів — на роки вперед.",
  "about.mission.t": "Наша місія",
  "about.mission.d": "Зробити чисту енергію доступною для кожного бізнесу та родини в Україні.",
  "about.values.t": "Наші цінності",
  "about.values.d": "Якість, прозорість, відповідальність та турбота про клієнта на кожному етапі.",

  "catalog.title": "Каталог обладнання",
  "catalog.subtitle": "Сертифіковані панелі, інвертори та системи накопичення",
  "cat.panels": "Сонячні панелі",
  "cat.inverters": "Інвертори",
  "cat.batteries": "Акумулятори",
  "cat.mounting": "Кріплення",

  "projects.title": "Наші проєкти",
  "projects.subtitle": "Реалізовані сонячні електростанції",
  "projects.intro":
    "Оберіть напрямок, щоб переглянути реалізовані рішення для приватних будинків або бізнесу.",
  "projects.items": "проєкти",
  "projects.home.title": "Проєкти для будинку",
  "projects.business.title": "Проєкти для бізнесу",

  "referral.title": "Партнерство з нашою компанією",
  "referral.lead":
    "Знаєте людину, яка планує встановити сонячну електростанцію, інвертор або систему накопичення енергії?",
  "referral.description":
    "Порекомендуйте нашу компанію та отримайте винагороду за успішну рекомендацію.",
  "referral.flow.recommend": "Рекомендуй",
  "referral.flow.install": "Клієнт встановлює СЕС",
  "referral.flow.reward": "Отримуєш від 2%",
  "referral.cta": "Передати рекомендацію",
  "referral.process.eyebrow": "Чотири прості кроки",
  "referral.process.title": "Як це працює?",
  "referral.step.1.title": "Розкажіть про нас",
  "referral.step.1.description":
    "Поділіться нашим сайтом або передайте нам контакт людини, яка зацікавлена у встановленні СЕС.",
  "referral.step.2.title": "Ми зв’яжемося з клієнтом",
  "referral.step.2.description":
    "Наш спеціаліст проконсультує, підбере оптимальне обладнання та розрахує вартість системи.",
  "referral.step.3.title": "Клієнт встановлює СЕС",
  "referral.step.3.description":
    "Ми беремо на себе весь процес — від проєктування та підбору обладнання до монтажу й запуску системи.",
  "referral.step.4.title": "Ви отримуєте винагороду",
  "referral.step.4.description":
    "Після успішної реалізації проєкту ви отримуєте реферальну винагороду — 1% від вартості всього проєкту.",
  "referral.benefits.eyebrow": "Переваги програми",
  "referral.benefits.title": "Чому це вигідно?",
  "referral.benefit.1": "Допомагаєте знайомим перейти на власну енергонезалежність.",
  "referral.benefit.2": "Отримуєте винагороду за рекомендацію.",
  "referral.benefit.3": "Не потрібно самостійно продавати чи встановлювати обладнання.",
  "referral.benefit.4": "Усі технічні та організаційні питання беремо на себе ми.",
  "referral.who.eyebrow": "Участь",
  "referral.who.title": "Хто може брати участь?",
  "referral.who.description":
    "Участь у програмі доступна кожному — клієнтам, партнерам, підприємцям, монтажникам, знайомим та всім, хто має контакти потенційних клієнтів.",
  "referral.who.note":
    "Маєте рекомендацію? Передайте нам контакт — і нехай сонячна енергія працює на вас обох.",
  "referral.form.eyebrow": "Реферальна форма",
  "referral.form.title": "Передайте потенційного клієнта",
  "referral.form.referrer": "Дані того, хто рекомендує",
  "referral.form.client": "Дані потенційного клієнта",
  "referral.form.contact_data": "Контактні дані: WhatsApp, Viber, Telegram тощо",
  "referral.form.full_name": "ПІБ",
  "referral.form.phone": "Номер телефону",
  "referral.form.submit": "Стати партнером",
  "referral.form.sending": "Надсилання…",
  "referral.form.success.title": "Рекомендацію прийнято",
  "referral.form.success":
    "Дякуємо! Вашу рекомендацію отримано. Наш спеціаліст зв’яжеться з потенційним клієнтом.",
  "referral.form.another": "Передати ще один контакт",
  "referral.form.error": "Дані не надіслано. Перевірте з’єднання та спробуйте ще раз.",

  "prices.title": "Ціни",
  "prices.subtitle": "Орієнтовна вартість СЕС під ключ",
  "prices.from": "від",
  "prices.uah": "грн",
  "prices.note": "Ціни орієнтовні. Точна вартість — після аудиту об’єкта.",

  "blog.title": "Блог",
  "blog.subtitle": "Новини, кейси та поради з сонячної енергетики",
  "blog.read": "Читати →",

  "faq.title": "Часті питання",
  "faq.subtitle": "FAQ",
  "faq.cost.q": "Скільки коштує сонячна станція?",
  "faq.cost.before": "Вартість станції та її окупність можна прорахувати у вкладці",
  "faq.warranty.q": "Яка гарантія на обладнання?",
  "faq.warranty.panels": "10 років на сонячні панелі.",
  "faq.warranty.equipment":
    "На інвертори, АКБ та інше обладнання — залежно від виробника, в середньому 5–10 років.",
  "faq.warranty.installation":
    "5 років гарантії на монтажні роботи з урахуванням 2 років сервісного обслуговування.",
  "faq.payback.q": "Який термін окупності?",
  "faq.payback.before": "Приблизну окупність станції можна подивитися та прорахувати у розділі",
  "faq.payback.dependency":
    "Термін окупності залежить від вашого споживання та поточного тарифу на електроенергію.",

  "contacts.title": "Контакти",
  "contacts.subtitle": "Зв’яжіться з нами зручним способом",
  "contacts.address": "Адреса",
  "contacts.city": "Полтава",
  "contacts.phone": "Телефон",
  "contacts.email": "Email",
  "contacts.hours": "Графік роботи",
  "contacts.hours.v": "Пн–Пт: 9:00–18:00",
  "contacts.social": "Соціальні мережі",

  "for.home.title": "СЕС для будинку",
  "for.home.lead": "Автономність та економія на електроенергії для вашої родини",
  "for.biz.title": "СЕС для бізнесу",
  "for.biz.lead": "Промислові станції для підприємств: швидка окупність та енергонезалежність",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.services": "Our services",
  "nav.catalog": "Catalog",
  "nav.projects": "Projects",
  "nav.calculator": "Calculator",
  "nav.prices": "Pricing",
  "nav.blog": "Blog",
  "nav.faq": "FAQ",
  "nav.contacts": "Contacts",
  "nav.referral": "Partnership program",
  "nav.main": "Main navigation",
  "nav.mobile": "Mobile navigation",
  "nav.menu": "Open menu",
  "nav.for_home": "For Home",
  "nav.for_business": "For Business",

  "cta.consult": "Book a consultation",
  "cta.calc": "Free estimate",
  "cta.request": "Send request",
  "cta.more": "Learn more",
  "cta.send": "Send",
  "cta.all_projects": "View all projects",

  "hero.tag": "Design & installation of solar power plants",
  "hero.title": "Turnkey solar power plants",
  "hero.location": "Ukraine",
  "hero.subtitle":
    "We design, install and maintain solar plants for homes and businesses across Ukraine. Up to 25 years warranty.",

  "home.metrics.title": "Key numbers",
  "home.metrics.subtitle": "About the company",
  "home.m1.k": "12+ years",
  "home.m1.v": "in solar energy market",
  "home.m2.k": "500+",
  "home.m2.v": "projects delivered",
  "home.m3.k": "45 MW",
  "home.m3.v": "total installed capacity",
  "home.m4.k": "25 years",
  "home.m4.v": "warranty on panels",

  "home.services.title": "Our services",
  "home.services.subtitle": "What we do",
  "svc.design.t": "Design",
  "svc.design.d": "Technical audit, calculation and 3D model of the plant.",
  "svc.supply.t": "Equipment supply",
  "svc.supply.d": "Panels, inverters and mounting from certified manufacturers.",
  "svc.install.t": "Installation",
  "svc.install.d": "Professional turnkey installation by teams with 5+ years experience.",
  "svc.connect.t": "Grid connection",
  "svc.connect.d": "Grid connection and paperwork for green tariff.",
  "svc.service.t": "Service & support",
  "svc.service.d": "Warranty & post-warranty service, 24/7 monitoring.",

  "home.for.title": "Solutions for you",
  "home.for.home.t": "For Home",
  "home.for.home.d": "5–30 kW plants for private houses. Independence and savings on utilities.",
  "home.for.biz.t": "For Business",
  "home.for.biz.d": "Industrial plants from 30 kW to several MW. Fast payback, stability.",

  "home.stages.title": "How we work",
  "stage.1.t": "Design",
  "stage.1.d": "Technical solution and modeling",
  "stage.2.t": "Equipment supply",
  "stage.2.d": "Selection and delivery of certified equipment",
  "stage.3.t": "Installation",
  "stage.3.d": "Professional installation and setup",
  "stage.4.t": "Connection",
  "stage.4.d": "Grid connection and launch",
  "stage.5.t": "Service & support",
  "stage.5.d": "Warranty and post-warranty service",

  "home.guarantee.title": "Our warranties",
  "home.guarantee.sub": "Guarantees",
  "g.1.t": "25 years on panels",
  "g.1.d": "Performance of at least 80% after 25 years of use.",
  "g.2.t": "10 years on installation",
  "g.2.d": "Warranty for all mounting works.",
  "g.3.t": "5 years on inverters",
  "g.3.d": "Extended manufacturer warranty on inverters.",
  "g.4.t": "Contract & documents",
  "g.4.d": "Official contract, warranty cards, full paperwork.",

  "home.partners.title": "Partners",
  "home.partners.sub": "Who we work with",
  "home.partners.desc":
    "We partner with leading global manufacturers of solar panels, inverters and energy storage.",

  "home.cta.title": "Want the same plant for your site?",
  "home.cta.desc": "Send a request and we’ll prepare an individual estimate.",

  "form.name": "Name",
  "form.phone": "Phone",
  "form.email": "Email",
  "form.message": "Message",
  "form.promocode": "Promo code",
  "form.consent": "I agree to the processing of personal data",
  "form.success": "Thank you! We will contact you soon.",

  "calc.title": "Solar plant calculator",
  "calc.subtitle": "Estimate the cost of your plant in 30 seconds",
  "calc.type": "Object type",
  "calc.type.home": "Private house",
  "calc.type.biz": "Business / enterprise",
  "calc.power": "Power, kW",
  "calc.roof": "Roof type",
  "calc.roof.flat": "Flat",
  "calc.roof.pitched": "Pitched",
  "calc.roof.ground": "Ground mount",
  "calc.result.title": "Estimated cost",
  "calc.result.gen": "Annual generation",
  "calc.result.pay": "Payback",
  "calc.result.note": "Estimate only. For an exact proposal, send a request.",

  "footer.company": "Company",
  "footer.services": "Services",
  "footer.info": "Information",
  "footer.contacts": "Contacts",
  "footer.rights": "© 2026 DMK SOLAR. All rights reserved.",
  "footer.tagline": "Energy of the sun for your successful business.",

  "about.title": "Energy that works for you",
  "about.lead":
    "We specialize in designing and installing modern solar power plants for private homes, businesses and industrial facilities.",
  "about.p1":
    "We do more than install solar panels — we create complete energy solutions tailored to every client.",
  "about.p2":
    "We analyze electricity use, select the right equipment, calculate system capacity and deliver the project turnkey — from the first consultation to commissioning.",
  "about.p3":
    "Our projects combine solar panels, inverter systems, battery storage and backup power to generate electricity and strengthen energy independence.",
  "about.image_alt": "A team installing a solar power plant",
  "about.reasons.eyebrow": "Our approach",
  "about.reasons.title": "Why clients choose us",
  "about.reason.1.title": "Individual approach",
  "about.reason.1.description":
    "Every plant is calculated around actual consumption, site specifics and the client’s goals.",
  "about.reason.2.title": "Complete delivery",
  "about.reason.2.description":
    "We handle design, equipment selection, supply, installation, setup and commissioning.",
  "about.reason.3.title": "Modern technology",
  "about.reason.3.description":
    "We use proven equipment and current solutions for efficient solar plant operation.",
  "about.reason.4.title": "Energy independence",
  "about.reason.4.description":
    "We design systems that reduce grid dependence and provide backup power during outages.",
  "about.reason.5.title": "Transparency",
  "about.reason.5.description":
    "Clients understand what they pay for, which equipment is installed and what outcome they receive.",
  "about.closing":
    "We build more than solar power plants. We create our clients’ own energy systems for years to come.",
  "about.mission.t": "Our mission",
  "about.mission.d": "Make clean energy available to every business and family in Ukraine.",
  "about.values.t": "Our values",
  "about.values.d": "Quality, transparency, responsibility and client care at every step.",

  "catalog.title": "Equipment catalog",
  "catalog.subtitle": "Certified panels, inverters and storage systems",
  "cat.panels": "Solar panels",
  "cat.inverters": "Inverters",
  "cat.batteries": "Batteries",
  "cat.mounting": "Mounting",

  "projects.title": "Our projects",
  "projects.subtitle": "Delivered solar power plants",
  "projects.intro":
    "Choose a direction to view completed solutions for private homes or businesses.",
  "projects.items": "projects",
  "projects.home.title": "Home projects",
  "projects.business.title": "Business projects",

  "referral.title": "Partnership with our company",
  "referral.lead":
    "Know someone planning to install a solar power plant, inverter or energy storage system?",
  "referral.description":
    "Recommend our company and receive a reward when the referral becomes a completed project.",
  "referral.flow.recommend": "Recommend",
  "referral.flow.install": "Client installs solar",
  "referral.flow.reward": "Receive from 2%",
  "referral.cta": "Submit a referral",
  "referral.process.eyebrow": "Four simple steps",
  "referral.process.title": "How does it work?",
  "referral.step.1.title": "Tell them about us",
  "referral.step.1.description":
    "Share our website or send us the contact of someone interested in a solar power plant.",
  "referral.step.2.title": "We contact the client",
  "referral.step.2.description":
    "Our specialist advises the client, selects the right equipment and calculates the system cost.",
  "referral.step.3.title": "The client installs solar",
  "referral.step.3.description":
    "We handle everything from design and equipment selection to installation and commissioning.",
  "referral.step.4.title": "You receive a reward",
  "referral.step.4.description":
    "After successful project delivery, you receive a referral reward equal to 1% of the total project value.",
  "referral.benefits.eyebrow": "Program benefits",
  "referral.benefits.title": "Why is it worthwhile?",
  "referral.benefit.1": "Help people you know move toward energy independence.",
  "referral.benefit.2": "Receive a reward for your recommendation.",
  "referral.benefit.3": "No need to sell or install equipment yourself.",
  "referral.benefit.4": "We handle every technical and organizational detail.",
  "referral.who.eyebrow": "Participation",
  "referral.who.title": "Who can participate?",
  "referral.who.description":
    "Anyone can participate — clients, partners, entrepreneurs, installers, acquaintances and everyone who has contacts of potential clients.",
  "referral.who.note":
    "Have a recommendation? Send us the contact and let solar energy work for both of you.",
  "referral.form.eyebrow": "Referral form",
  "referral.form.title": "Refer a potential client",
  "referral.form.referrer": "Your details",
  "referral.form.client": "Potential client details",
  "referral.form.contact_data": "Contact details: WhatsApp, Viber, Telegram, etc.",
  "referral.form.full_name": "Full name",
  "referral.form.phone": "Phone number",
  "referral.form.submit": "Become a partner",
  "referral.form.sending": "Sending…",
  "referral.form.success.title": "Referral received",
  "referral.form.success":
    "Thank you! We received your referral. Our specialist will contact the potential client.",
  "referral.form.another": "Refer another contact",
  "referral.form.error": "The details were not sent. Check your connection and try again.",

  "prices.title": "Pricing",
  "prices.subtitle": "Approximate turnkey cost of a plant",
  "prices.from": "from",
  "prices.uah": "UAH",
  "prices.note": "Prices are indicative. Exact cost — after site audit.",

  "blog.title": "Blog",
  "blog.subtitle": "News, cases and tips on solar energy",
  "blog.read": "Read →",

  "faq.title": "Frequently asked questions",
  "faq.subtitle": "FAQ",
  "faq.cost.q": "How much does a solar power plant cost?",
  "faq.cost.before": "You can calculate the plant cost and payback in the",
  "faq.warranty.q": "What warranty does the equipment have?",
  "faq.warranty.panels": "10 years for solar panels.",
  "faq.warranty.equipment":
    "For inverters, batteries and other equipment, the warranty depends on the manufacturer and averages 5–10 years.",
  "faq.warranty.installation":
    "5 years for installation work, including 2 years of service maintenance.",
  "faq.payback.q": "What is the payback period?",
  "faq.payback.before": "You can review and calculate the approximate payback in the",
  "faq.payback.dependency":
    "The payback period depends on your consumption and the current electricity tariff.",

  "contacts.title": "Contacts",
  "contacts.subtitle": "Reach out any way you like",
  "contacts.address": "Address",
  "contacts.city": "Poltava",
  "contacts.phone": "Phone",
  "contacts.email": "Email",
  "contacts.hours": "Working hours",
  "contacts.hours.v": "Mon–Fri: 9:00–18:00",
  "contacts.social": "Social media",

  "for.home.title": "Solar for home",
  "for.home.lead": "Energy independence and savings for your family",
  "for.biz.title": "Solar for business",
  "for.biz.lead": "Industrial plants for enterprises: fast payback and stability",
};

const dicts: Record<Lang, Dict> = { ua, en };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };
const LangCtx = createContext<Ctx>({ lang: "ua", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ua");
  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved === "ua" || saved === "en") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };
  const t = (key: string) => dicts[lang][key] ?? key;
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useI18n = () => useContext(LangCtx);
