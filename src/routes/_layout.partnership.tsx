import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { PartnershipForm } from "@/components/site/PartnershipForm";

export const Route = createFileRoute("/_layout/partnership")({
  component: Partnership,
  head: () => ({
    meta: [
      { title: "Партнерська програма — DMK SOLAR" },
      {
        name: "description",
        content:
          "Партнерство з DMK SOLAR: винагорода від 2% вартості реалізованого проєкту, накопичувальна система та персональні промокоди.",
      },
    ],
  }),
});

const partnerTypes = [
  "Електрики",
  "Будівельники",
  "Виконроби",
  "Архітектори",
  "Проєктувальники",
  "Монтажні компанії",
  "Спеціалісти з опалення та теплових насосів",
  "Продавці генераторів",
  "Рієлтори",
  "Аграрні консультанти",
  "Підприємці",
  "Блогери",
  "Інші спеціалісти та компанії",
];

const activeBonuses = [
  "збільшення партнерського відсотка",
  "спеціальні умови на наші послуги",
  "додаткові бонуси за великі проєкти",
  "пріоритетна комунікація з нашою командою",
  "індивідуальні умови співпраці",
];

const contractItems = [
  "розмір партнерського відсотка",
  "умови накопичувальної системи",
  "порядок збільшення відсотка",
  "порядок фіксації клієнтів",
  "умови виплати винагороди",
  "партнерські знижки",
  "додаткові бонуси",
  "права та обов’язки сторін",
];

function TextBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-border py-10 first:pt-0 last:border-b-0 last:pb-0">
      <h2 className="text-3xl font-bold tracking-[-0.03em] md:text-4xl">{title}</h2>
      <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">{children}</div>
    </section>
  );
}

function Partnership() {
  return (
    <>
      <section className="relative overflow-hidden bg-dark text-dark-foreground">
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.05fr_.95fr] lg:items-start lg:px-8">
          <div className="lg:pt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Партнерська програма
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] md:text-6xl">
              Партнерство з нашою компанією
            </h1>
            <p className="mt-7 max-w-2xl text-2xl font-semibold leading-8 text-primary">
              Розвивайте свій бізнес разом із нами
            </p>
            <div className="mt-5 max-w-2xl space-y-4 text-lg leading-8 opacity-75">
              <p>
                Ми відкриті до співпраці з професіоналами, підприємцями та компаніями, які мають
                власну клієнтську базу, контакти або можливості для залучення нових клієнтів у сфері
                сонячної енергетики.
              </p>
              <p>Ми створюємо партнерства на основі взаємної вигоди та довгострокової співпраці.</p>
            </div>
            <a
              href="#partner-form"
              className="mt-9 inline-flex items-center gap-3 bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:gap-5 hover:brightness-105 active:translate-y-px"
            >
              Хочу стати партнером
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
          <div id="partner-form" className="scroll-mt-24">
            <PartnershipForm />
          </div>
        </div>
      </section>

      <main className="bg-background py-16 text-foreground md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <TextBlock title="Що отримує наш партнер?">
            <p>
              <strong className="text-foreground">💰 Відсоток від вартості проєкту</strong>
            </p>
            <p>
              Наш партнер отримує{" "}
              <strong className="text-foreground">
                мінімум 2% від загальної вартості реалізованого проєкту
              </strong>
              , який був залучений за його участі.
            </p>
            <p>
              Винагорода розраховується саме від вартості всього проєкту, а не від прибутку
              компанії.
            </p>
          </TextBlock>

          <TextBlock title="Накопичувальна система">
            <p>
              Для наших партнерів діє{" "}
              <strong className="text-foreground">накопичувальна система винагороди</strong>.
            </p>
            <p>
              Чим більше клієнтів та успішних проєктів залучає партнер, тим вищий відсоток він може
              отримувати в подальшому.
            </p>
            <p className="text-lg font-semibold text-foreground">
              Більше клієнтів → більше реалізованих проєктів → вищий відсоток → більша винагорода.
            </p>
            <p>
              Розмір партнерського відсотка, умови його підвищення та інші бонуси погоджуються
              індивідуально та фіксуються у партнерському договорі.
            </p>
          </TextBlock>

          <TextBlock title="Приклад розрахунку">
            <p>Наприклад, вартість реалізованого проєкту становить:</p>
            <p className="text-2xl font-bold text-foreground">1 000 000 грн</p>
            <p>
              При мінімальній партнерській винагороді{" "}
              <strong className="text-foreground">2%</strong>:
            </p>
            <p className="text-xl font-bold text-primary">1 000 000 × 2% = 20 000 грн</p>
            <p>
              Отже, партнер отримує{" "}
              <strong className="text-foreground">20 000 грн винагороди</strong> за цей проєкт.
            </p>
            <p>
              Якщо завдяки накопичувальній системі партнер отримує, наприклад,
              <strong className="text-foreground"> 4%</strong>, його винагорода становитиме:
            </p>
            <p className="text-xl font-bold text-primary">1 000 000 × 4% = 40 000 грн</p>
            <p>
              Таким чином, активні партнери мають можливість збільшувати свою винагороду завдяки
              залученню більшої кількості клієнтів.
            </p>
          </TextBlock>

          <TextBlock title="Додаткові бонуси для партнерів">
            <p>Окрім партнерської винагороди, наші партнери отримують додаткові переваги:</p>
            <p>
              <strong className="text-foreground">🏷️ Спеціальна знижка для партнерів</strong>
            </p>
            <p>
              Якщо партнер сам хоче придбати у нас обладнання або скористатися нашими послугами для
              власного об’єкта, для нього діють{" "}
              <strong className="text-foreground">спеціальні партнерські умови та знижки</strong>.
            </p>
            <p>
              <strong className="text-foreground">🔑 Особистий промокод</strong>
            </p>
            <p>
              Кожен партнер отримує{" "}
              <strong className="text-foreground">персональний промокод</strong>.
            </p>
            <p>Партнер може передавати цей промокод своїм клієнтам.</p>
            <p>
              За допомогою промокоду ми визначаємо,{" "}
              <strong className="text-foreground">від якого партнера прийшов клієнт</strong>, та
              фіксуємо участь партнера у відповідному проєкті.
            </p>
            <p>Це дозволяє забезпечити прозорий облік клієнтів та партнерських винагород.</p>
            <p>
              <strong className="text-foreground">🚀 Бонуси за активність</strong>
            </p>
            <ul className="list-disc space-y-2 pl-6">
              {activeBonuses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </TextBlock>

          <TextBlock title="Коли виплачується винагорода?">
            <p>
              Партнерська винагорода виплачується{" "}
              <strong className="text-foreground">
                після підписання договору з клієнтом та повної реалізації відповідного проєкту
              </strong>
              згідно з умовами партнерського договору.
            </p>
            <p>
              Порядок, строки та спосіб виплати визначаються сторонами під час укладення
              партнерського договору.
            </p>
          </TextBlock>

          <TextBlock title="Індивідуальні умови партнерства">
            <p>Ми не використовуємо однакові умови для всіх партнерів.</p>
            <p>
              Кожен партнер укладає з нами{" "}
              <strong className="text-foreground">окремий партнерський договір</strong>, у якому
              визначаються:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              {contractItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-lg font-bold text-foreground">
              Стартова партнерська винагорода — від 2% вартості проєкту.
            </p>
            <p>
              При активній співпраці та залученні більшої кількості клієнтів партнер може перейти на
              вигідніші умови.
            </p>
          </TextBlock>

          <TextBlock title="Хто може стати партнером?">
            <p>Ми розглядаємо співпрацю з:</p>
            <div className="flex flex-wrap gap-3">
              {partnerTypes.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
            <p>
              Якщо ви маєте можливості для залучення клієнтів та бачите перспективу взаємовигідної
              співпраці — ми готові обговорити партнерство.
            </p>
          </TextBlock>

          <section className="mt-12 rounded-2xl border border-primary/30 bg-primary/10 p-7 md:p-9">
            <h2 className="text-3xl font-bold">Хочете стати нашим партнером?</h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
              Заповніть форму нижче та розкажіть нам про себе. Ми зв’яжемося з вами, обговоримо
              формат співпраці та погодимо індивідуальні умови. Після досягнення домовленостей ми
              укладаємо <strong className="text-foreground">партнерський договір</strong>, після
              чого партнер отримує свій персональний промокод та може розпочинати співпрацю з нами.
            </p>
            <a
              href="#partner-form"
              className="mt-7 inline-flex items-center gap-3 bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Заповнити форму
              <ArrowRight className="h-5 w-5" />
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
