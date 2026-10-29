import { site } from "./site.mjs";

const email = `<a href="mailto:${site.email}">${site.email}</a>`;
const phone = `<a href="tel:${site.phone}">${site.phoneDisplay}</a>`;

// Registration lines from site.legal; empty fields are left out.
function identification() {
  const { legal } = site;
  const lines = [
    legal.companyName || site.name,
    legal.legalForm && `Forme juridique : ${legal.legalForm}`,
    legal.capital && `Capital social : ${legal.capital}`,
    `Siège : ${legal.address || `${site.city}, Maroc`}`,
    legal.rc && `RC : ${legal.rc}`,
    legal.ice && `ICE : ${legal.ice}`,
    legal.if && `IF : ${legal.if}`,
    legal.patente && `Patente : ${legal.patente}`,
    `Email : ${email}`,
    `Téléphone : ${phone}`,
  ].filter(Boolean);
  return lines.join("<br />");
}

export const legalPages = [
  {
    path: "mentions-legales.html",
    eyebrow: "Mentions légales",
    title: "Mentions légales",
    description: "Informations légales du site PixelWaves Digital, studio digital basé à Casablanca.",
    sections: [
      {
        heading: "Éditeur du site",
        body: [`Le présent site présente les services de ${site.name}, studio digital basé à ${site.city}, Maroc.`, identification()],
      },
      {
        heading: "Directeur de la publication",
        body: [`${site.legal.publicationDirector}, fondateur de ${site.name}.`],
      },
      {
        heading: "Hébergement",
        body: [
          'Vercel Inc.<br />440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br /><a href="https://vercel.com" rel="noopener">vercel.com</a>',
        ],
      },
      {
        heading: "Responsabilité",
        body: [
          `${site.name} s'efforce d'assurer l'exactitude et la mise à jour des informations publiées sur ce site. Malgré ce soin, certaines informations peuvent évoluer ou comporter des inexactitudes involontaires.`,
        ],
      },
      {
        heading: "Propriété intellectuelle",
        body: [
          "L'ensemble des contenus présents sur ce site, y compris textes, interfaces, éléments visuels, maquettes et direction artistique, est protégé et ne peut être reproduit sans autorisation préalable. Les captures des projets présentés proviennent des sites publics de nos clients, appartiennent à leurs propriétaires respectifs et sont affichées à titre de références.",
        ],
      },
      {
        heading: "Contact",
        body: [`Pour toute demande commerciale, technique ou légale, vous pouvez écrire à ${email}.`],
      },
    ],
  },
  {
    path: "confidentialite.html",
    eyebrow: "Confidentialité",
    title: "Politique de confidentialité",
    description: "Politique de confidentialité du site PixelWaves Digital.",
    sections: [
      {
        heading: "Responsable du traitement",
        body: [
          `${site.name}, ${site.city}, Maroc — ${email}. Les données sont traitées conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.`,
        ],
      },
      {
        heading: "Données collectées",
        body: [
          "Via le formulaire de contact : nom, email, téléphone (facultatif), type de projet, délai souhaité et message. Aucune autre donnée personnelle n'est collectée.",
        ],
      },
      {
        heading: "Finalité et destinataires",
        body: [
          `Ces données servent uniquement à répondre à votre demande et à préparer une proposition. Elles sont transmises à ${site.name} par email et messagerie sécurisée, ne sont jamais vendues ni partagées à des fins publicitaires, et un email de confirmation peut vous être envoyé.`,
        ],
      },
      {
        heading: "Mesure d'audience",
        body: [
          "Le site utilise une mesure d'audience respectueuse de la vie privée, sans cookies et sans identification individuelle des visiteurs : elle ne sert qu'à comprendre quelles pages et quels projets intéressent nos visiteurs.",
        ],
      },
      {
        heading: "Conservation",
        body: ["Les demandes sont conservées le temps nécessaire au suivi commercial, puis supprimées au plus tard trois ans après le dernier échange."],
      },
      {
        heading: "Vos droits",
        body: [
          `Vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression de vos données. Pour l'exercer, écrivez à ${email}. Vous pouvez également saisir la CNDP (<a href="https://www.cndp.ma" rel="noopener">cndp.ma</a>).`,
        ],
      },
    ],
  },
];
