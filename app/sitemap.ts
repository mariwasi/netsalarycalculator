import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/come-si-calcola-stipendio-netto`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/scaglioni-irpef-2026`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/busta-paga`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/come-leggere-la-busta-paga`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/metodologia`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/calcolo-irpef`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/calcolo-ral`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/stipendio-netto-ral-28000`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/stipendio-netto-ral-30000`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ccnl-metalmeccanico`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ccnl-commercio`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/preavviso-dimissioni`,
      lastModified: new Date("2026-11-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
