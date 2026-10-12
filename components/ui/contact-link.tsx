"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePublicSiteContent } from "../layout/public-site-content-provider";

type ContactLinkProps = {
  children: ReactNode;
  className: string;
  message: string;
  fallbackHref?: string;
};

export function ContactLink({
  children,
  className,
  message,
  fallbackHref = "/#booking",
}: ContactLinkProps) {
  const content = usePublicSiteContent();
  const number =
    content.practice.whatsappNumber ??
    content.profile.phone.replace(/\D/g, "");
  const href =
    !content.isDemo && /^[1-9]\d{7,14}$/.test(number)
      ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
      : null;

  if (!href) {
    return (
      <Link className={className} href={fallbackHref}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
