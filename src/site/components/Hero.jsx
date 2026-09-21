import React from "react";
import logos from "../data/logos.json";
import { projects } from "../data/projects.mjs";
import { casePaths } from "../data/site.mjs";
import { Icon, WorkImage, workImageColor } from "./Brand.jsx";

// Client logos from scripts/client-logos.mjs. The duplicate group makes the loop seamless
// and is hidden from assistive technology.
function Marquee({ t, locale }) {
  const clients = projects.filter((project) => logos[project.slug]);
  const group = (hidden) => (
    <ul className="marquee-group" aria-hidden={hidden ? "true" : undefined}>
      {clients.map((project) => {
        const size = logos[project.slug];
        return (
          <li key={project.slug} className="marquee-item">
            <a className="client-logo" href={casePaths[locale](project.slug)} tabIndex={hidden ? -1 : undefined} data-track="case_open" data-track-project={project.slug}>
              <picture>
                <source type="image/webp" srcSet={`/public/clients/${project.slug}.webp`} />
                <img src={`/public/clients/${project.slug}.png`} width={size.width} height={size.height} alt={project.logo.withName ? "" : project.name} decoding="async" fetchPriority="low" />
              </picture>
              {project.logo.withName && <span className="client-logo-name">{project.name}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
  return (
    <div className="marquee">
      <div className="shell marquee-inner">
        <p className="t-label">{t.marquee.label}</p>
        <div className="marquee-viewport">
          <div className="marquee-track">
            {group(false)}
            {group(true)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero({ t, locale }) {
  const hero = t.hero;
  const featured = projects[0];
  // The first word is repeated at the end so the CSS loop wraps seamlessly.
  const words = [...hero.rotating, hero.rotating[0]];

  return (
    <section id="home" className="hero theme-dark" data-hero>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="eclipse">
          <span className="eclipse-bloom" />
          <span className="eclipse-halo" />
          <span className="eclipse-core" />
          <span className="eclipse-ring" />
        </div>
        <div className="hero-vignette" />
      </div>

      <div className="shell hero-inner">
        <p className="t-label hero-kicker hero-in">
          <span className="pulse-dot" aria-hidden="true" />
          {hero.kicker}
        </p>

        <h1 className="hero-title t-display">
          <span className="sr-only">{hero.srTitle}</span>
          <span aria-hidden="true">
            <span className="hero-line">
              <span style={{ "--i": 0 }}>{hero.titleStart}</span>
            </span>
            <span className="hero-line">
              <span style={{ "--i": 1 }}>
                <span className="rotator">
                  <span className="rotator-track">
                    {words.map((word, index) => (
                      <span key={index} className="text-gradient">
                        {word}
                      </span>
                    ))}
                  </span>
                </span>
              </span>
            </span>
            <span className="hero-line">
              <span style={{ "--i": 2 }}>{hero.titleEnd}</span>
            </span>
          </span>
        </h1>

        <div className="hero-foot">
          <div className="hero-copy hero-in" style={{ "--d": "380ms" }}>
            <p className="t-lead">{hero.lead}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contact" data-glow>
                {hero.primary}
                <span className="btn-icon">
                  <Icon name="arrowRight" className="h-4 w-4" />
                </span>
              </a>
              <a className="btn btn-ghost" href="#projects">
                {hero.secondary}
              </a>
            </div>
          </div>

          <a className="hero-feature hero-in" href={casePaths[locale](featured.slug)} style={{ "--d": "560ms" }} data-track="case_open" data-track-project={featured.slug}>
            <span className="hero-feature-thumb" style={{ "--ph": workImageColor(featured.slug, "desktop") }}>
              <WorkImage slug={featured.slug} mode="desktop" sizes="152px" alt="" loading="lazy" fetchPriority="low" />
            </span>
            <span className="hero-feature-text">
              <span className="t-label">{hero.featuredLabel}</span>
              <span className="hero-feature-name">{featured.name}</span>
            </span>
            <span className="circle-icon">
              <Icon name="arrowUpRight" className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>

      <Marquee t={t} locale={locale} />
    </section>
  );
}
