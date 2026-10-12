import type { ReactNode } from "react";
import { Flower2 } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <section className="admin-shell">
      <header className="admin-topbar">
        <Link className="admin-brand" href="/">
          <span className="brand-mark"><Flower2 size={19} aria-hidden="true" /></span>
          <span>ruang<span className="brand-accent">bunda</span></span>
          <span className="admin-brand-label">ADMIN DEMO</span>
        </Link>
        <Link className="admin-public-link" href="/">Lihat website <span aria-hidden="true">↗</span></Link>
      </header>
      {children}
    </section>
  );
}
