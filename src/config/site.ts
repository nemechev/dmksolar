export const siteContacts = {
  city: "Полтава",
  email: "dmksolarcompany@gmail.com",
  phones: [{ label: "+380 96 706 77 43", href: "tel:+380967067743" }],
} as const;

// Social URLs are centralized here so they can be replaced without editing UI components.
export const socialLinks = {
  telegram: "https://t.me/dmksolar",
  instagram: "https://www.instagram.com/dmksolar?igsi=d3I2aHBhd3V6ZzZi&utm_source=qr",
  facebook: "https://www.facebook.com/share/1DX8YRGvr8/?mibextid=wwXIfr",
  whatsapp: "https://wa.me/qr/AZSVSF7Q3F7SE1",
  tiktok: "https://www.tiktok.com/@dmksolar",
  youtube: "https://youtube.com/@dmksolar?si=98Q7p7Mc8PXgcBbv",
} as const;

// Google Forms integration. The action can still be replaced at deploy time without UI edits.
export const referralForm = {
  action:
    import.meta.env.VITE_REFERRAL_ENDPOINT ??
    "https://docs.google.com/forms/d/e/1FAIpQLSfDotdyJ1VdMKNxZzeiSHCTA5vvON8yiQa1kzWXLGITuc3Csg/formResponse",
  fields: {
    referrerName: "entry.1037916066",
    referrerPhone: "entry.1804189324",
    clientName: "entry.234721406",
    clientPhone: "entry.556499779",
    contactData: "partner_contact_data",
    promocode: "promocode",
  },
} as const;

export const contactForm = {
  action:
    import.meta.env.VITE_CONTACT_ENDPOINT ??
    "https://docs.google.com/forms/d/e/1FAIpQLSfxb8WVeHai_Eqe2Ij_FrYYyHqz6BcSjcYfTbwGFGLwysf48A/formResponse",
  fields: {
    name: "entry.1889248155",
    phone: "entry.836021770",
    email: "entry.1666435300",
    message: "entry.421164830",
    promocode: "promocode",
  },
} as const;
