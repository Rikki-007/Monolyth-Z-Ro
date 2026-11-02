// The studio's one set of contact details. Everything that shows an email,
// phone number or social link (contact page, structured data) reads from
// here, so the site can never advertise two different numbers again.
export const contact = {
  email: "hello@monolythzro.com",
  phone: {
    display: "+353 89 613 9970",
    href: "tel:+353896139970",
  },
  // Same number as `phone` — WhatsApp and calls go to one line.
  whatsapp: "https://wa.me/353896139970",
  github: "https://github.com/Rikki-007",
  instagram: "https://www.instagram.com/monolyth_zro",
  facebook: "https://www.facebook.com/share/19567ukrr5/",
  // Direct-message entry points used by the brief share links (lib/channels.ts).
  instagramDm: "https://ig.me/m/monolyth_zro",
  messenger: "https://m.me/61591235385359", // the Facebook share link above resolves to this page ID
};
