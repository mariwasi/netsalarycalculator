const DEFAULT_SITE_URL = "https://calcolostipendionettoitalia.com";

function normalizeSiteUrl(value: string): string {
  const url = new URL(value);
  url.protocol = "https:";
  url.hostname = url.hostname.replace(/^www\./i, "");
  url.username = "";
  url.password = "";
  url.pathname = "";
  url.search = "";
  url.hash = "";
  return url.origin;
}

function readSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  try {
    return normalizeSiteUrl(raw);
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/** Non-www production origin. www is stripped if an env value includes it. */
export const SITE_URL = readSiteUrl();

/** Shared social preview image (the approved euro-coin logo). Every page's
 * openGraph must list it explicitly: a page-level openGraph replaces the
 * layout's, so layout-only images never reach inner pages. */
export const OG_IMAGES = [
  {
    url: "/logo.webp",
    width: 1600,
    height: 1600,
    alt: "StipendioNetto — Calcolo Stipendio Netto 2026",
  },
];
