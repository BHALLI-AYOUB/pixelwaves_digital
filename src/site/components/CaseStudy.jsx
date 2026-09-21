import React from "react";
import { casePaths, site } from "../data/site.mjs";
import { testimonials } from "../data/testimonials.mjs";
import { BrowserFrame, hasShotImage, Icon, PhoneFrame, WorkImage, workImageColor } from "./Brand.jsx";
import { Quote } from "./Work.jsx";

const heroSizes = {
  desktop: "(min-width: 1400px) 1180px, 90vw",
  mobile: "(min-width: 1024px) 230px, 26vw",
};

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span className="bar" aria-hidden="true" />
      <p className="t-label">{children}</p>
    </div>
  );
}

function CaseHero({ t, locale, project }) {
  const copy = project[locale];
  const cs = t.caseStudy;
  const home = site.localePaths[locale];

  return (
    <section className="case-hero theme-dark" data-hero>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="case-hero-glow" />
      </div>
      <div className="shell">
        <nav className="crumbs hero-in" aria-label={cs.breadcrumbLabel}>
          <ol>
            <li>
              <a href={home}>{site.shortName}</a>
            </li>
            <li>
              <a href={`${home}#projects`}>{cs.breadcrumb}</a>
            </li>
            <li aria-current="page">{project.name}</li>
          </ol>
        </nav>

        <div className="case-hero-head">
          <div>
            <p className="case-meta hero-in" style={{ "--d": "80ms" }}>
              <span className="case-cat">{copy.category}</span>
              <span className="case-hero-sector">{copy.sector}</span>
            </p>
            <h1 className="t-display case-hero-title">
              <span className="hero-line">
                <span style={{ "--i": 0 }}>{project.name}</span>
              </span>
            </h1>
          </div>
          <div className="case-hero-intro hero-in" style={{ "--d": "260ms" }}>
            <p className="t-lead">{copy.description}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={project.url} target="_blank" rel="noopener" data-glow data-track="visit_site" data-track-project={project.slug}>
                {cs.visit}
                <span className="sr-only"> {t.newTab}</span>
                <span className="btn-icon">
                  <Icon name="arrowUpRight" className="h-4 w-4" />
                </span>
              </a>
              <a className="btn btn-ghost" href={`${home}#contact`} data-track="cta_start_project" data-track-project={project.slug}>
                {cs.similar}
              </a>
            </div>
          </div>
        </div>

        <div className="case-hero-stage hero-in" style={{ "--d": "420ms" }}>
          <span className="stage-glow" />
          <BrowserFrame
            project={project}
            className="browser browser--hero"
            sizes={heroSizes.desktop}
            alt={cs.screenshotAlt(project.name, cs.homeScreen)}
            loading="eager"
            fetchPriority="high"
          />
          <span className="phone-wrap phone-wrap--hero">
            <PhoneFrame project={project} sizes={heroSizes.mobile} alt={cs.screenshotAlt(project.name, `${cs.homeScreen}, mobile`)} loading="eager" />
          </span>
        </div>
      </div>
    </section>
  );
}

function CaseOverview({ t, locale, project }) {
  const copy = project[locale];
  const cs = t.caseStudy;

  return (
    <section className="section sheet theme-light case-overview" aria-labelledby="overview-title">
      <div className="shell">
        <div className="case-overview-grid">
          <div>
            <SectionLabel>{cs.overviewLabel}</SectionLabel>
            <h2 id="overview-title" className="case-overview-text">
              {copy.overview}
            </h2>
            <dl className="case-specs">
              <div>
                <dt>{cs.categoryLabel}</dt>
                <dd>{copy.category}</dd>
              </div>
              <div>
                <dt>{cs.sectorLabel}</dt>
                <dd>{copy.sector}</dd>
              </div>
              <div>
                <dt>{cs.websiteLabel}</dt>
                <dd>
                  <a className="link-underline" href={project.url} target="_blank" rel="noopener" data-track="visit_site" data-track-project={project.slug}>
                    {project.domain}
                    <span className="sr-only"> {t.newTab}</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt>{cs.stackLabel}</dt>
                <dd>
                  <ul className="tag-list">
                    {copy.tags.map((tag) => (
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
            <SectionLabel>{cs.featuresLabel}</SectionLabel>
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

        {testimonials
          .filter((testimonial) => testimonial.project === project.slug)
          .map((testimonial) => (
            <Quote key={testimonial.project} testimonial={testimonial} locale={locale} className="quote quote--case" />
          ))}

        <div className="case-facts-wrap">
          <SectionLabel>{cs.factsLabel}</SectionLabel>
          <ul className="case-facts">
            {project.facts.map((fact) => (
              <li key={fact.en} data-reveal>
                <span className="case-fact-value">{fact.value}</span>
                <span className="case-fact-label">{fact[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CaseScreens({ t, locale, project }) {
  const cs = t.caseStudy;
  const shots = (project.shots || []).filter((shot) => hasShotImage(project.slug, shot.id, "desktop"));
  if (!shots.length) return null;

  return (
    <section className="section sheet theme-dark case-screens" aria-labelledby="screens-title">
      <div className="shell">
        <SectionLabel>{cs.screensLabel}</SectionLabel>
        <h2 id="screens-title" className="t-h2 case-section-title">
          {cs.screensTitle}
        </h2>
        <div className="case-shots">
          {shots.map((shot, index) => (
            <figure key={shot.id} className="case-shot" data-reveal>
              <BrowserFrame
                project={project}
                shot={shot.id}
                className="browser browser--static"
                sizes="(min-width: 1400px) 1180px, 92vw"
                alt={cs.screenshotAlt(project.name, shot[locale])}
              />
              <figcaption>
                <span className="case-shot-num">{String(index + 1).padStart(2, "0")}</span>
                {shot[locale]}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseMobile({ t, locale, project }) {
  const cs = t.caseStudy;
  const phones = [
    { key: "home", shot: undefined, caption: cs.homeScreen },
    ...(project.shots || [])
      .filter((shot) => shot.mobile && hasShotImage(project.slug, shot.id, "mobile"))
      .map((shot) => ({ key: shot.id, shot: shot.id, caption: shot[locale] })),
  ];

  return (
    <section className="section sheet theme-mist case-mobile" aria-labelledby="mobile-title">
      <div className="shell">
        <SectionLabel>{cs.mobileLabel}</SectionLabel>
        <h2 id="mobile-title" className="t-h2 case-section-title">
          {cs.mobileTitle}
        </h2>
        <ul className="phone-row">
          {phones.map((phone, index) => (
            <li key={phone.key} className="phone-item" data-reveal style={{ "--d": `${index * 110}ms` }}>
              <PhoneFrame
                project={project}
                shot={phone.shot}
                className="phone phone--static"
                sizes="(min-width: 1024px) 300px, 60vw"
                alt={cs.screenshotAlt(project.name, `${phone.caption}, mobile`)}
              />
              <p className="phone-caption">{phone.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CaseNext({ t, locale, project, next }) {
  const cs = t.caseStudy;
  const copy = next[locale];
  const home = site.localePaths[locale];

  return (
    <section className="section sheet theme-dark case-next" aria-labelledby="next-title">
      <div className="shell">
        <a className="next-card" href={casePaths[locale](next.slug)} data-track="case_open" data-track-project={next.slug}>
          <span className="next-text">
            <span className="t-label">{cs.nextLabel}</span>
            <span id="next-title" className="next-name">
              {next.name}
            </span>
            <span className="next-cat">
              {copy.category} · {copy.sector}
            </span>
          </span>
          <span className="next-thumb" style={{ "--ph": workImageColor(next.slug, "desktop") }}>
            <WorkImage slug={next.slug} mode="desktop" sizes="(min-width: 1024px) 480px, 80vw" alt="" />
          </span>
          <span className="circle-icon next-arrow">
            <Icon name="arrowRight" className="h-5 w-5" />
          </span>
        </a>

        <div className="case-cta" data-reveal>
          <h2 className="t-display case-cta-title">{cs.ctaTitle}</h2>
          <p className="t-lead">{cs.ctaText}</p>
          <a className="btn btn-primary" href={`${home}#contact`} data-glow data-track="cta_start_project" data-track-project={project.slug}>
            {cs.ctaButton}
            <span className="btn-icon">
              <Icon name="arrowRight" className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function CaseStudy({ t, locale, project, next }) {
  return (
    <>
      <CaseHero t={t} locale={locale} project={project} />
      <CaseOverview t={t} locale={locale} project={project} />
      <CaseScreens t={t} locale={locale} project={project} />
      <CaseMobile t={t} locale={locale} project={project} />
      <CaseNext t={t} locale={locale} project={project} next={next} />
    </>
  );
}
