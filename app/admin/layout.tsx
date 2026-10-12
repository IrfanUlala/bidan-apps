"use client";

import type { ReactNode } from "react";
import { Flower2 } from "lucide-react";
import Link from "next/link";
import { usePublicSiteContent } from "../../components/layout/public-site-content-provider";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const content = usePublicSiteContent();
  return (
    <section className="admin-shell">
      <header className="admin-topbar">
        <Link className="admin-brand" href="/">
          <span className="brand-mark">
            {content.practice.iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={content.practice.iconUrl} alt="" />
            ) : <Flower2 size={19} aria-hidden="true" />}
          </span>
          <span>{content.practice.businessName}</span>
          <span className="admin-brand-label">ADMIN DEMO</span>
        </Link>
        <Link className="admin-public-link" href="/">Lihat website <span aria-hidden="true">↗</span></Link>
      </header>
      {children}
    </section>
  );
}
