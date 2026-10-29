// Client quotes. Only entries with `approved: true` appear on the site: the homepage
// testimonials section and the quote on that project's case study. Send each draft to
// the client, adjust it to their words, add their name, then set `approved: true`.
//
//   project   slug from projects.mjs
//   name      the person quoted (leave empty to show only the role)
//   role      their title and company, in both languages
//   quote     the quote in both languages
//   original  the language the client actually approved it in
const all = [
  {
    approved: false,
    project: "elitegear",
    original: "fr",
    name: "",
    role: { en: "EliteGear", fr: "EliteGear" },
    quote: {
      fr: "Notre catalogue est enfin aussi sérieux que notre matériel. Les clients trouvent le bon PC en quelques clics, et les demandes arrivent directement sur notre WhatsApp.",
      en: "Our catalogue finally looks as serious as our hardware. Customers find the right PC in a few clicks, and requests land straight in our WhatsApp.",
    },
  },
  {
    approved: false,
    project: "makan",
    original: "en",
    name: "",
    role: { en: "Makan Luxury Motors", fr: "Makan Luxury Motors" },
    quote: {
      en: "Our showroom now lives online. Every car in stock has its own page, and clients arrive at the showroom already knowing which vehicle they want to see.",
      fr: "Notre showroom vit désormais en ligne. Chaque voiture en stock a sa propre page, et les clients arrivent au showroom en sachant déjà quel véhicule ils veulent voir.",
    },
  },
];

export const testimonials = all.filter((testimonial) => testimonial.approved);
