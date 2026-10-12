import type { SVGProps } from "react";

type IconName = "flower" | "arrow-up-right" | "arrow-down" | "heart" | "sparkle" | "clock" | "users" | "calendar" | "check";

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

const paths: Record<IconName, React.ReactNode> = {
  flower: <><path d="M12 12c-2-1-3-3-2-5 1-2 3-2 4 0 1 2 0 4-2 5Z"/><path d="M12 12c1-2 3-3 5-2 2 1 2 3 0 4-2 1-4 0-5-2Z"/><path d="M12 12c2 1 3 3 2 5-1 2-3 2-4 0-1-2 0-4 2-5Z"/><path d="M12 12c-1 2-3 3-5 2-2-1-2-3 0-4 2-1 4 0 5 2Z"/><circle cx="12" cy="12" r="1"/></>,
  "arrow-up-right": <><path d="M7 17 17 7M8 7h9v9"/></>,
  "arrow-down": <><path d="M12 5v14m-6-6 6 6 6-6"/></>,
  heart: <><path d="M20.8 8.8c0 5.1-8.8 10-8.8 10s-8.8-4.9-8.8-10a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z"/></>,
  sparkle: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  users: <><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.6V20"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  check: <><path d="m5 12 4 4L19 6"/></>,
};

export function Icon({ name, size = 20, ...props }: IconProps) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>{paths[name]}</svg>;
}
