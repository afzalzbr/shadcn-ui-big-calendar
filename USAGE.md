# Usage Guide for shadcn-big-calendar

This guide provides comprehensive examples for using the shadcn-big-calendar package in your React applications.

## Installation

```bash
npm install shadcn-big-calendar react-big-calendar react react-dom clsx tailwind-merge
```

Choose a date library:

```bash
# For moment.js
npm install moment

# OR for date-fns
npm install date-fns
```

## Basic Setup

### 1. Import Styles

In your root layout or main CSS file:

```tsx
// app/layout.tsx or _app.tsx
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
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

  const handleEventDrop = ({ event, start, end }: EventInteractionArgs<CalendarEvent>) => {
    const updatedEvents = events.map((e) =>
      e === event ? { ...e, start: new Date(start), end: new Date(end) } : e
    );
    setEvents(updatedEvents);
  };

  const handleEventResize = ({ event, start, end }: EventInteractionArgs<CalendarEvent>) => {
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

import { ShadcnBigCalendar, momentLocalizer, type CalendarEvent } from "shadcn-big-calendar";
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
import { ShadcnBigCalendar, momentLocalizer, type SlotInfo } from "shadcn-big-calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

      <Dialog open={selectedSlot !== null} onOpenChange={() => setSelectedSlot(null)}>
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
  description?: string;
  location?: string;
  attendees?: string[];
}

const events: MyEvent[] = [
  {
    id: "1",
    title: "Meeting",
    start: new Date(),
    end: new Date(),
    description: "Quarterly review",
    location: "Conference Room A",
    attendees: ["john@example.com", "jane@example.com"],
  },
];
```

## Common Issues

### CSS Variables Not Working

Make sure you've imported the styles in the correct order:

```tsx
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
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

- Explore the [React Big Calendar documentation](https://github.com/jquense/react-big-calendar) for advanced features
- Check out the [Shadcn UI documentation](https://ui.shadcn.com/) for component customization
- See the complete demo at [https://shadcn-ui-big-calendar.vercel.app/](https://shadcn-ui-big-calendar.vercel.app/)
