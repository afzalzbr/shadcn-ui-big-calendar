"use client";

import { CodeBlock } from "@/components/code-block";
import { EventChangeConfirmationModal } from "@/components/event-change-confirmation-modal";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { ComponentType, useState } from "react";
import type { CalendarProps, View } from "react-big-calendar";
import { momentLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import {
  CustomAgendaEvent,
  CustomEvent,
  CustomMonthEvent,
  CustomWeekEvent,
} from "shadcn-big-calendar";

// Import the calendar wrapper
import ShadcnBigCalendar from "@/components/shadcn-big-calendar/shadcn-big-calendar";

const DnDCalendar = withDragAndDrop<CalendarEvent>(
  ShadcnBigCalendar as ComponentType<CalendarProps<CalendarEvent>>
);

const localizer = momentLocalizer(moment);

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  variant?: "primary" | "secondary" | "outline";
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
    title: "Morning Standup",
    start: createDate(0, 9, 0),
    end: createDate(0, 9, 30),
    variant: "primary",
  },
  {
    title: "Design Review",
    start: createDate(0, 10, 30),
    end: createDate(0, 11, 30),
    variant: "secondary",
  },
  {
    title: "Lunch with Team",
    start: createDate(0, 12, 0),
    end: createDate(0, 13, 0),
    variant: "outline",
  },
  {
    title: "Client Presentation",
    start: createDate(1, 14, 0),
    end: createDate(1, 15, 30),
    variant: "primary",
  },
  {
    title: "Code Review Session",
    start: createDate(1, 16, 0),
    end: createDate(1, 17, 0),
    variant: "secondary",
  },
  {
    title: "Team Building Event",
    start: createDate(2, 0, 0),
    end: createDate(2, 23, 59),
    allDay: true,
    variant: "outline",
  },
  {
    title: "Product Demo",
    start: createDate(3, 10, 0),
    end: createDate(3, 11, 0),
    variant: "primary",
  },
  {
    title: "Sprint Planning",
    start: createDate(3, 13, 30),
    end: createDate(3, 15, 0),
    variant: "secondary",
  },
  {
    title: "One-on-One Meeting",
    start: createDate(4, 9, 30),
    end: createDate(4, 10, 0),
    variant: "outline",
  },
];

type EventComponentType = "default" | "custom" | "custom-month" | "custom-week";

export default function TimeDisplayDemo() {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [componentType, setComponentType] =
    useState<EventComponentType>("custom");
  const [requireConfirmation, setRequireConfirmation] = useState(false);

  // Confirmation modal state
  const [pendingChange, setPendingChange] = useState<{
    event: CalendarEvent;
    start: Date;
    end: Date;
    type: "drag" | "resize";
  } | null>(null);

  const applyEventChange = (event: CalendarEvent, start: Date, end: Date) => {
    setEvents((prevEvents) =>
      prevEvents.map((ev) =>
        ev.title === event.title && ev.start.getTime() === event.start.getTime()
          ? { ...ev, start, end }
          : ev
      )
    );
  };

  const handleEventDrop = ({
    event,
    start,
    end,
  }: {
    event: CalendarEvent;
    start: string | Date;
    end: string | Date;
  }) => {
    const startDate = typeof start === "string" ? new Date(start) : start;
    const endDate = typeof end === "string" ? new Date(end) : end;

    if (requireConfirmation) {
      setPendingChange({ event, start: startDate, end: endDate, type: "drag" });
    } else {
      applyEventChange(event, startDate, endDate);
    }
  };

  const handleEventResize = ({
    event,
    start,
    end,
  }: {
    event: CalendarEvent;
    start: string | Date;
    end: string | Date;
  }) => {
    const startDate = typeof start === "string" ? new Date(start) : start;
    const endDate = typeof end === "string" ? new Date(end) : end;

    if (requireConfirmation) {
      setPendingChange({
        event,
        start: startDate,
        end: endDate,
        type: "resize",
      });
    } else {
      applyEventChange(event, startDate, endDate);
    }
  };

  const handleConfirmChange = () => {
    if (pendingChange) {
      applyEventChange(
        pendingChange.event,
        pendingChange.start,
        pendingChange.end
      );
      setPendingChange(null);
    }
  };

  const handleCancelChange = () => {
    setPendingChange(null);
  };

  const eventPropGetter: CalendarProps<CalendarEvent>["eventPropGetter"] = (
    event
  ) => {
    const variant = event.variant ?? "primary";
    return {
      className: `event-variant-${variant}`,
    };
  };

  // Determine which components to use based on selection
  const getComponents = () => {
    switch (componentType) {
      case "custom":
        return { event: CustomEvent };
      case "custom-month":
        return {
          month: { event: CustomMonthEvent },
          week: { event: CustomWeekEvent },
          day: { event: CustomWeekEvent },
          agenda: { event: CustomAgendaEvent },
        };
      case "custom-week":
        return { event: CustomWeekEvent };
      default:
        return undefined;
    }
  };

  const basicUsageCode = `import { CustomEvent } from "shadcn-big-calendar";

// Use for all views
<ShadcnBigCalendar
  localizer={localizer}
  events={events}
  components={{
    event: CustomEvent,
  }}
/>`;

  const viewSpecificCode = `import {
  CustomMonthEvent,
  CustomWeekEvent,
  CustomAgendaEvent
} from "shadcn-big-calendar";

// Use different components per view
<ShadcnBigCalendar
  localizer={localizer}
  events={events}
  components={{
    month: { event: CustomMonthEvent },
    week: { event: CustomWeekEvent },
    day: { event: CustomWeekEvent },
    agenda: { event: CustomAgendaEvent },
  }}
/>`;

  const customizationCode = `import { CustomEvent } from "shadcn-big-calendar";
import type { EventProps } from "react-big-calendar";

// Create your own custom event component
function MyCustomEvent({ event }: EventProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col gap-0.5">
      {!event.allDay && (
        <div className="text-[10px] font-medium opacity-90">
          {formatTime(event.start)} - {formatTime(event.end)}
        </div>
      )}
      <div className="text-xs font-medium truncate">
        {event.title}
      </div>
    </div>
  );
}`;

  return (
    <main className="mx-auto my-auto w-full max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8 py-2">
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" asChild className="mt-1">
          <Link href="/features">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="scroll-m-20 text-3xl md:text-4xl font-bold tracking-tight">
            Time Display Components
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Show time information alongside event titles using custom event
            components
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Interactive Demo
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Switch
                id="confirmation-mode"
                checked={requireConfirmation}
                onCheckedChange={setRequireConfirmation}
              />
              <label
                htmlFor="confirmation-mode"
                className="text-sm font-medium cursor-pointer"
              >
                Require Confirmation
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={componentType === "default" ? "default" : "outline"}
                size="sm"
                onClick={() => setComponentType("default")}
              >
                Default
              </Button>
              <Button
                variant={componentType === "custom" ? "default" : "outline"}
                size="sm"
                onClick={() => setComponentType("custom")}
              >
                Custom Event
              </Button>
              <Button
                variant={
                  componentType === "custom-month" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setComponentType("custom-month")}
              >
                View-Specific
              </Button>
              <Button
                variant={
                  componentType === "custom-week" ? "default" : "outline"
                }
                size="sm"
                onClick={() => setComponentType("custom-week")}
              >
                Week Event
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card/50 p-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            {componentType === "default" &&
              "Default React Big Calendar event display (no time shown in title)"}
            {componentType === "custom" &&
              "CustomEvent component - Shows time range with event title (all views)"}
            {componentType === "custom-month" &&
              "View-specific components - Optimized display for each calendar view"}
            {componentType === "custom-week" &&
              "CustomWeekEvent component - Optimized for week and day views"}
          </p>
          <p className="text-xs text-muted-foreground">
            {requireConfirmation
              ? "Confirmation modal enabled - drag or resize events to see the confirmation dialog"
              : "Immediate updates - drag or resize events for instant changes"}
          </p>
        </div>

        <div className="h-[500px] md:h-[600px]">
          <DnDCalendar
            localizer={localizer}
            events={events}
            eventPropGetter={eventPropGetter}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            resizable
            components={getComponents()}
            className="border-border border-rounded-md border-solid border-2 rounded-lg"
          />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          Implementation Examples
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Basic Usage - Single Component
            </h3>
            <p className="text-muted-foreground mb-3">
              Use the same custom event component for all calendar views.
            </p>
            <CodeBlock
              code={basicUsageCode}
              language="tsx"
              fileName="calendar.tsx"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">
              View-Specific Components
            </h3>
            <p className="text-muted-foreground mb-3">
              Use different components optimized for each view type (month,
              week, day, agenda).
            </p>
            <CodeBlock
              code={viewSpecificCode}
              language="tsx"
              fileName="calendar.tsx"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">
              Custom Implementation
            </h3>
            <p className="text-muted-foreground mb-3">
              Create your own event component with custom time formatting and
              styling.
            </p>
            <CodeBlock
              code={customizationCode}
              language="tsx"
              fileName="custom-event.tsx"
            />
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">
          Available Components
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              CustomEvent
            </h3>
            <p className="text-muted-foreground">
              General-purpose event component that displays time range and title
              in a stacked layout. Works well across all calendar views.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              CustomMonthEvent
            </h3>
            <p className="text-muted-foreground">
              Optimized for month view where space is limited. Shows start time
              inline with the title for better space utilization.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              CustomWeekEvent
            </h3>
            <p className="text-muted-foreground">
              Optimized for week and day views with more vertical space.
              Displays time range and title stacked with enhanced readability.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              CustomAgendaEvent
            </h3>
            <p className="text-muted-foreground">
              Designed for agenda view list format. Shows time range in a
              fixed-width column alongside the event title for consistent
              alignment.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">Key Features</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-semibold">Time Formatting</h3>
            <p className="text-sm text-muted-foreground">
              Automatic 12-hour time format with AM/PM indicators. All-day
              events are handled gracefully.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Responsive Text</h3>
            <p className="text-sm text-muted-foreground">
              Text sizes are optimized for each view type to ensure readability
              at different zoom levels.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Truncation</h3>
            <p className="text-sm text-muted-foreground">
              Long event titles are truncated with ellipsis to prevent layout
              breaking in constrained spaces.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Theme Support</h3>
            <p className="text-sm text-muted-foreground">
              Works seamlessly with light and dark themes using Tailwind CSS and
              CSS variables.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .event-variant-primary {
          background-color: hsl(var(--primary)) !important;
          border-color: hsl(var(--primary)) !important;
          color: hsl(var(--primary-foreground)) !important;
        }

        .event-variant-secondary {
          background-color: hsl(var(--secondary)) !important;
          border-color: hsl(var(--secondary)) !important;
          color: hsl(var(--secondary-foreground)) !important;
        }

        .event-variant-outline {
          background-color: transparent !important;
          border: 2px solid hsl(var(--primary)) !important;
          color: hsl(var(--foreground)) !important;
        }
      `}</style>

      {/* Confirmation Modal */}
      {pendingChange && (
        <EventChangeConfirmationModal
          isOpen={true}
          onConfirm={handleConfirmChange}
          onCancel={handleCancelChange}
          eventTitle={pendingChange.event.title}
          oldStart={pendingChange.event.start}
          oldEnd={pendingChange.event.end}
          newStart={pendingChange.start}
          newEnd={pendingChange.end}
          changeType={pendingChange.type}
        />
      )}
    </main>
  );
}
