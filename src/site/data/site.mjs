// Brand-wide facts shared by every page.
//
// `url` makes canonical, hreflang, Open Graph and sitemap links absolute. It defaults to
// the live domain (the apex pixelwaves-digital.com redirects to www). Override with
// SITE_URL for a preview deployment.
export const site = {
  name: "PixelWaves Digital",
  shortName: "PixelWaves",
  url: (process.env.SITE_URL || "https://www.pixelwaves-digital.com").replace(/\/+$/, ""),
  email: "pixelwaves_digital@outlook.com",
  // Company registration shown on the legal notice. Fill in what applies; empty fields
  // are simply not displayed, so nothing is ever shown half-invented.
  legal: {
    companyName: "",
    legalForm: "", // e.g. "SARL AU"
    capital: "", // e.g. "10 000 MAD"
    address: "", // registered office
    rc: "", // Registre du commerce, e.g. "Casablanca 123456"
    ice: "", // Identifiant commun de l'entreprise (15 digits)
    if: "", // Identifiant fiscal
    patente: "",
    publicationDirector: "Ayoub Bhalli",
  },
  phone: "+212776356930",
  phoneDisplay: "+212 776-356930",
  whatsapp: "https://wa.me/212776356930",
  city: "Casablanca",
  region: "Casablanca-Settat",
  countryCode: "MA",
  // Markets served remotely, listed in the structured data as areaServed.
  areaServed: ["Morocco", "France", "Belgium", "Switzerland", "Luxembourg", "Netherlands", "United Arab Emirates", "Canada"],
  founder: "Ayoub Bhalli",
  github: "https://github.com/BHALLI-AYOUB",
  // Ayoub's personal LinkedIn. Paste the profile URL here and the founder section links to it.
  founderLinkedin: "",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/pixelwave_digital/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/pixelwaves-digital/" },
    { label: "GitHub", href: "https://github.com/BHALLI-AYOUB" },
  ],
  localePaths: { en: "/", fr: "/fr/" },
  // Cookieless analytics (src/client/analytics.js). Vercel Web Analytics needs to be
  // enabled once in the Vercel dashboard; Plausible or Umami are optional extras.
  analytics: {
    vercel: true,
    plausibleDomain: "", // e.g. "pixelwaves.ma"
    umamiWebsiteId: "",
  },
};

export function absoluteUrl(pathname) {
  return `${site.url}${pathname}`;
}

// Case study URLs per language, e.g. /work/elitegear/ and /fr/projets/elitegear/.
export const casePaths = {
  en: (slug) => `/work/${slug}/`,
  fr: (slug) => `/fr/projets/${slug}/`,
};

export function caseAlternates(slug) {
  return { en: casePaths.en(slug), fr: casePaths.fr(slug) };
}
