"use client";

import { CodeBlock } from "@/components/code-block";
import ShadcnBigCalendar from "@/components/shadcn-big-calendar/shadcn-big-calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Check, MoveVertical } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import type { View } from "react-big-calendar";
import { momentLocalizer, Views } from "react-big-calendar";

const localizer = momentLocalizer(moment);

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
};

const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const createDate = (dayOffset: number, hours: number, minutes = 0) => {
  const date = new Date(startOfToday);
  date.setDate(startOfToday.getDate() + dayOffset);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const sampleEvents: CalendarEvent[] = [
  {
    title: "Design review",
    start: createDate(0, 9),
    end: createDate(0, 10),
  },
  {
    title: "Product planning",
    start: createDate(0, 11),
    end: createDate(0, 12, 30),
  },
  {
    title: "Customer call",
    start: createDate(1, 10, 30),
    end: createDate(1, 11, 30),
  },
  {
    title: "Focus time",
    start: createDate(1, 14),
    end: createDate(1, 16),
  },
  {
    title: "Engineering sync",
    start: createDate(2, 9, 30),
    end: createDate(2, 10, 30),
  },
  {
    title: "Weekly retrospective",
    start: createDate(3, 15),
    end: createDate(3, 16),
  },
];

const presets = [
  {
    label: "Ultra compact",
    value: 24,
    description: "Maximize the amount of schedule visible.",
    useCase: "Overview screens and high-density data",
  },
  {
    label: "Compact",
    value: 32,
    description: "See more of a busy schedule at once.",
    useCase: "Dashboards and dense planning views",
  },
  {
    label: "Default",
    value: 40,
    description: "Use the calendar's familiar baseline density.",
    useCase: "Drop-in compatibility and migrations",
  },
  {
    label: "Comfortable",
    value: 48,
    description: "Balance scanability with useful detail.",
    useCase: "General-purpose scheduling",
  },
  {
    label: "Relaxed",
    value: 60,
    description: "Add room without making the timeline too tall.",
    useCase: "Detailed desktop scheduling",
  },
  {
    label: "Spacious",
    value: 72,
    description: "Give events more room to breathe.",
    useCase: "Touch interfaces and detailed events",
  },
  {
    label: "Extra spacious",
    value: 96,
    description: "Create large targets and maximum separation.",
    useCase: "Kiosks and accessibility-focused layouts",
  },
] as const;

export default function RowHeightDemo() {
  const [rowHeight, setRowHeight] = useState<number>(48);
  const [customHeight, setCustomHeight] = useState("48");
  const [customError, setCustomError] = useState("");
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const selectHeight = (height: number) => {
    setRowHeight(height);
    setCustomHeight(String(height));
    setCustomError("");
  };

  const applyCustomHeight = () => {
    const parsedHeight = Number(customHeight);

    if (
      !Number.isFinite(parsedHeight) ||
      parsedHeight < 16 ||
      parsedHeight > 240
    ) {
      setCustomError("Enter a height between 16 and 240 pixels.");
      return;
    }

    selectHeight(Math.round(parsedHeight));
  };

  const codeExample = `<ShadcnBigCalendar
  localizer={localizer}
  events={events}
  view={Views.WEEK}
  height={620}
  rowHeight={${rowHeight}}
/>`;

  const cssLengthExample = `<ShadcnBigCalendar
  // Numbers are interpreted as pixels
  rowHeight={48}

  // CSS length values work too
  // rowHeight="3rem"
  // rowHeight="clamp(2.5rem, 5vw, 4.5rem)"
/>`;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-2 sm:px-6 lg:px-8">
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" asChild className="mt-1">
          <Link href="/features" aria-label="Back to features">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight md:text-4xl">
            Row Height Sizing
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground md:text-base">
            Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">rowHeight</code> to
            control the vertical density of time slots in Week and Day views.
            Choose a preset below to compare the result instantly.
          </p>
        </div>
      </div>

      <section className="space-y-4" aria-labelledby="density-heading">
        <div>
          <h2
            id="density-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            Choose a density
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The default React Big Calendar row height is 40px. These examples
            show useful values on either side of that baseline.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {presets.map((preset) => {
            const selected = rowHeight === preset.value;

            return (
              <button
                key={preset.value}
                type="button"
                aria-pressed={selected}
                onClick={() => selectHeight(preset.value)}
                className={`relative rounded-lg border p-5 text-left transition-all hover:border-primary/60 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  selected ? "border-primary bg-primary/5 shadow-sm" : "bg-card"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{preset.label}</p>
                    <p className="mt-1 font-mono text-2xl font-bold">
                      {preset.value}px
                    </p>
                  </div>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      selected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {selected ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <MoveVertical className="h-4 w-4" />
                    )}
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {preset.description}
                </p>
                <p className="mt-2 text-xs font-medium text-foreground/80">
                  {preset.useCase}
                </p>
              </button>
            );
          })}
        </div>

        <form
          className="rounded-lg border bg-card p-5"
          onSubmit={(event) => {
            event.preventDefault();
            applyCustomHeight();
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <label htmlFor="custom-row-height" className="font-semibold">
                Custom row height
              </label>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter any whole-pixel value from 16 to 240. Press Enter or use
                the Apply button to update the preview.
              </p>
            </div>
            <div className="w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-40">
                  <Input
                    id="custom-row-height"
                    type="number"
                    inputMode="numeric"
                    min={16}
                    max={240}
                    step={1}
                    value={customHeight}
                    onChange={(event) => {
                      setCustomHeight(event.target.value);
                      setCustomError("");
                    }}
                    aria-invalid={Boolean(customError)}
                    aria-describedby={
                      customError ? "custom-height-error" : undefined
                    }
                    className="pr-10 font-mono"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    px
                  </span>
                </div>
                <Button type="submit">Apply</Button>
              </div>
              {customError && (
                <p
                  id="custom-height-error"
                  role="alert"
                  className="mt-2 text-sm text-destructive"
                >
                  {customError}
                </p>
              )}
            </div>
          </div>
        </form>
      </section>

      <section className="space-y-4" aria-labelledby="preview-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="preview-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              Live calendar preview
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Currently using {rowHeight}px rows. Switch between Week and Day in
              the calendar toolbar to see both supported views.
            </p>
          </div>
          <div className="rounded-full border bg-muted/40 px-3 py-1 font-mono text-sm">
            rowHeight={"{"}
            {rowHeight}
            {"}"}
          </div>
        </div>

        <div className="h-[620px] overflow-hidden rounded-lg border bg-card">
          <ShadcnBigCalendar<CalendarEvent>
            localizer={localizer}
            events={sampleEvents}
            startAccessor="start"
            endAccessor="end"
            height="100%"
            rowHeight={rowHeight}
            view={view}
            views={[Views.WEEK, Views.DAY]}
            onView={setView}
            date={date}
            onNavigate={setDate}
            min={createDate(0, 7)}
            max={createDate(0, 19)}
            scrollToTime={createDate(0, 8)}
          />
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="code-heading">
        <div>
          <h2
            id="code-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            Implementation examples
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Pass a number for pixels or a string for any valid CSS length.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <CodeBlock
            code={codeExample}
            language="tsx"
            fileName={`${rowHeight}px-preset.tsx`}
          />
          <CodeBlock
            code={cssLengthExample}
            language="tsx"
            fileName="css-length-values.tsx"
          />
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          When to use each size
        </h2>
        <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {presets.map((preset) => (
            <div key={preset.value} className="rounded-lg bg-muted/40 p-4">
              <p className="font-semibold">
                {preset.label} · {preset.value}px
              </p>
              <p className="mt-2 text-muted-foreground">{preset.useCase}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
