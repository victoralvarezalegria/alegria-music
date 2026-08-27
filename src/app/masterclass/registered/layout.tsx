import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're Registered. The 1% Method Masterclass",
  robots: "noindex",
};

export default function MasterclassRegisteredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
