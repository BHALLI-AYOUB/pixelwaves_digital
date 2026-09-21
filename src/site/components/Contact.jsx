import React from "react";
import { site } from "../data/site.mjs";
import { Icon, Logo } from "./Brand.jsx";
import { LangSwitch } from "./Header.jsx";

function Field({ id, name, label, optional, error, children }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
        {optional && <small> ({optional})</small>}
      </label>
      {children}
      {error && <p className="field-error" id={`${id}-error`} data-error-for={name} hidden />}
    </div>
  );
}

function Chips({ legend, name, options, required }) {
  return (
    <fieldset className="choice-group" data-choice={name}>
      <legend>{legend}</legend>
      <div className="chips">
        {options.map((option) => (
          <label key={option} className="chip">
            <input type="radio" name={name} value={option} required={required} />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {required && <p className="field-error" id={`f-${name}-error`} data-error-for={name} hidden />}
    </fieldset>
  );
}

export function Contact({ t, locale }) {
  const contact = t.contact;
  const form = contact.form;
  // Everything the client script needs to validate, report and build the WhatsApp fallback.
  const messages = {
    errors: form.errors,
    success: form.success,
    failure: form.failure,
    sending: form.sending,
    whatsappFallback: form.whatsappFallback,
    briefIntro: form.briefIntro,
    whatsapp: site.whatsapp,
    labels: { nom: form.name, email: form.email, telephone: form.phone, projet: form.type, delai: form.timeline, message: form.message },
  };

  const channels = [
    { label: contact.channels.email, value: site.email, href: `mailto:${site.email}`, icon: "mail" },
    { label: contact.channels.whatsapp, value: contact.channels.whatsappValue, href: site.whatsapp, icon: "whatsapp", external: true },
    { label: contact.channels.phone, value: site.phoneDisplay, href: `tel:${site.phone}`, icon: "phone" },
    { label: contact.channels.location, value: contact.channels.locationValue },
  ];

  return (
    <section id="contact" className="section sheet theme-dark contact" aria-labelledby="contact-title">
      <div className="contact-glow" aria-hidden="true" />
      <div className="shell">
        <div className="section-label">
          <span className="num">07</span>
          <span className="bar" aria-hidden="true" />
          <p className="t-label">{contact.label}</p>
        </div>
        <h2 id="contact-title" className="t-display contact-title" data-reveal>
          <span>{contact.title}</span>{" "}
          <span className="text-gradient">{contact.titleAccent}</span>
        </h2>

        <div className="contact-grid">
          <div data-reveal>
            <p className="t-lead contact-lead">{contact.lead}</p>
            <ul className="channels">
              {channels.map((channel) => {
                const inner = (
                  <>
                    <span>
                      <span className="channel-label">{channel.label}</span>
                      <span className="channel-value">{channel.value}</span>
                    </span>
                    {channel.href && (
                      <span className="circle-icon">
                        <Icon name={channel.icon} className="h-4 w-4" />
                      </span>
                    )}
                  </>
                );
                return (
                  <li key={channel.label}>
                    {channel.href ? (
                      <a className="channel" href={channel.href} {...(channel.external ? { target: "_blank", rel: "noopener" } : {})}>
                        {inner}
                        {channel.external && <span className="sr-only">{t.newTab}</span>}
                      </a>
                    ) : (
                      <div className="channel">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="t-label" style={{ marginTop: "2.5rem" }}>
              {contact.follow}
            </p>
            <div className="socials" style={{ marginTop: "1rem" }}>
              {site.socials.map((social) => (
                <a key={social.label} className="social-link" href={social.href} target="_blank" rel="noopener">
                  <Icon name={social.label.toLowerCase()} />
                  {social.label}
                  <span className="sr-only">{t.newTab}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="form-card" data-reveal style={{ "--d": "120ms" }}>
            <h3 className="form-title">{form.title}</h3>
            <form className="form-grid" action="/api/contact" method="post" noValidate data-contact-form data-messages={JSON.stringify(messages)}>
              <input type="hidden" name="source" value={`pixelwaves-website-${locale}`} />
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="f-company">Company</label>
                <input id="f-company" type="text" name="company" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="form-row">
                <Field id="f-nom" name="nom" label={form.name} error>
                  <input className="input" id="f-nom" name="nom" type="text" autoComplete="name" required />
                </Field>
                <Field id="f-email" name="email" label={form.email} error>
                  <input className="input" id="f-email" name="email" type="email" autoComplete="email" inputMode="email" required />
                </Field>
              </div>

              <div className="form-row">
                <Field id="f-telephone" name="telephone" label={form.phone} optional={form.optional}>
                  <input className="input" id="f-telephone" name="telephone" type="tel" autoComplete="tel" inputMode="tel" />
                </Field>
                <Field id="f-delai" name="delai" label={form.timeline} optional={form.optional}>
                  <select className="input" id="f-delai" name="delai" defaultValue="">
                    <option value="">{form.timelinePlaceholder}</option>
                    {form.timelineOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Chips legend={form.type} name="projet" options={form.typeOptions} required />

              <Field id="f-message" name="message" label={form.message} error>
                <textarea className="input" id="f-message" name="message" rows={5} placeholder={form.messagePlaceholder} required />
              </Field>

              <div className="form-status" role="status" aria-live="polite" data-form-status />

              <div className="form-foot">
                <p className="form-note">
                  {form.privacy} <a href="/confidentialite.html">{form.privacyLink}</a>.
                </p>
                <button className="btn btn-primary" type="submit" data-glow data-submit>
                  <span data-submit-label>{form.submit}</span>
                  <span className="btn-icon">
                    <Icon name="arrowRight" className="h-4 w-4" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ t, locale, base = "", showLang = true, alternates }) {
  const footer = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer theme-dark">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href={`${base}#home`} aria-label={t.nav.homeLabel} className="nav-logo footer-logo">
              <Logo variant="full" />
            </a>
            <p>{footer.tagline}</p>
            {showLang && <LangSwitch t={t} locale={locale} alternates={alternates} />}
          </div>

          <nav aria-label={footer.navigate}>
            <p className="t-label footer-title">{footer.navigate}</p>
            <ul className="footer-links">
              {t.nav.links.map((link) => (
                <li key={link.id}>
                  <a href={`${base}#${link.id}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="t-label footer-title">{footer.services}</p>
            <ul className="footer-links">
              {t.services.items.slice(0, 5).map((service) => (
                <li key={service.title}>
                  <a href={`${base}#services`}>{service.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="t-label footer-title">{footer.contact}</p>
            <ul className="footer-links">
              <li>
                <a href={`mailto:${site.email}`} style={{ overflowWrap: "anywhere" }}>
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
              </li>
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener">
                    {social.label}
                    <span className="sr-only"> {t.newTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} {site.name}. {footer.rights}
          </p>
          <div className="footer-legal">
            <a href="/mentions-legales.html">{footer.legal}</a>
            <a href="/confidentialite.html">{footer.privacy}</a>
            <a className="back-top" href={`${base}#home`}>
              {footer.backToTop}
              <Icon name="arrowUp" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat({ t }) {
  return (
    <a className="wa-float" href={site.whatsapp} target="_blank" rel="noopener" aria-label={`${t.whatsappFloat} ${t.newTab}`}>
      <Icon name="whatsapp" />
    </a>
  );
}
