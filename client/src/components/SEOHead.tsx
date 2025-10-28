import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  type?: "website" | "article";
  image?: string;
  schema?: object;
}

export function SEOHead({ title, description, type = "website", image, schema }: SEOHeadProps) {
  useEffect(() => {
    // Set title
    document.title = title;

    // Set meta tags
    const metaTags = [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ];

    if (image) {
      metaTags.push(
        { property: "og:image", content: image },
        { name: "twitter:image", content: image }
      );
    }

    // Remove existing meta tags
    metaTags.forEach(({ name, property }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      const existing = document.querySelector(selector);
      if (existing) {
        existing.remove();
      }
    });

    // Add new meta tags
    metaTags.forEach(({ name, property, content }) => {
      const meta = document.createElement("meta");
      if (name) meta.setAttribute("name", name);
      if (property) meta.setAttribute("property", property);
      meta.setAttribute("content", content);
      document.head.appendChild(meta);
    });

    // Add JSON-LD schema
    if (schema) {
      const existingSchema = document.querySelector('script[type="application/ld+json"]');
      if (existingSchema) {
        existingSchema.remove();
      }

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
      metaTags.forEach(({ name, property }) => {
        const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
        const existing = document.querySelector(selector);
        if (existing) {
          existing.remove();
        }
      });

      if (schema) {
        const existingSchema = document.querySelector('script[type="application/ld+json"]');
        if (existingSchema) {
          existingSchema.remove();
        }
      }
    };
  }, [title, description, type, image, schema]);

  return null;
}
