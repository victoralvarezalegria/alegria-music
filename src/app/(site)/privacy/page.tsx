import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Víctor Álvarez Alegría",
  description: "How Alegría Global LLC collects, uses and protects personal data on alegriamusic.net.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
