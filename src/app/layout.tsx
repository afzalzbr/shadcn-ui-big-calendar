import { GitHubStarButton } from "@/components/github-star-button";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeSelect } from "@/components/theme/theme-select";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "Shadcn Big Calendar | Drag-and-drop scheduling UI",
  description:
    "Open source drag-and-drop calendar built with Next.js, shadcn/ui, and react-big-calendar. Resize events, toggle themes, and explore accessible scheduling patterns.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "shadcn",
    "react big calendar",
    "drag and drop calendar",
    "nextjs calendar",
    "scheduling ui",
    "calendar component",
    "accessible calendar",
  ],
  authors: [{ name: "Jonas List", url: "https://jonas-list.vercel.app/" }],
  creator: "Jonas List",
  openGraph: {
    title: "Shadcn Big Calendar | Drag-and-drop scheduling UI",
    description:
      "A themed React Big Calendar demo with shadcn/ui components, draggable events, and responsive layouts.",
    type: "website",
    images: ["/og-calendar.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadcn Big Calendar | Drag-and-drop scheduling UI",
    description:
      "Explore a styled React Big Calendar with drag-and-drop, event resizing, and light/dark theme support.",
    images: ["/og-calendar.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <Analytics />
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <nav className="w-full py-4 border-b mb-4">
              <div className="container flex justify-between items-center">
                <p className="text-lg font-semibold" aria-label="Shadcn Big Calendar home">
                  Shadcn/ui - Big Calendar Styles
                </p>
                <div className="flex items-center gap-2">
                  <GitHubStarButton />
                  <ThemeSelect />
                </div>
              </div>
            </nav>
            {children}
            <footer className="w-full py-4 border-t mt-auto">
              <div className="container flex justify-between">
                <p>
                  &copy; {new Date().getFullYear()}{" "}
                  <Link href="https://jonas-list.vercel.app/" className="hover:underline">Jonas List</Link>
                </p>
                <p>
                  <Link
                    href="https://jquense.github.io/react-big-calendar/examples/index.html?path=/story/about-big-calendar--page"
                    className="mr-2 hover:underline"
                  >
                    Original Big Calendar
                  </Link>
                  |
                  <Link href="https://ui.shadcn.com/" className="ml-2 hover:underline">
                    Shadcn/ui
                  </Link>
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
