# Usage Guide for shadcn-big-calendar

This guide provides comprehensive examples for using the shadcn-big-calendar package in your React applications.

This guide focuses on portable, reusable calendar patterns. State management choices (Redux, Zustand, context, local state) are intentionally left to your app.

## Placeholder Quick Map

The advanced sections use `userDefined...` placeholders so you can plug in your own app logic.

| Placeholder | Replace With |
|-------------|---------------|
| `userDefinedTimezone` | User preference, tenant setting, or timezone from profile/context |
| `userDefinedStatusClassNames` | Your status-to-class mapping object |
| `userDefinedFilters` | Your filter config and defaults |
| `userDefined...Format` | Your preferred localizer format strings/functions |
| `userDefinedDrilldownView` | The drilldown view that fits your UX |
| `userDefinedEvent...` | Your own event IDs, labels, dates, metadata, and optional custom payload |

## Installation

```bash
npm install shadcn-big-calendar react-big-calendar react react-dom clsx tailwind-merge
```

Choose a date library:

```bash
# For moment.js
npm install moment

# Optional: for timezone-aware scheduling
npm install moment-timezone

# OR for date-fns
npm install date-fns
```

## Basic Setup

### 1. Import Styles

In your root layout or main CSS file:

```tsx
// app/layout.tsx or _app.tsx
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"; // Optional: only for withDragAndDrop
import "shadcn-big-calendar/styles";
```

### 2. Configure Shadcn UI CSS Variables

Ensure your `globals.css` includes Shadcn UI CSS variables:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
```

## Complete Examples

### Example 1: Basic Calendar

```tsx
"use client";

import { ShadcnBigCalendar, momentLocalizer } from "shadcn-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Team Standup",
    start: new Date(2024, 0, 15, 9, 0),
    end: new Date(2024, 0, 15, 9, 30),
  },
  {
    title: "Product Demo",
    start: new Date(2024, 0, 16, 14, 0),
    end: new Date(2024, 0, 16, 15, 0),
  },
];

export default function BasicCalendar() {
  return (
    <div className="h-screen p-4">
      <ShadcnBigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
}
```

### Example 2: Interactive Calendar with State

```tsx
"use client";

import { useState } from "react";
import { ShadcnBigCalendar, momentLocalizer, Views } from "shadcn-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function InteractiveCalendar() {
  const [events, setEvents] = useState([
    {
      title: "Meeting",
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 0),
    },
  ]);
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
    }
  };

  const handleSelectEvent = (event) => {
    alert(`Event: ${event.title}`);
  };

  return (
    <div className="h-screen p-4">
      <ShadcnBigCalendar
        localizer={localizer}
        events={events}
        view={view}
        date={date}
        onView={setView}
        onNavigate={setDate}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        selectable
        style={{ height: "100%" }}
      />
    </div>
  );
}
```

### Controlled vs Uncontrolled Calendar State

Use controlled state when your calendar must stay in sync with external UI (date jumpers, toolbars, side panels, URL state).

```tsx
// Controlled
const [date, setDate] = useState(new Date());
const [view, setView] = useState(Views.WEEK);

<ShadcnBigCalendar
  localizer={localizer}
  events={events}
  date={date}
  view={view}
  onNavigate={setDate}
  onView={setView}
/>;

// Uncontrolled
<ShadcnBigCalendar
  localizer={localizer}
  events={events}
  defaultDate={new Date()}
/>;
```

### Example 3: Drag and Drop Calendar

```tsx
"use client";

import { useState } from "react";
import {
  ShadcnBigCalendar,
  momentLocalizer,
  withDragAndDrop,
  type CalendarEvent,
  type EventInteractionArgs,
} from "shadcn-big-calendar";
import moment from "moment";

const DnDCalendar = withDragAndDrop(ShadcnBigCalendar);
const localizer = momentLocalizer(moment);

export default function DragDropCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      title: "Design Review",
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 0),
      variant: "primary",
    },
    {
      title: "Lunch",
      start: new Date(2024, 0, 15, 12, 0),
      end: new Date(2024, 0, 15, 13, 0),
      variant: "secondary",
    },
  ]);

  const handleEventDrop = ({
    event,
    start,
    end,
  }: EventInteractionArgs<CalendarEvent>) => {
    const updatedEvents = events.map((e) =>
      e === event ? { ...e, start: new Date(start), end: new Date(end) } : e
    );
    setEvents(updatedEvents);
  };

  const handleEventResize = ({
    event,
    start,
    end,
  }: EventInteractionArgs<CalendarEvent>) => {
    const updatedEvents = events.map((e) =>
      e === event ? { ...e, start: new Date(start), end: new Date(end) } : e
    );
    setEvents(updatedEvents);
  };

  const eventPropGetter = (event: CalendarEvent) => ({
    className: `event-variant-${event.variant ?? "primary"}`,
  });

  return (
    <div className="h-screen p-4">
      <DnDCalendar
        localizer={localizer}
        events={events}
        eventPropGetter={eventPropGetter}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        resizable
        draggableAccessor={() => true}
        style={{ height: "100%" }}
      />
    </div>
  );
}
```

### Example 4: Custom Event Components

```tsx
"use client";

import {
  ShadcnBigCalendar,
  momentLocalizer,
  type CalendarEvent,
} from "shadcn-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

// Custom event component
const CustomEvent = ({ event }: { event: CalendarEvent }) => (
  <div className="flex items-center gap-2">
    <div className="w-2 h-2 rounded-full bg-current" />
    <span className="font-medium">{event.title}</span>
  </div>
);

export default function CustomEventCalendar() {
  const events = [
    {
      title: "Team Sync",
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 0),
      variant: "primary",
    },
  ];

  return (
    <div className="h-screen p-4">
      <ShadcnBigCalendar
        localizer={localizer}
        events={events}
        components={{
          event: CustomEvent,
        }}
        style={{ height: "100%" }}
      />
    </div>
  );
}
```

### Example 5: With Dialog for Event Creation

```tsx
"use client";

import { useState } from "react";
import {
  ShadcnBigCalendar,
  momentLocalizer,
  type SlotInfo,
} from "shadcn-big-calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import moment from "moment";

const localizer = momentLocalizer(moment);

export default function CalendarWithDialog() {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [eventTitle, setEventTitle] = useState("");

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleCreateEvent = () => {
    if (eventTitle && selectedSlot) {
      setEvents([
        ...events,
        {
          title: eventTitle,
          start: selectedSlot.start,
          end: selectedSlot.end,
        },
      ]);
      setSelectedSlot(null);
      setEventTitle("");
    }
  };

  return (
    <div className="h-screen p-4">
      <ShadcnBigCalendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: "100%" }}
      />

      <Dialog
        open={selectedSlot !== null}
        onOpenChange={() => setSelectedSlot(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Event title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedSlot(null)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEvent}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

## Advanced Portable Patterns

### Timezone-Aware Calendars

```tsx
"use client";

import { ShadcnBigCalendar, momentLocalizer } from "shadcn-big-calendar";
import moment from "moment-timezone";

const timezone = userDefinedTimezone ?? moment.tz.guess();
const localizer = momentLocalizer(moment);

moment.tz.setDefault(timezone);

export default function TimezoneCalendar() {
  const defaultDate = moment().tz(timezone).toDate();

  return (
    <div className="h-screen p-4">
      <ShadcnBigCalendar
        localizer={localizer}
        events={events}
        defaultDate={defaultDate}
      />
    </div>
  );
}
```

If you do not store a timezone yet, use `moment.tz.guess()` as a fallback.

### Navigation Sync with External State

```tsx
const [date, setDate] = useState(new Date());
const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

const handleNavigate = (nextDate: Date) => {
  setDate(nextDate);
  setSelectedSlot(null); // Clear stale slot selection on navigation
  // Optional: trigger range-based loading here using nextDate + current view
};

<ShadcnBigCalendar
  localizer={localizer}
  events={events}
  date={date}
  onNavigate={handleNavigate}
/>;
```

### Day and Event Styling with Getter Callbacks

```tsx
import { useState } from "react";
import type {
  CalendarEvent,
  DayPropGetter,
  EventPropGetter,
} from "shadcn-big-calendar";

type AppointmentEvent = CalendarEvent<{
  status?: string;
}>;

const [selectedDay, setSelectedDay] = useState<Date | null>(null);
const [visibleDate, setVisibleDate] = useState(new Date());

const dayPropGetter: DayPropGetter = (date) => {
  const isSelected =
    selectedDay != null &&
    date.getDate() === selectedDay.getDate() &&
    date.getMonth() === selectedDay.getMonth() &&
    date.getFullYear() === selectedDay.getFullYear();

  const outOfMonth =
    date.getMonth() !== visibleDate.getMonth() ||
    date.getFullYear() !== visibleDate.getFullYear();

  return {
    style: {
      backgroundColor: isSelected ? "hsl(var(--accent))" : undefined,
      color: isSelected ? "hsl(var(--accent-foreground))" : undefined,
      opacity: outOfMonth ? 0.45 : 1,
      pointerEvents: outOfMonth ? "none" : "auto",
    },
  };
};

const eventPropGetter: EventPropGetter<AppointmentEvent> = (event) => {
  const status = event.data?.status;
  const statusClassNames = userDefinedStatusClassNames as Record<string, string>;

  return status ? { className: statusClassNames[status] ?? "" } : {};
};

<ShadcnBigCalendar
  localizer={localizer}
  events={events}
  dayPropGetter={dayPropGetter}
  eventPropGetter={eventPropGetter}
  onNavigate={setVisibleDate}
/>;
```

### Slot Styling with slotPropGetter

```tsx
import type { SlotPropGetter } from "shadcn-big-calendar";

const slotPropGetter: SlotPropGetter = (date) => {
  if (shouldDimSlot(date)) {
    return {
      className: "opacity-50",
      style: { pointerEvents: "none" },
    };
  }

  return {};
};

<ShadcnBigCalendar
  localizer={localizer}
  events={events}
  slotPropGetter={slotPropGetter}
/>;
```

### Filter Events Without Refetch

```tsx
import { useMemo, useState } from "react";
import type { CalendarEvent } from "shadcn-big-calendar";

type Status = string;

type StatusEvent = CalendarEvent<{
  status?: Status;
}>;

const [filters, setFilters] = useState<Record<Status, boolean>>(userDefinedFilters);

const filteredEvents = useMemo(
  () =>
    events.filter(
      (event: StatusEvent) => !!event.data?.status && !!filters[event.data.status]
    ),
  [events, filters]
);

<ShadcnBigCalendar localizer={localizer} events={filteredEvents} />;
```

For very large datasets, prefer server range loading on `onNavigate` rather than filtering only in the browser.

### Load Events for Visible Range

```tsx
import { useEffect, useState } from "react";
import { Views, type View } from "shadcn-big-calendar";

const [date, setDate] = useState(new Date());
const [view, setView] = useState<View>(Views.WEEK);

const getVisibleRange = (currentDate: Date, currentView: View) =>
  userDefinedRangeCalculator(currentDate, currentView);

useEffect(() => {
  const { start, end } = getVisibleRange(date, view);
  userDefinedLoadEvents({ start, end, view });
}, [date, view]);

<ShadcnBigCalendar
  localizer={localizer}
  events={events}
  date={date}
  view={view}
  onNavigate={setDate}
  onView={setView}
/>;
```

### Slot Selection for Scheduling (No Immediate Event Creation)

```tsx
import { useState } from "react";
import { ShadcnBigCalendar, type SlotInfo } from "shadcn-big-calendar";

const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

const handleSelectSlot = (slotInfo: SlotInfo) => {
  if (slotInfo.start < new Date()) return; // Example validation
  setSelectedSlot(slotInfo);
  // Open your scheduling modal/drawer with slotInfo.start and slotInfo.end
};

<ShadcnBigCalendar
  localizer={localizer}
  events={events}
  selectable
  onSelectSlot={handleSelectSlot}
/>;
```

### Date and Time Format Customization

```tsx
const formats = {
  timeGutterFormat: userDefinedTimeGutterFormat,
  monthHeaderFormat: userDefinedMonthHeaderFormat,
  dayHeaderFormat: userDefinedDayHeaderFormat,
  dayRangeHeaderFormat: userDefinedDayRangeHeaderFormat,
  dayFormat: userDefinedDayFormat,
  weekdayFormat: userDefinedWeekdayFormat,
};

<ShadcnBigCalendar localizer={localizer} events={events} formats={formats} />;
```

### Conditional Month Drilldown

```tsx
import { Views, type View } from "shadcn-big-calendar";

const [view, setView] = useState<View>(Views.MONTH);
const [visibleDate, setVisibleDate] = useState(new Date());

const getDrilldownView = (date: Date) => {
  const sameMonth =
    date.getMonth() === visibleDate.getMonth() &&
    date.getFullYear() === visibleDate.getFullYear();

  return sameMonth ? userDefinedDrilldownView : null;
};

<ShadcnBigCalendar
  localizer={localizer}
  events={events}
  view={view}
  onView={setView}
  onNavigate={setVisibleDate}
  getDrilldownView={getDrilldownView}
/>;
```

### Mapping Your Domain Event Shape

```tsx
type RawEvent = {
  id: string;
  label: string;
  startsAt: string;
  endsAt: string;
  metadata?: Record<string, unknown>;
};

const mapToCalendarEvent = (item: RawEvent): CalendarEvent => ({
  title: item.label,
  start: new Date(item.startsAt),
  end: new Date(item.endsAt),
  data: {
    id: item.id,
    ...item.metadata,
  },
});

const events = userDefinedRawEvents.map(mapToCalendarEvent);
```

## Event Variants

Use the built-in variants for different event styles:

```tsx
const events = [
  {
    title: "High Priority",
    variant: "primary", // Blue primary color
    start: new Date(2024, 0, 15, 10, 0),
    end: new Date(2024, 0, 15, 11, 0),
  },
  {
    title: "Medium Priority",
    variant: "secondary", // Gray secondary color
    start: new Date(2024, 0, 15, 14, 0),
    end: new Date(2024, 0, 15, 15, 0),
  },
  {
    title: "Optional",
    variant: "outline", // Transparent with border
    start: new Date(2024, 0, 16, 9, 0),
    end: new Date(2024, 0, 16, 10, 0),
  },
];
```

## Styling Tips

### Custom Event Styles

```css
/* Add to your global CSS */
.rbc-event.custom-class {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}
```

### Responsive Calendar

```tsx
<div className="h-[400px] md:h-[600px] lg:h-screen">
  <ShadcnBigCalendar
    localizer={localizer}
    events={events}
    style={{ height: "100%" }}
  />
</div>
```

## TypeScript Tips

### Extending CalendarEvent

```tsx
import type { CalendarEvent } from "shadcn-big-calendar";

interface MyEvent extends CalendarEvent {
  id: string;
  resourceId?: string;
  type?: string;
  status?: string;
  description?: string;
  location?: string;
  attendees?: string[];
  data?: {
    [key: string]: unknown;
  };
}

const events: MyEvent[] = [
  {
    id: userDefinedEventId,
    title: userDefinedEventTitle,
    start: userDefinedEventStart,
    end: userDefinedEventEnd,
    resourceId: userDefinedResourceId,
    type: userDefinedEventType,
    status: userDefinedEventStatus,
    description: userDefinedEventDescription,
    location: userDefinedEventLocation,
    attendees: userDefinedEventAttendees,
    data: userDefinedEventData,
  },
];
```

## Common Issues

### CSS Variables Not Working

Make sure you've imported the styles in the correct order:

```tsx
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"; // Optional: only for withDragAndDrop
import "shadcn-big-calendar/styles"; // Should be last
```

### Events Not Showing

Ensure your events have valid `start` and `end` dates:

```tsx
// ✅ Correct
const events = [
  {
    title: "Event",
    start: new Date(2024, 0, 15, 10, 0),
    end: new Date(2024, 0, 15, 11, 0),
  },
];

// ❌ Incorrect
const events = [
  {
    title: "Event",
    start: "2024-01-15",
    end: "2024-01-15",
  },
];
```

### Dark Mode Not Working

Ensure your theme provider is set up correctly:

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Next Steps

- API parity note: `events`, `localizer`, `views`, `date/defaultDate`, `onNavigate`, `onView`, `onSelectSlot`, and `components` follow react-big-calendar behavior. The wrapper primarily adds style defaults and utility exports.
- Migrate existing `react-big-calendar` screens with mostly 1:1 props (`events`, `localizer`, `views`, `onSelectSlot`, `onNavigate`) and then layer styling/custom components.
- Explore the [React Big Calendar documentation](https://github.com/jquense/react-big-calendar) for advanced features
- Check out the [Shadcn UI documentation](https://ui.shadcn.com/) for component customization
- See the complete demo at [https://shadcn-ui-big-calendar.vercel.app/](https://shadcn-ui-big-calendar.vercel.app/)
