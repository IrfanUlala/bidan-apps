"use client";

import { usePublicSiteContent } from "./public-site-content-provider";

export function SiteFooter() {
  const content = usePublicSiteContent();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="brand" href="#">
          <span className="brand-mark" aria-hidden="true">
            {content.practice.iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={content.practice.iconUrl} alt="" />
            ) : "✿"}
          </span>
          <span>{content.practice.businessName}</span>
        </a>
        <p>
          {content.profile.name} ·{" "}
          {content.practice.mapsUrl ? (
            <a href={content.practice.mapsUrl} target="_blank" rel="noreferrer">
              {content.practice.address}
            </a>
          ) : content.practice.address}
          {content.profile.phone ? ` · ${content.profile.phone}` : ""}
          {content.practice.contactHours ? ` · ${content.practice.contactHours}` : ""}
        </p>
        <span>© {content.practice.businessName}</span>
      </div>
    </footer>
  );
}
