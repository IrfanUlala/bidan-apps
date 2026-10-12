import { siteContent, type SiteContent } from "./site-content";

export const publicSiteContentStorageKey = "ruangbunda-site-content-v1";

export function isSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") return false;
  const content = value as Partial<SiteContent>;
  return (
    typeof content.isDemo === "boolean" &&
    typeof content.practice === "object" &&
    content.practice !== null &&
    typeof content.practice.businessName === "string" &&
    (typeof content.practice.whatsappNumber === "string" ||
      content.practice.whatsappNumber === null) &&
    typeof content.practice.whatsappDisplay === "string" &&
    typeof content.practice.address === "string" &&
    (typeof content.practice.mapsUrl === "string" ||
      content.practice.mapsUrl === null) &&
    typeof content.practice.contactHours === "string" &&
    typeof content.practice.iconUrl === "string" &&
    typeof content.practice.faviconUrl === "string" &&
    typeof content.profile === "object" &&
    content.profile !== null &&
    typeof content.profile.name === "string" &&
    typeof content.profile.title === "string" &&
    typeof content.profile.description === "string" &&
    typeof content.profile.phone === "string" &&
    Array.isArray(content.services) &&
    content.services.every(
      (service) =>
        service !== null &&
        typeof service === "object" &&
        typeof service.id === "string" &&
        typeof service.title === "string" &&
        typeof service.description === "string" &&
        typeof service.price === "string" &&
        typeof service.duration === "string" &&
        typeof service.isActive === "boolean",
    ) &&
    Array.isArray(content.schedule) &&
    content.schedule.every(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.day === "string" &&
        typeof item.hours === "string" &&
        (item.practitionerName === undefined ||
          typeof item.practitionerName === "string"),
    ) &&
    Array.isArray(content.activities) &&
    content.activities.every(
      (activity) =>
        activity !== null &&
        typeof activity === "object" &&
        typeof activity.id === "string" &&
        typeof activity.title === "string" &&
        typeof activity.date === "string" &&
        typeof activity.time === "string" &&
        typeof activity.category === "string" &&
        typeof activity.description === "string" &&
        typeof activity.price === "string" &&
        typeof activity.location === "string" &&
        typeof activity.isActive === "boolean",
    ) &&
    Array.isArray(content.faqs)
  );
}

export function readSavedSiteContent(): SiteContent {
  const saved = window.localStorage.getItem(publicSiteContentStorageKey);
  if (!saved) return siteContent;
  const parsed: unknown = JSON.parse(saved);
  if (!isSiteContent(parsed)) {
    throw new Error("Format pengaturan konten publik tidak valid.");
  }
  return parsed;
}

export function saveSiteContent(content: SiteContent): void {
  if (!isSiteContent(content)) {
    throw new Error("Pengaturan konten publik tidak valid.");
  }
  window.localStorage.setItem(
    publicSiteContentStorageKey,
    JSON.stringify(content),
  );
  window.dispatchEvent(new Event("ruangbunda-site-content-updated"));
}
