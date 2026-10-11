import { Github, Mail, type LucideIcon } from "lucide-react";

export interface SocialLink {
  Icon: LucideIcon;
  label: string;
  href: string;
}

export function getSocialLinks(): SocialLink[] {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "jack@example.com";
  const githubUrl = import.meta.env.VITE_GITHUB_URL || "#";

  return [
    { Icon: Github, label: "GitHub", href: githubUrl },
    { Icon: Mail,   label: "Email",  href: `mailto:${contactEmail}` },
  ];
}
