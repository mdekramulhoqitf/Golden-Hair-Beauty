import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/cart"],
    },
    sitemap: "https://goldenhairbeauty.com/sitemap.xml",
  };
}
