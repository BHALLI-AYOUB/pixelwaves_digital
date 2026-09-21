import React from "react";
import { site } from "../data/site.mjs";
import { Icon, Logo } from "./Brand.jsx";

// `alternates` maps each language to this page's translation (home by default).
export function LangSwitch({ t, locale, alternates = site.localePaths }) {
  return (
    <nav className="lang-switch" aria-label={t.nav.language}>
      {Object.entries(alternates).map(([code, href]) => (
        <a key={code} href={href} hrefLang={code} lang={code} aria-current={code === locale ? "true" : undefined} data-lang-link>
          {code.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}

// `base` is "" on the home page and the localized home path on other pages,
// so section links keep working from the legal pages.
export function SiteHeader({ t, locale, base = "", showLang = true, solid = false, alternates }) {
  return (
    <>
      <header className={solid ? "site-header is-solid" : "site-header"} data-header>
        <div className="nav-bar">
          <a className="nav-logo" href={`${base}#home`} aria-label={t.nav.homeLabel}>
            <Logo />
          </a>
          <nav className="nav-links" aria-label={t.nav.label}>
            <ul>
              {t.nav.links.map((link) => (
                <li key={link.id}>
                  <a className="nav-link" href={`${base}#${link.id}`} data-nav-link={link.id}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-actions">
            {showLang && <LangSwitch t={t} locale={locale} alternates={alternates} />}
            <a className="btn btn-primary btn-sm nav-cta" href={`${base}#contact`} data-glow>
              {t.nav.cta}
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="mobile-menu"
              data-menu-toggle
              data-label-open={t.nav.openMenu}
              data-label-close={t.nav.closeMenu}
            >
              <span className="sr-only" data-menu-label>
                {t.nav.openMenu}
              </span>
              <span className="menu-bars" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className="menu-panel" data-menu inert>
        <nav aria-label={t.nav.label}>
          <ul className="menu-list">
            {t.nav.links.map((link, index) => (
              <li key={link.id}>
                <a href={`${base}#${link.id}`} style={{ "--i": index }} data-menu-link>
                  <span className="num">0{index + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-foot">
          <a className="btn btn-primary" href={`${base}#contact`} data-menu-link>
            {t.nav.cta}
            <span className="btn-icon">
              <Icon name="arrowRight" className="h-4 w-4" />
            </span>
          </a>
          <div className="menu-contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.whatsapp} target="_blank" rel="noopener">
              WhatsApp · {site.phoneDisplay}
            </a>
          </div>
          {showLang && <LangSwitch t={t} locale={locale} alternates={alternates} />}
        </div>
      </div>
    </>
  );
}
