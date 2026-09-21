import React from "react";
import { About } from "./components/About.jsx";
import { CaseStudy } from "./components/CaseStudy.jsx";
import { Contact, SiteFooter, WhatsAppFloat } from "./components/Contact.jsx";
import { SiteHeader } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { Faq, Founder, Process, Services } from "./components/Services.jsx";
import { Work } from "./components/Work.jsx";
import { projects } from "./data/projects.mjs";
import { absoluteUrl, caseAlternates, casePaths, site } from "./data/site.mjs";
import { Document } from "./Document.jsx";

function homeJsonLd(t, locale) {
  const pathname = site.localePaths[locale];
  const organizationId = absoluteUrl("/#organization");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": organizationId,
        name: site.name,
        description: t.meta.description,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/public/brand/icon-512.png"),
        image: absoluteUrl("/public/brand/og.jpg"),
        email: site.email,
        telephone: site.phone,
        address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: site.countryCode },
        founder: { "@type": "Person", name: site.founder, jobTitle: t.founder.role, sameAs: [site.github] },
        knowsAbout: t.services.items.map((service) => service.title),
        sameAs: site.socials.map((social) => social.href),
      },
      {
        "@type": "WebSite",
        name: site.name,
        url: absoluteUrl(pathname),
        inLanguage: locale,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "ItemList",
        name: t.work.label,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@type": "CreativeWork", name: project.name, url: project.url, genre: project[locale].category, description: project[locale].description },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

export function HomePage({ t, locale, assets }) {
  return (
    <Document
      locale={locale}
      t={t}
      title={t.meta.title}
      description={t.meta.description}
      pathname={site.localePaths[locale]}
      alternates={site.localePaths}
      ogImage="/public/brand/og.jpg"
      jsonLd={homeJsonLd(t, locale)}
      assets={assets}
    >
      <SiteHeader t={t} locale={locale} />
      <main id="main">
        <Hero t={t} locale={locale} />
        <About t={t} />
        <Work t={t} locale={locale} />
        <Services t={t} />
        <Process t={t} />
        <Founder t={t} />
        <Faq t={t} />
        <Contact t={t} locale={locale} />
      </main>
      <SiteFooter t={t} locale={locale} />
      <WhatsAppFloat t={t} />
    </Document>
  );
}

function caseJsonLd(t, locale, project) {
  const home = site.localePaths[locale];
  const pathname = casePaths[locale](project.slug);
  const copy = project[locale];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: absoluteUrl(home) },
          { "@type": "ListItem", position: 2, name: t.caseStudy.breadcrumb, item: absoluteUrl(`${home}#projects`) },
          { "@type": "ListItem", position: 3, name: project.name, item: absoluteUrl(pathname) },
        ],
      },
      {
        "@type": "CreativeWork",
        name: project.name,
        headline: t.caseStudy.metaTitle(project.name, copy.category),
        description: copy.overview,
        url: absoluteUrl(pathname),
        inLanguage: locale,
        genre: copy.category,
        about: copy.sector,
        image: absoluteUrl(`/public/brand/og-${project.slug}.jpg`),
        sameAs: project.url,
        creator: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: site.name },
      },
    ],
  };
}

export function CasePage({ t, locale, project, next, assets }) {
  const home = site.localePaths[locale];
  const alternates = caseAlternates(project.slug);
  return (
    <Document
      locale={locale}
      t={t}
      title={t.caseStudy.metaTitle(project.name, project[locale].category)}
      description={project[locale].description}
      pathname={casePaths[locale](project.slug)}
      alternates={alternates}
      ogImage={`/public/brand/og-${project.slug}.jpg`}
      jsonLd={caseJsonLd(t, locale, project)}
      assets={assets}
    >
      <SiteHeader t={t} locale={locale} base={home} alternates={alternates} />
      <main id="main">
        <CaseStudy t={t} locale={locale} project={project} next={next} />
      </main>
      <SiteFooter t={t} locale={locale} base={home} alternates={alternates} />
      <WhatsAppFloat t={t} />
    </Document>
  );
}

// Bilingual, since a broken link can come from either language.
export function NotFoundPage({ t, fr, assets }) {
  return (
    <Document locale="en" t={t} title={`Page not found | ${site.name}`} description={t.meta.description} pathname="/404.html" ogImage="/public/brand/og.jpg" assets={assets} noindex>
      <SiteHeader t={t} locale="en" base="/" />
      <main id="main" className="theme-dark not-found">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-grid" />
        </div>
        <div className="shell">
          <p className="t-label">404</p>
          <h1 className="t-display not-found-title">This page does not exist.</h1>
          <p className="t-lead" lang="fr">
            Cette page n'existe pas.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/" data-glow>
              {t.nav.links[0].label}
            </a>
            <a className="btn btn-ghost" href="/#projects">
              {t.nav.links[2].label}
            </a>
            <a className="btn btn-ghost" href="/fr/" lang="fr" hrefLang="fr">
              {fr.nav.links[0].label} (FR)
            </a>
          </div>
        </div>
      </main>
    </Document>
  );
}

export function LegalPage({ t, page, assets }) {
  const base = site.localePaths.fr;
  return (
    <Document
      locale="fr"
      t={t}
      title={`${page.title} | ${site.name}`}
      description={page.description}
      pathname={`/${page.path}`}
      ogImage="/public/brand/og.jpg"
      assets={assets}
    >
      <SiteHeader t={t} locale="fr" base={base} showLang={false} solid />
      <main id="main" className="theme-light legal">
        <div className="shell">
          <article className="legal-body">
            <div className="section-label">
              <span className="num">{site.shortName}</span>
              <span className="bar" aria-hidden="true" />
              <p className="t-label">{page.eyebrow}</p>
            </div>
            <h1 className="t-h2">{page.title}</h1>
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </section>
            ))}
            <p className="legal-back" style={{ marginTop: "3rem" }}>
              <a href={base}>← Retour au site</a>
            </p>
          </article>
        </div>
      </main>
      <SiteFooter t={t} locale="fr" base={base} showLang={false} />
    </Document>
  );
}
