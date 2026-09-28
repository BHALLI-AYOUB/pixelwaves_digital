import React from "react";
import images from "../data/images.json";

/* The PixelWaves logo. scripts/brand-assets.mjs keys the dark background out of
   public/logo.png so it sits on any dark surface. "compact" drops the small
   "DIGITAL SOLUTIONS" line, which is unreadable at navigation size. */
export function Logo({ variant = "compact", className = "brand-logo", alt = "" }) {
  const full = variant === "full";
  const base = full ? "/public/brand/logo-mark" : "/public/brand/logo-compact";
  return (
    <picture>
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img className={className} src={`${base}.png`} width="446" height={full ? "137" : "100"} alt={alt} decoding="async" />
    </picture>
  );
}

const paths = {
  arrowRight: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  arrowUp: <path d="M12 19V5m-6 6 6-6 6 6" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  spark: <path d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10z" fill="currentColor" stroke="none" />,
};

const brands = {
  whatsapp:
    "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.5 9.5 0 0 1-4.83-1.32l-.35-.2-3.6.94.96-3.5-.22-.36a9.45 9.45 0 0 1-1.45-5.04c0-5.24 4.27-9.5 9.52-9.5a9.46 9.46 0 0 1 9.5 9.51c0 5.24-4.27 9.5-9.52 9.5m8.1-17.6A11.4 11.4 0 0 0 12.04.5C5.73.5.6 5.63.6 11.93c0 2.02.53 3.98 1.53 5.72L.5 23.5l6-1.58a11.4 11.4 0 0 0 5.54 1.41h.01c6.3 0 11.43-5.13 11.44-11.43 0-3.05-1.19-5.92-3.35-8.08",
  instagram:
    "M12 2.2c3.2 0 3.58 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33 0 7.05.07 2.7.27.27 2.69.07 7.05 0 8.33 0 8.74 0 12s0 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 24 8.74 24 12 24s3.67 0 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67 0 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  linkedin:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.2 0 22.23 0z",
  github:
    "M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3",
};

export function Icon({ name, className = "h-5 w-5", strokeWidth = 1.8 }) {
  if (brands[name]) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d={brands[name]} />
      </svg>
    );
  }
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

function responsive(base, meta, sizes) {
  const set = (ext) => meta.widths.map((width) => `${base}-${width}.${ext} ${width}w`).join(", ");
  const largest = meta.widths[meta.widths.length - 1];
  return {
    avif: set("avif"),
    webp: set("webp"),
    fallback: `${base}-${meta.widths[Math.min(1, meta.widths.length - 1)]}.webp`,
    width: largest,
    height: Math.round(largest / meta.aspect),
    sizes,
  };
}

function Picture({ image, alt, loading = "lazy", fetchPriority }) {
  return (
    <picture>
      <source type="image/avif" srcSet={image.avif} sizes={image.sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={image.sizes} />
      <img
        src={image.fallback}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}

// Homepage screenshots by default; `shot` selects an inner screen from the project's shots.
function workMeta(slug, mode, shot) {
  return shot ? images.work[slug].shots[shot][mode] : images.work[slug][mode];
}

export function hasShotImage(slug, shot, mode) {
  return Boolean(images.work[slug]?.shots?.[shot]?.[mode]);
}

export function workImageColor(slug, mode, shot) {
  return workMeta(slug, mode, shot).color;
}

export function WorkImage({ slug, mode, shot, sizes, alt, loading, fetchPriority }) {
  const base = shot ? `/public/work/${slug}-${shot}-${mode}` : `/public/work/${slug}-${mode}`;
  const image = responsive(base, workMeta(slug, mode, shot), sizes);
  return <Picture image={image} alt={alt} loading={loading} fetchPriority={fetchPriority} />;
}

// Browser window with a screenshot. `className` adds layout modifiers.
export function BrowserFrame({ project, shot, sizes, alt, className = "browser", loading, fetchPriority }) {
  return (
    <span className={className}>
      <span className="browser-bar">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">
          <Icon name="lock" strokeWidth={2.2} />
          {project.domain}
        </span>
      </span>
      <span className="browser-screen" style={{ "--ph": workImageColor(project.slug, "desktop", shot) }}>
        <WorkImage slug={project.slug} mode="desktop" shot={shot} sizes={sizes} alt={alt} loading={loading} fetchPriority={fetchPriority} />
      </span>
    </span>
  );
}

export function PhoneFrame({ project, shot, sizes, alt, className = "phone", loading, fetchPriority }) {
  return (
    <span className={className}>
      <span className="phone-screen" style={{ "--ph": workImageColor(project.slug, "mobile", shot) }}>
        <WorkImage slug={project.slug} mode="mobile" shot={shot} sizes={sizes} alt={alt} loading={loading} fetchPriority={fetchPriority} />
      </span>
    </span>
  );
}

export function PortraitImage({ alt, sizes }) {
  const image = responsive("/public/team/ayoub-bhalli", images.portrait, sizes);
  return <Picture image={image} alt={alt} />;
}
