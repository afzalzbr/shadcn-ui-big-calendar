"use client";

import { CodeBlock } from "@/components/code-block";
import { EventChangeConfirmationModal } from "@/components/event-change-confirmation-modal";
import ShadcnBigCalendar from "@/components/shadcn-big-calendar/shadcn-big-calendar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Code2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { ComponentType, useState } from "react";
import type { CalendarProps, View } from "react-big-calendar";
import { momentLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const DnDCalendar = withDragAndDrop<CalendarEvent>(
  ShadcnBigCalendar as ComponentType<CalendarProps<CalendarEvent>>
);
const localizer = momentLocalizer(moment);

type EventCategory = "meeting" | "task" | "reminder" | "break";

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  category: EventCategory;
  priority?: "high" | "medium" | "low";
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
    title: "Team Standup",
    start: createDate(0, 9, 0),
    end: createDate(0, 9, 30),
    category: "meeting",
    priority: "high",
  },
  {
    title: "Review PR #234",
    start: createDate(0, 10, 0),
    end: createDate(0, 11, 0),
    category: "task",
    priority: "high",
  },
  {
    title: "Coffee Break",
    start: createDate(0, 11, 0),
    end: createDate(0, 11, 15),
    category: "break",
  },
  {
    title: "Client Presentation",
    start: createDate(1, 14, 0),
    end: createDate(1, 15, 30),
    category: "meeting",
    priority: "high",
  },
  {
    title: "Update Documentation",
    start: createDate(1, 16, 0),
    end: createDate(1, 17, 0),
    category: "task",
    priority: "medium",
  },
  {
    title: "Follow up with Design Team",
    start: createDate(2, 10, 0),
    end: createDate(2, 10, 30),
    category: "reminder",
    priority: "medium",
  },
  {
    title: "Code Review Session",
    start: createDate(2, 13, 0),
    end: createDate(2, 14, 0),
    category: "meeting",
    priority: "medium",
  },
  {
    title: "Fix Bug #456",
    start: createDate(3, 9, 30),
    end: createDate(3, 11, 0),
    category: "task",
    priority: "high",
  },
  {
    title: "Lunch Break",
    start: createDate(3, 12, 0),
    end: createDate(3, 13, 0),
    category: "break",
  },
];

export default function CustomClassNameDemo() {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
  const [showCode, setShowCode] = useState(false);
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
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
    const classes: string[] = [];

    // Add category-based classes
    switch (event.category) {
      case "meeting":
        classes.push("event-meeting");
        break;
      case "task":
        classes.push("event-task");
        break;
      case "reminder":
        classes.push("event-reminder");
        break;
      case "break":
        classes.push("event-break");
        break;
    }

    // Add priority-based classes
    if (event.priority) {
      classes.push(`event-priority-${event.priority}`);
    }

    return {
      className: classes.join(" "),
    };
  };

  const codeExample = `// Define event type with custom properties
type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  category: "meeting" | "task" | "reminder" | "break";
  priority?: "high" | "medium" | "low";
};

// Use eventPropGetter to apply custom classes
const eventPropGetter: CalendarProps<CalendarEvent>["eventPropGetter"] = (event) => {
  const classes: string[] = [];

  // Add category-based classes
  switch (event.category) {
    case "meeting":
      classes.push("event-meeting");
      break;
    case "task":
      classes.push("event-task");
      break;
    case "reminder":
      classes.push("event-reminder");
      break;
    case "break":
      classes.push("event-break");
      break;
  }

  // Add priority-based classes
  if (event.priority) {
    classes.push(\`event-priority-\${event.priority}\`);
  }

  return {
    className: classes.join(" "),
  };
};

// Apply to calendar
<Calendar
  events={events}
  eventPropGetter={eventPropGetter}
  // ... other props
/>`;

  const cssExample = `/* Add these styles to your CSS file */

/* Category-based styles */
.event-meeting {
  background-color: hsl(var(--primary)) !important;
  border-color: hsl(var(--primary)) !important;
}

.event-task {
  background-color: hsl(var(--secondary)) !important;
  border-color: hsl(var(--secondary)) !important;
}

.event-reminder {
  background-color: hsl(142, 76%, 36%) !important;
  border-color: hsl(142, 76%, 36%) !important;
}

.event-break {
  background-color: hsl(262, 83%, 58%) !important;
  border-color: hsl(262, 83%, 58%) !important;
}

/* Priority-based styles */
.event-priority-high {
  border-left: 4px solid hsl(0, 84%, 60%) !important;
  font-weight: 600;
}

.event-priority-medium {
  border-left: 4px solid hsl(48, 96%, 53%) !important;
}

.event-priority-low {
  opacity: 0.8;
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
            Custom className Styling
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Apply custom CSS classes to events based on categories, priorities,
            or any custom logic
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Interactive Demo
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCode(!showCode)}
            >
              <Code2 className="mr-2 h-4 w-4" />
              {showCode ? "Hide Code" : "Show Code"}
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-card/50 p-4 space-y-3">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-semibold">Legend</h3>
            <p className="text-xs text-muted-foreground">
              {requireConfirmation
                ? "Confirmation modal enabled - drag or resize events to see the confirmation dialog"
                : "Immediate updates - drag or resize events for instant changes"}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-primary" />
              <span className="text-sm">Meeting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-secondary" />
              <span className="text-sm">Task</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded"
                style={{ backgroundColor: "hsl(142, 76%, 36%)" }}
              />
              <span className="text-sm">Reminder</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded"
                style={{ backgroundColor: "hsl(262, 83%, 58%)" }}
              />
              <span className="text-sm">Break</span>
            </div>
          </div>
          <div className="border-t pt-3 mt-3">
            <p className="text-sm text-muted-foreground mb-2">
              Priority Indicators:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-4 w-1 bg-red-500" />
                <span>High Priority (red border)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-4 w-1 bg-yellow-500" />
                <span>Medium Priority (yellow border)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">
                  Low Priority (dimmed)
                </span>
              </div>
            </div>
          </div>
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
            className="border-border border-rounded-md border-solid border-2 rounded-lg"
          />
        </div>
      </section>

      {showCode && (
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              Implementation Code
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  TypeScript & eventPropGetter
                </h3>
                <CodeBlock
                  code={codeExample}
                  language="tsx"
                  fileName="calendar.tsx"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">CSS Styles</h3>
                <CodeBlock
                  code={cssExample}
                  language="css"
                  fileName="styles.css"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-t pt-8 space-y-4 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">How It Works</h2>

        <div className="space-y-4 text-muted-foreground">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              1. Define Event Types
            </h3>
            <p>
              Extend your event interface with custom properties like category,
              priority, or any other metadata you need to style events
              dynamically.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              2. Implement eventPropGetter
            </h3>
            <p>
              The eventPropGetter function receives each event and returns an
              object with a className property. You can apply conditional logic
              to assign different classes based on event properties.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              3. Style with CSS or Tailwind
            </h3>
            <p>
              Define CSS rules for your custom classes. You can use Tailwind
              utilities, CSS variables from your theme, or custom CSS. The
              styles will be applied to events matching those classes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              4. Benefits
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Visual distinction between event types at a glance</li>
              <li>Priority highlighting for important events</li>
              <li>Full control over event appearance</li>
              <li>Easy integration with your design system</li>
              <li>Support for dark mode and theme switching</li>
            </ul>
          </div>
        </div>
      </section>

      <style jsx>{`
        .event-meeting {
          background-color: hsl(var(--primary)) !important;
          border-color: hsl(var(--primary)) !important;
        }

        .event-task {
          background-color: hsl(var(--secondary)) !important;
          border-color: hsl(var(--secondary)) !important;
        }

        .event-reminder {
          background-color: hsl(142, 76%, 36%) !important;
          border-color: hsl(142, 76%, 36%) !important;
        }

        .event-break {
          background-color: hsl(262, 83%, 58%) !important;
          border-color: hsl(262, 83%, 58%) !important;
        }

        .event-priority-high {
          border-left: 4px solid hsl(0, 84%, 60%) !important;
          font-weight: 600;
        }

        .event-priority-medium {
          border-left: 4px solid hsl(48, 96%, 53%) !important;
        }

        .event-priority-low {
          opacity: 0.8;
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
