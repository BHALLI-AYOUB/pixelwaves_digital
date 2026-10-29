import React from "react";
import { absoluteUrl, site } from "./data/site.mjs";

const fonts = ["/public/fonts/bricolage-display.woff2", "/public/fonts/geist.woff2"];

export function Document({ locale, t, title, description, pathname, alternates, ogImage, jsonLd, assets, noindex = false, children }) {
  return (
    <html lang={locale} dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content={noindex ? "noindex" : "index, follow, max-image-preview:large"} />
        <link rel="canonical" href={absoluteUrl(pathname)} />
        {alternates &&
          Object.entries(alternates).map(([code, href]) => <link key={code} rel="alternate" hrefLang={code} href={absoluteUrl(href)} />)}
        {alternates && <link rel="alternate" hrefLang="x-default" href={absoluteUrl(alternates.en)} />}

        <meta name="theme-color" content="#07060b" />
        <meta name="color-scheme" content="dark" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={absoluteUrl(pathname)} />
        <meta property="og:locale" content={t.ogLocale} />
        <meta property="og:image" content={absoluteUrl(ogImage)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={absoluteUrl(ogImage)} />

        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/public/brand/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/public/brand/favicon-16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/public/brand/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {fonts.map((href) => (
          <link key={href} rel="preload" href={href} as="font" type="font/woff2" crossOrigin="" />
        ))}
        <link rel="stylesheet" href={assets.css} />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/json" id="analytics-config" dangerouslySetInnerHTML={{ __html: JSON.stringify(site.analytics) }} />
        {jsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        )}
      </head>
      <body>
        <a className="skip-link" href="#main">
          {t.skipLink}
        </a>
        {children}
        <script src={assets.js} defer />
      </body>
    </html>
  );
}
