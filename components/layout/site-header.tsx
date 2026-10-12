"use client";

import Link from "next/link";
import { Icon } from "../ui/icon";
import { usePublicSiteContent } from "./public-site-content-provider";

const links = [
  ["Layanan", "#layanan"],
  ["Jadwal", "#jadwal"],
  ["Kegiatan", "/kegiatan"],
];

export function SiteHeader() {
  const content = usePublicSiteContent();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label={`${content.practice.businessName}, beranda`}>
          <span className="brand-mark">
            {content.practice.iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={content.practice.iconUrl} alt="" />
            ) : (
              <Icon name="flower" size={20} />
            )}
          </span>
          <span>{content.practice.businessName}</span>
        </Link>
        <nav className="main-nav" aria-label="Navigasi utama">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="button button-small" href="#booking">Konsultasi <Icon name="arrow-up-right" size={15} /></a>
      </div>
    </header>
  );
}
