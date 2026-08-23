# DMK SOLAR — створення реферальної Google Form

Скрипт автоматично створює:

- Google Form із чотирма реферальними полями;
- пов’язану Google-таблицю відповідей;
- email-сповіщення для відповідального менеджера;
- `formResponse` URL та всі `entry.NUMBER` для підключення форми на сайті.

## Запуск

1. Відкрийте [script.google.com](https://script.google.com/) під робочим Google-акаунтом.
2. Створіть **New project** і задайте назву `DMK SOLAR Referral Form`.
3. Відкрийте `Code.gs`, видаліть початковий код і вставте весь вміст локального `Code.gs` із цієї папки.
4. У списку функцій зверху виберіть `setupReferralForm`.
5. Натисніть **Run** та підтвердьте доступ до Google Forms, Sheets і надсилання email.
6. Відкрийте **Execution log**. Скопіюйте рядок, який починається з `SITE_CONFIG_JSON=`.

Повторний запуск `setupReferralForm` повертає вже створені посилання, не створюючи дублікати.

## Результат

У Google Drive з’являться:

- `Реферальна програма — DMK SOLAR`;
- `DMK SOLAR — реферальні заявки`.

У таблиці на аркуші `Підключення сайту` також будуть записані URL форми та всі ідентифікатори полів.

## Перевірка email

За потреби один раз запустіть функцію `sendTestNotification`. Вона надішле тестове повідомлення на email менеджера.

## Наступний крок

Передайте рядок `SITE_CONFIG_JSON=...` для підключення Google Form до компонента:

`D:\sunbeam-builders-main\src\components\site\ReferralForm.tsx`

Паролі, OAuth-токени та ключі API для підключення сайту не використовуються.

## Активна конфігурація

- [Apps Script](https://script.google.com/home/projects/1poDVDz86_a4NA0hbvbpR3BPi7fg1X4j-fSJMflU2pNRJmGqk7WxEG_rQ/edit)
- [Публічна форма](https://docs.google.com/forms/d/e/1FAIpQLSfDotdyJ1VdMKNxZzeiSHCTA5vvON8yiQa1kzWXLGITuc3Csg/viewform)
- [Таблиця відповідей](https://docs.google.com/spreadsheets/d/1DvqxCyuzSO4f5KVsnCzfj-xDxAYRP7N9mgg6fsq5k6k/edit)

Сайт підключено до `formResponse`; тестова заявка підтверджена в таблиці та у вхідному повідомленні менеджера.

## Контактна форма

- [Редагування контактної форми](https://docs.google.com/forms/d/1C3lmDXNyQD0I6x3yhncpipqwsut9w_irddnFirQ9W54/edit)
- [Публічна контактна форма](https://docs.google.com/forms/d/e/1FAIpQLSfxb8WVeHai_Eqe2Ij_FrYYyHqz6BcSjcYfTbwGFGLwysf48A/viewform)
- [Таблиця контактних заявок](https://docs.google.com/spreadsheets/d/1bbfXTBujk5z75gt06rTF0Uv9Y51YyhIOT9ZUCGKrAfA/edit)

Функція `setupContactForm` створює контактну форму, таблицю та email-тригер. Функція `showLatestContactResponse` виводить останній збережений рядок для перевірки.
