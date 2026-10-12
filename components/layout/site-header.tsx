import Link from "next/link";
import { Icon } from "../ui/icon";

const links = [
  ["Layanan", "#layanan"],
  ["Jadwal", "#jadwal"],
  ["Kegiatan", "/kegiatan"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Ruang Bunda, beranda">
          <span className="brand-mark"><Icon name="flower" size={20} /></span>
          <span>ruang<span className="brand-accent">bunda</span></span>
        </Link>
        <nav className="main-nav" aria-label="Navigasi utama">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="button button-small" href="#booking">Konsultasi <Icon name="arrow-up-right" size={15} /></a>
      </div>
    </header>
  );
}
