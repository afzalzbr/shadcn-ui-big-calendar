"use client";

import { Button } from "@/components/ui/button";
import { Palette, Clock, Database, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Custom className Styling",
    description: "Apply custom CSS classes to events using the eventPropGetter function. Style events based on categories, priorities, or any custom logic.",
    icon: Palette,
    href: "/features/custom-classname",
    highlights: [
      "Dynamic class assignment",
      "Category-based styling",
      "Full Tailwind CSS support",
      "Easy theme integration",
    ],
  },
  {
    title: "Time Display with Events",
    description: "Show time information alongside event titles using custom event components. Perfect for displaying durations and schedules at a glance.",
    icon: Clock,
    href: "/features/time-display",
    highlights: [
      "Custom event rendering",
      "Time format customization",
      "Duration display",
      "Responsive layout",
    ],
  },
  {
    title: "Generic Data Props",
    description: "Extend events with custom data properties and display them in interactive modals. Build rich, data-driven calendar experiences.",
    icon: Database,
    href: "/features/data-props",
    highlights: [
      "TypeScript generics",
      "Custom event metadata",
      "Interactive modals",
      "Type-safe implementation",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <main className="container my-auto space-y-12 py-8">
      <header className="max-w-3xl space-y-4">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Feature Showcase
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore the powerful features of Shadcn Big Calendar through interactive demos.
          Each example includes working code, detailed explanations, and implementation guidance.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-5xl">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.href}
              className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight mb-2">
                      {feature.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {feature.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild className="w-full md:w-auto">
                    <Link href={feature.href}>
                      View Demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="max-w-3xl border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Getting Started
        </h2>
        <p className="text-muted-foreground">
          Each feature demo includes complete, working code examples that you can copy and integrate
          into your own projects. The examples use TypeScript for type safety and follow React best
          practices with proper hooks usage and memoization.
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href="https://github.com/list-jonas/shadcn-ui-big-calendar"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
