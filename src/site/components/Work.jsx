import React from "react";
import { moreProjects, projects } from "../data/projects.mjs";
import { testimonials } from "../data/testimonials.mjs";
import { casePaths } from "../data/site.mjs";
import { BrowserFrame, Icon, PhoneFrame } from "./Brand.jsx";

const imageSizes = {
  feature: { desktop: "(min-width: 1400px) 760px, (min-width: 1024px) 54vw, 88vw", mobile: "(min-width: 1024px) 170px, 22vw" },
  card: { desktop: "(min-width: 1400px) 620px, (min-width: 900px) 42vw, 88vw", mobile: "(min-width: 900px) 160px, 24vw" },
};

// Full class names are spelled out so Tailwind's content scan keeps their styles.
const caseClasses = {
  feature: "case case--feature",
  featureReverse: "case case--feature case--reverse",
  card: "case case--card",
};

function Case({ project, index, t, locale, variant, reverse = false }) {
  const copy = project[locale];
  const sizes = imageSizes[variant];
  const className = variant === "card" ? caseClasses.card : reverse ? caseClasses.featureReverse : caseClasses.feature;
  const caseHref = casePaths[locale](project.slug);

  return (
    <article className={className}>
      {/* Pointer shortcut to the case study; keyboard and screen-reader users get the labelled link below. */}
      <a className="case-stage" href={caseHref} tabIndex={-1} aria-hidden="true" data-reveal="stage" data-stage data-track="case_open" data-track-project={project.slug}>
        <span className="stage-glow" />
        <span className="stage-devices" data-parallax>
          <BrowserFrame project={project} sizes={sizes.desktop} alt={`${project.name} — homepage, desktop`} />
        </span>
        <span className="phone-wrap" data-parallax>
          <PhoneFrame project={project} sizes={sizes.mobile} alt={`${project.name} — homepage, mobile`} />
        </span>
        <span className="stage-cta">
          {t.work.caseStudy}
          <Icon name="arrowRight" />
        </span>
      </a>

      <div className="case-info" data-reveal>
        <div className="case-meta">
          <span className="case-num">{String(index + 1).padStart(2, "0")}</span>
          <span className="case-cat">{copy.category}</span>
        </div>
        <h3 className="case-title">{project.name}</h3>
        <p className="case-sector">{copy.sector}</p>
        <p className="case-desc">{copy.description}</p>
        <ul className="tag-list">
          {copy.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
        <div className="case-links">
          <a className="link-cta" href={caseHref} data-track="case_open" data-track-project={project.slug}>
            <span className="link-underline">{t.work.caseStudy}</span>
            <span className="sr-only"> — {project.name}</span>
            <span className="circle-icon">
              <Icon name="arrowRight" className="h-4 w-4" />
            </span>
          </a>
          <a className="link-quiet" href={project.url} target="_blank" rel="noopener" data-track="visit_site" data-track-project={project.slug}>
            {t.work.visit}
            <span className="sr-only">
              {" "}
              {project.name} {t.newTab}
            </span>
            <Icon name="arrowUpRight" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

// Figures derived from the portfolio itself, so they stay true as projects change.
function portfolioStats(work) {
  const languagePattern = /^[A-Z]{2}( \/ [A-Z]{2})+$/;
  const languages = new Set(
    projects.flatMap((project) => project.en.tags.filter((tag) => languagePattern.test(tag)).flatMap((tag) => tag.split(" / "))),
  );
  return [
    { value: String(projects.length + moreProjects.length), label: work.stats.shipped },
    { value: String(projects.length), label: work.stats.live },
    { value: String(languages.size), label: `${work.stats.languages} (${[...languages].join(" · ")})` },
    { value: "24h", label: work.stats.reply },
  ];
}

export function Quote({ testimonial, locale, className = "quote" }) {
  return (
    <figure className={className}>
      <blockquote>
        {/* French typography uses guillemets with narrow no-break spaces. */}
        <p>{locale === "fr" ? `«\u202f${testimonial.quote.fr}\u202f»` : `“${testimonial.quote.en}”`}</p>
      </blockquote>
      <figcaption>
        {testimonial.name && <span className="quote-name">{testimonial.name}</span>}
        <span className={testimonial.name ? "quote-role" : "quote-name"}>{testimonial.role[locale]}</span>
      </figcaption>
    </figure>
  );
}

function Testimonials({ t, locale }) {
  if (!testimonials.length) return null;
  return (
    <div className="testimonials" data-reveal>
      <p className="t-label">{t.work.testimonialsLabel}</p>
      <h3 className="testimonials-title">{t.work.testimonialsTitle}</h3>
      <div className="quotes">
        {testimonials.map((testimonial) => (
          <Quote key={testimonial.project} testimonial={testimonial} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function MoreWork({ t, locale }) {
  return (
    <div className="more-work" data-reveal>
      <h3 className="t-label">{t.work.moreTitle}</h3>
      <ul className="more-list">
        {moreProjects.map((project) => {
          const copy = project[locale];
          const cells = (
            <>
              <span className="more-name">{project.name}</span>
              <span className="more-type">{copy.type}</span>
              <span className="more-stack">{copy.stack}</span>
            </>
          );
          return (
            <li key={project.name}>
              {project.url ? (
                <a className="more-row" href={project.url} target="_blank" rel="noopener" data-track="visit_site" data-track-project={project.name}>
                  {cells}
                  <span className="more-end">
                    <span className="sr-only">{t.newTab}</span>
                    <span className="circle-icon">
                      <Icon name="arrowUpRight" className="h-4 w-4" />
                    </span>
                  </span>
                </a>
              ) : (
                <div className="more-row">
                  {cells}
                  <span className="more-end">{t.work.privateLabel}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Rhythm: one large feature row, then a staggered pair, repeating.
// Feature rows alternate sides so the page never reads as a plain grid.
function buildRows(count) {
  const rows = [];
  let index = 0;
  let feature = true;
  let featureCount = 0;
  while (index < count) {
    if (feature || count - index === 1) {
      rows.push({ type: "feature", items: [index], reverse: featureCount % 2 === 1 });
      featureCount += 1;
      index += 1;
    } else {
      rows.push({ type: "pair", items: [index, index + 1] });
      index += 2;
    }
    feature = !feature;
  }
  return rows;
}

export function Work({ t, locale }) {
  const work = t.work;
  const caseProps = (index) => ({ project: projects[index], index, t, locale });

  return (
    <section id="projects" className="section sheet theme-dark">
      <div className="shell">
        <header className="work-head">
          <div>
            <div className="section-label">
              <span className="num">02</span>
              <span className="bar" aria-hidden="true" />
              <p className="t-label">{work.label}</p>
            </div>
            <h2 className="t-h2">
              {work.title} <span className="text-gradient">{work.titleAccent}</span>
            </h2>
          </div>
          <div>
            <p className="t-lead">{work.intro}</p>

          </div>
        </header>

        <dl className="stats" data-reveal>
          {portfolioStats(work).map((stat) => (
            <div key={stat.label} className="stat">
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="cases">
          {buildRows(projects.length).map((row, rowIndex) =>
            row.type === "feature" ? (
              <Case key={row.items[0]} {...caseProps(row.items[0])} variant="feature" reverse={row.reverse} />
            ) : (
              <div key={`pair-${rowIndex}`} className="case-pair">
                {row.items.map((index) => (
                  <Case key={index} {...caseProps(index)} variant="card" />
                ))}
              </div>
            ),
          )}
        </div>

        <Testimonials t={t} locale={locale} />
        <MoreWork t={t} locale={locale} />
      </div>
    </section>
  );
}
