const CONFIG = Object.freeze({
  formTitle: "Реферальна програма — DMK SOLAR",
  spreadsheetTitle: "DMK SOLAR — реферальні заявки",
  managerEmail: "dmksolarcompany@gmail.com",
  notificationSubject: "Нова рекомендація — DMK SOLAR",
  confirmationMessage:
    "Дякуємо! Вашу рекомендацію отримано. Наш спеціаліст зв’яжеться з потенційним клієнтом.",
});

const FIELD_TITLES = Object.freeze({
  referrerName: "ПІБ того, хто рекомендує",
  referrerPhone: "Номер телефону того, хто рекомендує",
  clientName: "ПІБ потенційного клієнта",
  clientPhone: "Номер телефону потенційного клієнта",
});

const CONTACT_CONFIG = Object.freeze({
  formTitle: "Заявка на консультацію — DMK SOLAR",
  spreadsheetTitle: "DMK SOLAR — заявки з сайту",
  notificationSubject: "Нова заявка з сайту — DMK SOLAR",
  confirmationMessage: "Дякуємо! Заявку отримано. Наш спеціаліст зв’яжеться з вами найближчим часом.",
});

const CONTACT_FIELD_TITLES = Object.freeze({
  name: "Ім’я",
  phone: "Номер телефону",
  email: "Email",
  message: "Повідомлення",
});

/**
 * Run this function once from the Apps Script editor.
 * It creates the Google Form, linked spreadsheet and email notification trigger.
 */
function setupReferralForm() {
  const properties = PropertiesService.getScriptProperties();
  const savedSetup = properties.getProperty("DMK_REFERRAL_SETUP");

  if (savedSetup) {
    const existing = JSON.parse(savedSetup);
    printSetupInfo_(existing);
    return existing;
  }

  const form = FormApp.create(CONFIG.formTitle, true)
    .setDescription(
      "Передайте контакт потенційного клієнта DMK SOLAR. Після успішної реалізації проєкту ви отримаєте 1% від його вартості.",
    )
    .setConfirmationMessage(CONFIG.confirmationMessage)
    .setCollectEmail(false)
    .setAllowResponseEdits(false)
    .setLimitOneResponsePerUser(false)
    .setShowLinkToRespondAgain(false)
    .setProgressBar(true)
    .setAcceptingResponses(true);

  form.addSectionHeaderItem().setTitle("Дані того, хто рекомендує");
  const referrerName = form.addTextItem().setTitle(FIELD_TITLES.referrerName).setRequired(true);
  const referrerPhone = addPhoneItem_(form, FIELD_TITLES.referrerPhone);

  form.addSectionHeaderItem().setTitle("Дані потенційного клієнта");
  const clientName = form.addTextItem().setTitle(FIELD_TITLES.clientName).setRequired(true);
  const clientPhone = addPhoneItem_(form, FIELD_TITLES.clientPhone);

  const spreadsheet = SpreadsheetApp.create(CONFIG.spreadsheetTitle);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());

  installSubmitTrigger_(form);

  const integration = createIntegrationConfig_(form, {
    referrerName,
    referrerPhone,
    clientName,
    clientPhone,
  });

  const setupInfo = {
    ...integration,
    formId: form.getId(),
    formEditUrl: form.getEditUrl(),
    formPublicUrl: form.getPublishedUrl(),
    spreadsheetId: spreadsheet.getId(),
    spreadsheetUrl: spreadsheet.getUrl(),
    managerEmail: CONFIG.managerEmail,
  };

  properties.setProperty("DMK_REFERRAL_SETUP", JSON.stringify(setupInfo));
  writeSetupSheet_(spreadsheet, setupInfo);
  printSetupInfo_(setupInfo);
  return setupInfo;
}

/** Creates and configures the website contact form. */
function setupContactForm() {
  const properties = PropertiesService.getScriptProperties();
  const savedSetup = properties.getProperty("DMK_CONTACT_SETUP");
  if (savedSetup) {
    const existing = JSON.parse(savedSetup);
    printContactSetupInfo_(existing);
    showLatestContactResponse();
    return existing;
  }

  const form = FormApp.create(CONTACT_CONFIG.formTitle, true)
    .setDescription("Залиште контактні дані — команда DMK SOLAR зв’яжеться з вами для консультації.")
    .setConfirmationMessage(CONTACT_CONFIG.confirmationMessage)
    .setCollectEmail(false)
    .setAllowResponseEdits(false)
    .setLimitOneResponsePerUser(false)
    .setShowLinkToRespondAgain(false)
    .setAcceptingResponses(true);

  const name = form.addTextItem().setTitle(CONTACT_FIELD_TITLES.name).setRequired(true);
  const phone = addPhoneItem_(form, CONTACT_FIELD_TITLES.phone);
  const email = form.addTextItem().setTitle(CONTACT_FIELD_TITLES.email).setRequired(false);
  const message = form.addParagraphTextItem().setTitle(CONTACT_FIELD_TITLES.message).setRequired(false);

  const spreadsheet = SpreadsheetApp.create(CONTACT_CONFIG.spreadsheetTitle);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  installContactSubmitTrigger_(form);

  const tokens = {
    name: "DMK_CONTACT_NAME_TOKEN",
    phone: "+380993333333",
    email: "contact-test@dmksolar.local",
    message: "DMK_CONTACT_MESSAGE_TOKEN",
  };
  let response = form.createResponse();
  const items = { name, phone, email, message };
  Object.keys(items).forEach((key) => {
    response = response.withItemResponse(items[key].createResponse(tokens[key]));
  });
  const fields = extractEntryIds_(response.toPrefilledUrl(), tokens);
  const publicUrl = form.getPublishedUrl().split("?")[0];
  const setupInfo = {
    action: publicUrl.replace(/\/viewform$/, "/formResponse"),
    fields,
    formId: form.getId(),
    formEditUrl: form.getEditUrl(),
    formPublicUrl: form.getPublishedUrl(),
    spreadsheetId: spreadsheet.getId(),
    spreadsheetUrl: spreadsheet.getUrl(),
    managerEmail: CONFIG.managerEmail,
  };

  properties.setProperty("DMK_CONTACT_SETUP", JSON.stringify(setupInfo));
  writeContactSetupSheet_(spreadsheet, setupInfo);
  printContactSetupInfo_(setupInfo);
  return setupInfo;
}

/**
 * Installed form-submit trigger. Sends every referral to the responsible manager.
 */
function onReferralSubmit(event) {
  if (!event || !event.response) {
    throw new Error("onReferralSubmit must be called by the Google Form submit trigger.");
  }

  const answers = {};
  event.response.getItemResponses().forEach((itemResponse) => {
    answers[itemResponse.getItem().getTitle()] = String(itemResponse.getResponse() || "").trim();
  });

  const submittedAt = Utilities.formatDate(
    event.response.getTimestamp(),
    Session.getScriptTimeZone() || "Europe/Kyiv",
    "dd.MM.yyyy HH:mm:ss",
  );

  const rows = [
    [FIELD_TITLES.referrerName, answers[FIELD_TITLES.referrerName]],
    [FIELD_TITLES.referrerPhone, answers[FIELD_TITLES.referrerPhone]],
    [FIELD_TITLES.clientName, answers[FIELD_TITLES.clientName]],
    [FIELD_TITLES.clientPhone, answers[FIELD_TITLES.clientPhone]],
    ["Дата та час", submittedAt],
  ];

  const body = rows.map(([label, value]) => `${label}: ${value || "—"}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600">${escapeHtml_(label)}</td>` +
        `<td style="padding:8px 12px;border:1px solid #ddd">${escapeHtml_(value || "—")}</td></tr>`,
    )
    .join("");

  MailApp.sendEmail({
    to: CONFIG.managerEmail,
    subject: CONFIG.notificationSubject,
    body,
    htmlBody:
      `<div style="font-family:Arial,sans-serif;color:#13251f">` +
      `<h2 style="margin:0 0 16px;color:#ed7900">Нова рекомендація DMK SOLAR</h2>` +
      `<table style="border-collapse:collapse">${htmlRows}</table>` +
      `</div>`,
    name: "DMK SOLAR",
  });
}

/** Sends every website contact request to the manager. */
function onContactSubmit(event) {
  if (!event || !event.response) {
    throw new Error("onContactSubmit must be called by the Google Form submit trigger.");
  }
  const answers = {};
  event.response.getItemResponses().forEach((itemResponse) => {
    answers[itemResponse.getItem().getTitle()] = String(itemResponse.getResponse() || "").trim();
  });
  const submittedAt = Utilities.formatDate(
    event.response.getTimestamp(),
    Session.getScriptTimeZone() || "Europe/Kyiv",
    "dd.MM.yyyy HH:mm:ss",
  );
  const rows = [
    [CONTACT_FIELD_TITLES.name, answers[CONTACT_FIELD_TITLES.name]],
    [CONTACT_FIELD_TITLES.phone, answers[CONTACT_FIELD_TITLES.phone]],
    [CONTACT_FIELD_TITLES.email, answers[CONTACT_FIELD_TITLES.email]],
    [CONTACT_FIELD_TITLES.message, answers[CONTACT_FIELD_TITLES.message]],
    ["Дата та час", submittedAt],
  ];
  const body = rows.map(([label, value]) => `${label}: ${value || "—"}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600">${escapeHtml_(label)}</td>` +
        `<td style="padding:8px 12px;border:1px solid #ddd">${escapeHtml_(value || "—")}</td></tr>`,
    )
    .join("");
  MailApp.sendEmail({
    to: CONFIG.managerEmail,
    subject: CONTACT_CONFIG.notificationSubject,
    body,
    htmlBody:
      `<div style="font-family:Arial,sans-serif;color:#13251f">` +
      `<h2 style="margin:0 0 16px;color:#ed7900">Нова заявка з сайту DMK SOLAR</h2>` +
      `<table style="border-collapse:collapse">${htmlRows}</table>` +
      `</div>`,
    name: "DMK SOLAR",
  });
}

/** Prints the saved URLs and entry IDs again without creating a new form. */
function showSetupInfo() {
  const saved = PropertiesService.getScriptProperties().getProperty("DMK_REFERRAL_SETUP");
  if (!saved) throw new Error("Run setupReferralForm first.");
  const setupInfo = JSON.parse(saved);
  printSetupInfo_(setupInfo);
  return setupInfo;
}

/** Sends a manual test email. Run only when you want to verify manager delivery. */
function sendTestNotification() {
  MailApp.sendEmail({
    to: CONFIG.managerEmail,
    subject: "Тест сповіщення — DMK SOLAR",
    body: "Google Apps Script успішно налаштований. Нові реферальні заявки надходитимуть на цю адресу.",
    name: "DMK SOLAR",
  });
}

/**
 * Clears only this script's saved setup reference and submit trigger.
 * Existing Form and Spreadsheet files remain in Google Drive.
 */
function resetSetupReference() {
  PropertiesService.getScriptProperties().deleteProperty("DMK_REFERRAL_SETUP");
  ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === "onReferralSubmit")
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));
  console.log("Setup reference and onReferralSubmit triggers cleared.");
}

/** Stops the contact form and removes its saved trigger/reference. */
function resetContactSetupReference() {
  const properties = PropertiesService.getScriptProperties();
  const saved = properties.getProperty("DMK_CONTACT_SETUP");
  if (saved) {
    const setupInfo = JSON.parse(saved);
    FormApp.openById(setupInfo.formId).setAcceptingResponses(false);
  }
  properties.deleteProperty("DMK_CONTACT_SETUP");
  ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === "onContactSubmit")
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));
  console.log("Contact form stopped; setup reference and onContactSubmit triggers cleared.");
}

function addPhoneItem_(form, title) {
  const validation = FormApp.createTextValidation()
    .setHelpText("Введіть номер у форматі +380XXXXXXXXX")
    .requireTextMatchesPattern("^\\+?[0-9 ()-]{10,20}$")
    .build();

  return form.addTextItem().setTitle(title).setRequired(true).setValidation(validation);
}

function installSubmitTrigger_(form) {
  ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === "onReferralSubmit")
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));

  ScriptApp.newTrigger("onReferralSubmit").forForm(form).onFormSubmit().create();
}

function installContactSubmitTrigger_(form) {
  ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === "onContactSubmit")
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));
  ScriptApp.newTrigger("onContactSubmit").forForm(form).onFormSubmit().create();
}

function createIntegrationConfig_(form, items) {
  const tokens = {
    referrerName: "DMK_REFERRER_NAME_TOKEN",
    referrerPhone: "+380991111111",
    clientName: "DMK_CLIENT_NAME_TOKEN",
    clientPhone: "+380962222222",
  };

  let response = form.createResponse();
  Object.keys(items).forEach((key) => {
    response = response.withItemResponse(items[key].createResponse(tokens[key]));
  });

  const entryIds = extractEntryIds_(response.toPrefilledUrl(), tokens);
  const publicUrl = form.getPublishedUrl().split("?")[0];

  return {
    action: publicUrl.replace(/\/viewform$/, "/formResponse"),
    fields: entryIds,
  };
}

function extractEntryIds_(prefilledUrl, tokens) {
  const query = prefilledUrl.split("?")[1] || "";
  const valuesToKeys = {};
  Object.keys(tokens).forEach((key) => {
    valuesToKeys[String(tokens[key])] = key;
  });

  const result = {};
  query.split("&").forEach((pair) => {
    const separator = pair.indexOf("=");
    if (separator < 0) return;
    const parameter = decodeURIComponent(pair.slice(0, separator));
    const value = decodeURIComponent(pair.slice(separator + 1).replace(/\+/g, " "));
    const fieldKey = valuesToKeys[value];
    if (fieldKey && /^entry\.\d+$/.test(parameter)) result[fieldKey] = parameter;
  });

  const missing = Object.keys(tokens).filter((key) => !result[key]);
  if (missing.length) throw new Error(`Entry IDs not found for: ${missing.join(", ")}`);
  return result;
}

function writeSetupSheet_(spreadsheet, setupInfo) {
  const sheet = spreadsheet.insertSheet("Підключення сайту", 0);
  const rows = [
    ["Параметр", "Значення"],
    ["Редагування форми", setupInfo.formEditUrl],
    ["Публічна форма", setupInfo.formPublicUrl],
    ["Таблиця відповідей", setupInfo.spreadsheetUrl],
    ["Google form action", setupInfo.action],
    ["referrerName", setupInfo.fields.referrerName],
    ["referrerPhone", setupInfo.fields.referrerPhone],
    ["clientName", setupInfo.fields.clientName],
    ["clientPhone", setupInfo.fields.clientPhone],
    ["Email менеджера", setupInfo.managerEmail],
  ];

  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  sheet.getRange(1, 1, 1, 2).setFontWeight("bold").setBackground("#ed7900").setFontColor("#ffffff");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 2);
}

function writeContactSetupSheet_(spreadsheet, setupInfo) {
  const sheet = spreadsheet.insertSheet("Підключення сайту", 0);
  const rows = [
    ["Параметр", "Значення"],
    ["Редагування форми", setupInfo.formEditUrl],
    ["Публічна форма", setupInfo.formPublicUrl],
    ["Таблиця відповідей", setupInfo.spreadsheetUrl],
    ["Google form action", setupInfo.action],
    ["name", setupInfo.fields.name],
    ["phone", setupInfo.fields.phone],
    ["email", setupInfo.fields.email],
    ["message", setupInfo.fields.message],
    ["Email менеджера", setupInfo.managerEmail],
  ];
  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  sheet.getRange(1, 1, 1, 2).setFontWeight("bold").setBackground("#ed7900").setFontColor("#ffffff");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 2);
}

function printSetupInfo_(setupInfo) {
  const siteConfig = {
    action: setupInfo.action,
    fields: setupInfo.fields,
  };

  console.log("FORM_EDIT_URL=" + setupInfo.formEditUrl);
  console.log("FORM_PUBLIC_URL=" + setupInfo.formPublicUrl);
  console.log("SPREADSHEET_URL=" + setupInfo.spreadsheetUrl);
  console.log("SITE_CONFIG_JSON=" + JSON.stringify(siteConfig));
}

function printContactSetupInfo_(setupInfo) {
  console.log("CONTACT_FORM_EDIT_URL=" + setupInfo.formEditUrl);
  console.log("CONTACT_FORM_PUBLIC_URL=" + setupInfo.formPublicUrl);
  console.log("CONTACT_SPREADSHEET_URL=" + setupInfo.spreadsheetUrl);
  console.log(
    "CONTACT_SITE_CONFIG_JSON=" +
      JSON.stringify({ action: setupInfo.action, fields: setupInfo.fields }),
  );
}

/** Prints the latest stored contact response for an end-to-end verification. */
function showLatestContactResponse() {
  const saved = PropertiesService.getScriptProperties().getProperty("DMK_CONTACT_SETUP");
  if (!saved) throw new Error("Run setupContactForm first.");
  const setupInfo = JSON.parse(saved);
  const spreadsheet = SpreadsheetApp.openById(setupInfo.spreadsheetId);
  const sheet = spreadsheet
    .getSheets()
    .find((candidate) => /^Form Responses|^Відповіді на форму|^Ответы на форму/.test(candidate.getName()));
  if (!sheet || sheet.getLastRow() < 2) throw new Error("No contact responses found.");
  const values = sheet.getRange(sheet.getLastRow(), 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
  console.log("CONTACT_LAST_ROW_JSON=" + JSON.stringify(values));
  return values;
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
