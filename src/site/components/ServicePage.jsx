import React from "react";
import { projects } from "../data/projects.mjs";
import { servicePages, servicePaths } from "../data/services.mjs";
import { casePaths, site } from "../data/site.mjs";
import { Icon, WorkImage, workImageColor } from "./Brand.jsx";
import { Faq, Process } from "./Services.jsx";

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span className="bar" aria-hidden="true" />
      <p className="t-label">{children}</p>
    </div>
  );
}

function ServiceHero({ t, locale, page }) {
  const copy = page[locale];
  const sp = t.servicePage;
  const home = site.localePaths[locale];

  return (
    <section className="case-hero service-hero theme-dark" data-hero>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="case-hero-glow" />
      </div>
      <div className="shell">
        <nav className="crumbs hero-in" aria-label={t.caseStudy.breadcrumbLabel}>
          <ol>
            <li>
              <a href={home}>{site.shortName}</a>
            </li>
            <li>
              <a href={`${home}#services`}>{sp.breadcrumb}</a>
            </li>
            <li aria-current="page">{copy.navLabel}</li>
          </ol>
        </nav>

        <div className="case-hero-head">
          <div>
            <p className="case-meta hero-in" style={{ "--d": "80ms" }}>
              <span className="case-cat">{copy.kicker}</span>
            </p>
            <h1 className="t-display case-hero-title service-hero-title">
              <span className="hero-line">
                <span style={{ "--i": 0 }}>{copy.h1}</span>
              </span>
            </h1>
          </div>
          <div className="case-hero-intro hero-in" style={{ "--d": "260ms" }}>
            <p className="t-lead">{copy.lead}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contact" data-service={page.formValue[locale]} data-glow data-track="cta_start_project" data-track-project={page.id}>
                {sp.cta}
                <span className="btn-icon">
                  <Icon name="arrowRight" className="h-4 w-4" />
                </span>
              </a>
              <a className="btn btn-ghost" href="#work">
                {sp.work}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceIncluded({ t, locale, page }) {
  const copy = page[locale];
  const sp = t.servicePage;

  return (
    <section className="section sheet theme-light case-overview" aria-labelledby="included-title">
      <div className="shell">
        <div className="case-overview-grid">
          <div>
            <SectionLabel>{sp.includedLabel}</SectionLabel>
            <h2 id="included-title" className="case-overview-text">
              {copy.intro}
            </h2>
            <dl className="case-specs">
              <div>
                <dt>{sp.stackLabel}</dt>
                <dd>
                  <ul className="tag-list">
                    {copy.stack.map((tag) => (
                      <li key={tag} className="tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <SectionLabel>{copy.navLabel}</SectionLabel>
            <ol className="case-features">
              {copy.features.map((feature, index) => (
                <li key={feature} data-reveal style={{ "--d": `${index * 70}ms` }}>
                  <span className="case-feature-num">{String(index + 1).padStart(2, "0")}</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceWork({ t, locale, page }) {
  const sp = t.servicePage;
  const shown = page.projects.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean);

  return (
    <section id="work" className="section sheet theme-dark case-next" aria-labelledby="work-title">
      <div className="shell">
        <SectionLabel>{sp.proofLabel}</SectionLabel>
        <h2 id="work-title" className="t-h2 case-section-title">
          {sp.proofTitle}
        </h2>
        <div className="service-work">
          {shown.map((project) => (
            <a key={project.slug} className="next-card" href={casePaths[locale](project.slug)} data-track="case_open" data-track-project={project.slug}>
              <span className="next-text">
                <span className="t-label">{project[locale].category}</span>
                <span className="next-name">{project.name}</span>
                <span className="next-cat">{project[locale].description}</span>
              </span>
              <span className="next-thumb" style={{ "--ph": workImageColor(project.slug, "desktop") }}>
                <WorkImage slug={project.slug} mode="desktop" sizes="(min-width: 1024px) 480px, 80vw" alt="" />
              </span>
              <span className="circle-icon next-arrow">
                <Icon name="arrowRight" className="h-5 w-5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRelated({ t, locale, page }) {
  const others = servicePages.filter((other) => other.id !== page.id);

  return (
    <nav className="section sheet theme-mist service-related" aria-labelledby="related-title">
      <div className="shell">
        <SectionLabel>
          <span id="related-title">{t.servicePage.relatedLabel}</span>
        </SectionLabel>
        <ul className="service-related-list">
          {others.map((other) => (
            <li key={other.id}>
              <a href={servicePaths[locale](other)}>
                {other[locale].navLabel}
                <Icon name="arrowUpRight" className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function ServiceContent({ t, locale, page }) {
  // The shared FAQ section, filled with this service's questions.
  const faqT = { ...t, faq: { ...t.faq, title: t.servicePage.faqTitle, items: page[locale].faq } };

  return (
    <>
      <ServiceHero t={t} locale={locale} page={page} />
      <ServiceIncluded t={t} locale={locale} page={page} />
      <ServiceWork t={t} locale={locale} page={page} />
      <Process t={t} />
      <Faq t={faqT} />
      <ServiceRelated t={t} locale={locale} page={page} />
    </>
  );
}
