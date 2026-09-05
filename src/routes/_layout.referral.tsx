import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgePercent,
  Gift,
  Handshake,
  Percent,
  TrendingUp,
  Users,
} from "lucide-react";
import { ReferralForm } from "@/components/site/ReferralForm";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/_layout/referral")({
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

const bonuses = [
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

function Partnership() {
  const { t } = useI18n();

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
            <p className="mt-5 max-w-2xl text-lg leading-8 opacity-75">
              Ми відкриті до співпраці з професіоналами, підприємцями та компаніями, які мають
              власну клієнтську базу, контакти або можливості для залучення нових клієнтів у сфері
              сонячної енергетики.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-8 opacity-75">
              Ми створюємо партнерства на основі взаємної вигоди та довгострокової співпраці.
            </p>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              <div className="border border-white/10 bg-white/[0.04] p-5">
                <Percent className="h-6 w-6 text-primary" />
                <p className="mt-3 text-2xl font-bold">від 2%</p>
                <p className="mt-1 text-sm opacity-65">від вартості проєкту</p>
              </div>
              <div className="border border-white/10 bg-white/[0.04] p-5">
                <TrendingUp className="h-6 w-6 text-primary" />
                <p className="mt-3 text-2xl font-bold">накопичення</p>
                <p className="mt-1 text-sm opacity-65">вищий % за активність</p>
              </div>
              <div className="border border-white/10 bg-white/[0.04] p-5">
                <BadgePercent className="h-6 w-6 text-primary" />
                <p className="mt-3 text-2xl font-bold">промокод</p>
                <p className="mt-1 text-sm opacity-65">для фіксації клієнтів</p>
              </div>
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
            <ReferralForm />
          </div>
        </div>
      </section>

      <section className="bg-background py-16 text-foreground md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <article className="rounded-2xl border border-border bg-card p-7">
              <Handshake className="h-8 w-8 text-primary" />
              <h2 className="mt-5 text-2xl font-bold">Що отримує наш партнер?</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Наш партнер отримує мінімум{" "}
                <strong className="text-foreground">
                  2% від загальної вартості реалізованого проєкту
                </strong>
                , який був залучений за його участі. Винагорода розраховується саме від вартості
                всього проєкту, а не від прибутку компанії.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-7">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h2 className="mt-5 text-2xl font-bold">Накопичувальна система</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Чим більше клієнтів та успішних проєктів залучає партнер, тим вищий відсоток він
                може отримувати в подальшому. Більше клієнтів → більше реалізованих проєктів → вищий
                відсоток → більша винагорода.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-7">
              <Gift className="h-8 w-8 text-primary" />
              <h2 className="mt-5 text-2xl font-bold">Додаткові бонуси</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Для партнерів діють спеціальні умови та знижки на обладнання або послуги для
                власного об’єкта, а також додаткові бонуси за активну співпрацю.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-16 text-foreground md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Приклад розрахунку
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">Скільки може отримати партнер?</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-7">
              <p className="text-sm text-muted-foreground">Вартість проєкту</p>
              <p className="mt-2 text-3xl font-bold">1 000 000 грн</p>
              <p className="mt-6 text-sm text-muted-foreground">Мінімальна винагорода 2%</p>
              <p className="mt-2 text-2xl font-bold text-primary">20 000 грн</p>
            </div>
            <div className="rounded-2xl border border-primary bg-dark p-7 text-dark-foreground">
              <p className="text-sm opacity-65">При активній співпраці</p>
              <p className="mt-2 text-3xl font-bold">4%</p>
              <p className="mt-6 text-sm opacity-65">Винагорода з проєкту 1 000 000 грн</p>
              <p className="mt-2 text-2xl font-bold text-primary">40 000 грн</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 text-foreground md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Особистий промокод</h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Кожен партнер отримує персональний промокод і може передавати його своїм клієнтам. За
              допомогою промокоду ми визначаємо, від якого партнера прийшов клієнт, та фіксуємо
              участь партнера у відповідному проєкті.
            </p>
            <p className="mt-5 leading-7 text-muted-foreground">
              Партнерська винагорода виплачується після підписання договору з клієнтом та повної
              реалізації відповідного проєкту згідно з умовами партнерського договору.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7">
            <h3 className="text-2xl font-bold">Бонуси за активність</h3>
            <ul className="mt-5 grid gap-3">
              {bonuses.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-dark py-16 text-dark-foreground md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Індивідуальні умови
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">Партнерський договір</h2>
            <p className="mt-5 max-w-xl leading-7 opacity-75">
              Ми не використовуємо однакові умови для всіх партнерів. Кожен партнер укладає з нами
              окремий партнерський договір, у якому визначаються ключові умови співпраці.
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden bg-white/10 sm:grid-cols-2">
            {contractItems.map((item) => (
              <li key={item} className="bg-[#0b211a] p-5 text-sm font-medium opacity-90">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background py-16 text-foreground md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Хто може стати партнером?
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Ми розглядаємо співпрацю з різними спеціалістами
            </h2>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {partnerTypes.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/10 p-7 md:p-9">
            <Users className="h-8 w-8 text-primary" />
            <h2 className="mt-5 text-3xl font-bold">Хочете стати нашим партнером?</h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
              Заповніть форму вище та розкажіть нам про себе. Ми зв’яжемося з вами, обговоримо
              формат співпраці та погодимо індивідуальні умови. Після домовленостей укладаємо
              партнерський договір, після чого партнер отримує персональний промокод та може
              розпочинати співпрацю з нами.
            </p>
            <a
              href="#partner-form"
              className="mt-7 inline-flex items-center gap-3 bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:brightness-110"
            >
              Заповнити форму
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
