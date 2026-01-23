"use client";

import ShadcnBigCalendar from "@/components/shadcn-big-calendar/shadcn-big-calendar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { ComponentType, useState } from "react";
import type { CalendarProps } from "react-big-calendar";
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
  const [events] = useState<CalendarEvent[]>(sampleEvents);
  const [showCode, setShowCode] = useState(false);

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
    <main className="container space-y-8 py-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/features">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Custom className Styling
          </h1>
          <p className="text-muted-foreground mt-2">
            Apply custom CSS classes to events based on categories, priorities, or any custom logic
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Interactive Demo</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCode(!showCode)}
          >
            <Code2 className="mr-2 h-4 w-4" />
            {showCode ? "Hide Code" : "Show Code"}
          </Button>
        </div>

        <div className="rounded-lg border bg-card/50 p-4 space-y-3">
          <h3 className="font-semibold">Legend</h3>
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
              <div className="h-4 w-4 rounded" style={{ backgroundColor: "hsl(142, 76%, 36%)" }} />
              <span className="text-sm">Reminder</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded" style={{ backgroundColor: "hsl(262, 83%, 58%)" }} />
              <span className="text-sm">Break</span>
            </div>
          </div>
          <div className="border-t pt-3 mt-3">
            <p className="text-sm text-muted-foreground mb-2">Priority Indicators:</p>
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
                <span className="text-muted-foreground">Low Priority (dimmed)</span>
              </div>
            </div>
          </div>
        </div>

        <DnDCalendar
          localizer={localizer}
          events={events}
          eventPropGetter={eventPropGetter}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          defaultView={Views.WEEK}
          className="border-border border-rounded-md border-solid border-2 rounded-lg"
        />
      </section>

      {showCode && (
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Implementation Code</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">TypeScript & eventPropGetter</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExample}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">CSS Styles</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{cssExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-t pt-8 space-y-4 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">How It Works</h2>

        <div className="space-y-4 text-muted-foreground">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">1. Define Event Types</h3>
            <p>
              Extend your event interface with custom properties like category, priority, or any other
              metadata you need to style events dynamically.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">2. Implement eventPropGetter</h3>
            <p>
              The eventPropGetter function receives each event and returns an object with a className
              property. You can apply conditional logic to assign different classes based on event properties.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">3. Style with CSS or Tailwind</h3>
            <p>
              Define CSS rules for your custom classes. You can use Tailwind utilities, CSS variables from
              your theme, or custom CSS. The styles will be applied to events matching those classes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">4. Benefits</h3>
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
    </main>
  );
}
