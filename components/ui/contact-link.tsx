import type { ReactNode } from "react";
import Link from "next/link";
import { getWhatsAppUrl } from "../../features/content/site-content";

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
  fallbackHref = "/#kontak",
}: ContactLinkProps) {
  const href = getWhatsAppUrl(message);

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
