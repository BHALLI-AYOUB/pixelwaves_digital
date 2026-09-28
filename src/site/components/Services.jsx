import React from "react";
import { servicePages, servicePaths } from "../data/services.mjs";
import { site } from "../data/site.mjs";
import { Icon, PortraitImage } from "./Brand.jsx";

export function Services({ t, locale }) {
  const services = t.services;

  return (
    <section id="services" className="section sheet theme-light">
      <div className="shell services-grid">
        <div className="services-intro">
          <div className="section-label">
            <span className="num">03</span>
            <span className="bar" aria-hidden="true" />
            <p className="t-label">{services.label}</p>
          </div>
          <h2 className="t-h2">{services.title}</h2>
          <p className="t-lead">{services.intro}</p>
          <a className="btn btn-primary" href="#contact" data-glow>
            {services.cta}
            <span className="btn-icon">
              <Icon name="arrowRight" className="h-4 w-4" />
            </span>
          </a>
          <ul className="service-page-links">
            {servicePages.map((page) => (
              <li key={page.id}>
                <a className="link-underline" href={servicePaths[locale](page)}>
                  {page[locale].navLabel}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {services.items.map((service, index) => (
            <article key={service.title} className="service" data-reveal data-glow>
              <span className="service-num">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-text">{service.text}</p>
                <ul className="tag-list">
                  {service.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
                <a className="stretched-link" href="#contact" data-service={service.formValue}>
                  <span className="sr-only">
                    {services.startPrefix} {service.title}
                  </span>
                </a>
              </div>
              <span className="service-arrow" aria-hidden="true">
                <Icon name="arrowUpRight" className="h-5 w-5" />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process({ t }) {
  const process = t.process;

  return (
    <section className="section sheet theme-mist" aria-labelledby="process-title">
      <div className="shell">
        <div className="process-head">
          <div>
            <div className="section-label">
              <span className="num">04</span>
              <span className="bar" aria-hidden="true" />
              <p className="t-label">{process.label}</p>
            </div>
            <h2 id="process-title" className="t-h2">
              {process.title}
            </h2>
          </div>
        </div>

        <ol className="steps">
          {process.steps.map((step, index) => (
            <li key={step.title} className="step" data-reveal style={{ "--d": `${index * 140}ms` }}>
              <span className="step-dot" aria-hidden="true" />
              <p className="t-label">
                {process.stepLabel} {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Founder({ t }) {
  const founder = t.founder;

  return (
    <section id="founder" className="section sheet theme-dark founder" aria-labelledby="founder-title">
      <div className="founder-glow" aria-hidden="true" />
      <div className="shell founder-grid">
        <figure className="portrait" data-reveal>
          <PortraitImage alt={founder.portraitAlt} sizes="(min-width: 960px) 432px, 90vw" />
          <figcaption className="portrait-badge">
            <span className="portrait-name">{site.founder}</span>
            <span className="tag">{founder.role}</span>
          </figcaption>
        </figure>

        <div data-reveal style={{ "--d": "120ms" }}>
          <div className="section-label">
            <span className="num">05</span>
            <span className="bar" aria-hidden="true" />
            <p className="t-label">{founder.label}</p>
          </div>
          <h2 id="founder-title" className="t-h2">
            {site.founder}
          </h2>
          <p className="founder-role">{founder.role}</p>
          <p className="founder-statement">{founder.statement}</p>
          <p className="founder-bio">{founder.bio}</p>
          <ul className="tag-list">
            {founder.skills.map((skill) => (
              <li key={skill} className="tag">
                {skill}
              </li>
            ))}
          </ul>
          <div className="founder-links">
            {site.founderLinkedin && (
              <a className="btn btn-ghost btn-sm" href={site.founderLinkedin} target="_blank" rel="noopener">
                <Icon name="linkedin" className="h-4 w-4" />
                {founder.linkedin}
                <span className="sr-only"> {t.newTab}</span>
              </a>
            )}
            <a className="btn btn-ghost btn-sm" href={site.github} target="_blank" rel="noopener">
              <Icon name="github" className="h-4 w-4" />
              {founder.github}
              <span className="sr-only"> {t.newTab}</span>
            </a>
            <a className="btn btn-ghost btn-sm" href={`mailto:${site.email}`}>
              <Icon name="mail" className="h-4 w-4" />
              {founder.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ t }) {
  const faq = t.faq;

  return (
    <section className="section sheet theme-light" aria-labelledby="faq-title">
      <div className="shell faq-grid">
        <div className="faq-intro">
          <div className="section-label">
            <span className="num">06</span>
            <span className="bar" aria-hidden="true" />
            <p className="t-label">{faq.label}</p>
          </div>
          <h2 id="faq-title" className="t-h2">
            {faq.title}
          </h2>
          <p>
            {faq.intro}{" "}
            <a className="link-underline" href="#contact">
              {faq.introLink}
            </a>
          </p>
        </div>

        <div className="faq-list" data-reveal>
          {faq.items.map((item, index) => (
            <details key={item.q} className="faq-item" open={index === 0}>
              <summary>
                {item.q}
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p className="faq-answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
