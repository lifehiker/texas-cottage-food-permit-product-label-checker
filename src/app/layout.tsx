import type { Metadata } from "next";
import { headers } from "next/headers";

import "./globals.css";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getOriginFromHeaders } from "@/lib/request-url";

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();

  return {
    metadataBase: new URL(getOriginFromHeaders(headerStore)),
    title: {
      default: "Texas Cottage Food Checker",
      template: "%s | Texas Cottage Food Checker",
    },
    description:
      "Get a plain-English answer on Texas cottage food rules, label requirements, and selling steps. Use the free Texas Cottage Food Checker and label generator.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-ui text-[var(--ink)]">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
