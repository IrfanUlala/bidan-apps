"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { siteContent, type SiteContent } from "../../features/content/site-content";
import { readSavedSiteContent } from "../../features/content/site-settings";

const PublicSiteContentContext = createContext<SiteContent>(siteContent);

export function PublicSiteContentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [content, setContent] = useState(siteContent);
  const pathname = usePathname();

  useEffect(() => {
    const updateContent = () => {
      try {
        const nextContent = readSavedSiteContent();
        setContent(nextContent);
        if (!window.location.pathname.startsWith("/admin")) {
          const pageLabel =
            window.location.pathname === "/kegiatan"
              ? "Kegiatan"
              : "Sahabat Perjalanan Ibu";
          window.setTimeout(() => {
            document.title = `${nextContent.practice.businessName} | ${pageLabel}`;
          }, 0);
        }
      } catch (error) {
        console.error("Pengaturan situs gagal dimuat.", error);
      }
    };

    updateContent();
    window.addEventListener("storage", updateContent);
    window.addEventListener("ruangbunda-site-content-updated", updateContent);
    return () => {
      window.removeEventListener("storage", updateContent);
      window.removeEventListener(
        "ruangbunda-site-content-updated",
        updateContent,
      );
    };
  }, []);

  useEffect(() => {
    const titleTimer = window.setTimeout(() => {
      if (pathname.startsWith("/admin")) return;
      const pageLabel = pathname === "/kegiatan" ? "Kegiatan" : "Sahabat Perjalanan Ibu";
      document.title = `${content.practice.businessName} | ${pageLabel}`;
    }, 0);

    const applyFavicon = () => {
      const icons = Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]'),
      );
      const targetHref = content.practice.faviconUrl || "/favicon.ico";
      if (!icons.length) {
        const primaryIcon = document.createElement("link");
        primaryIcon.rel = "icon";
        primaryIcon.href = targetHref;
        document.head.append(primaryIcon);
      } else {
        icons.forEach((icon) => {
          if (icon.getAttribute("href") !== targetHref) {
            icon.href = targetHref;
          }
        });
      }
    };
    applyFavicon();
    const observer = new MutationObserver(applyFavicon);
    observer.observe(document.head, { childList: true });
    return () => {
      window.clearTimeout(titleTimer);
      observer.disconnect();
    };
  }, [content, pathname]);

  return (
    <PublicSiteContentContext.Provider value={content}>
      {children}
    </PublicSiteContentContext.Provider>
  );
}

export function usePublicSiteContent() {
  return useContext(PublicSiteContentContext);
}
