# shadcn-big-calendar

A beautiful, accessible calendar component for React built on top of [React Big Calendar](https://github.com/jquense/react-big-calendar) with [Shadcn UI](https://ui.shadcn.com/) styling and theming support.

## Features

- **Shadcn UI Integration**: Seamlessly styled with Shadcn UI design tokens and CSS variables
- **Light/Dark Mode**: Built-in support for theme switching using CSS custom properties
- **Drag & Drop**: Full drag-and-drop and resize support for events
- **Confirmation Modal**: Optional confirmation dialog for drag/drop and resize operations
- **Multiple Views**: Month, week, work week, day, and agenda views
- **TypeScript**: Fully typed with comprehensive TypeScript definitions
- **Accessible**: WCAG 2.1 AA compliant with proper ARIA labels
- **Customizable**: Easy to customize with Tailwind CSS classes and variants
- **Tree-shakeable**: Optimized bundle size with proper ESM support
- **Custom Event Styling**: Add custom className to events for individual styling
- **Time Display**: Built-in event components that show time alongside event titles
- **Generic Data Props**: Store custom metadata with events using type-safe generics
- **Modern UI**: Subtle rounded corners (rounded-sm) for a clean, professional appearance

## Installation

```bash
npm install shadcn-big-calendar react-big-calendar
# or
yarn add shadcn-big-calendar react-big-calendar
# or
pnpm add shadcn-big-calendar react-big-calendar
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react react-dom clsx tailwind-merge
```

You'll also need a date library for the localizer (choose one):

```bash
# For moment.js (recommended for bundle size)
npm install moment

# OR for date-fns
npm install date-fns
```

## Quick Start

### Basic Usage with Moment.js

```tsx
import { ShadcnBigCalendar, momentLocalizer } from "shadcn-big-calendar";
import "shadcn-big-calendar/styles";
import moment from "moment";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Meeting",
    start: new Date(2024, 0, 15, 10, 0),
    end: new Date(2024, 0, 15, 11, 0),
  },
];

function MyCalendar() {
  return (
    <ShadcnBigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      height={600}
    />
  );
}
```

### Basic Usage with date-fns

```tsx
import { ShadcnBigCalendar, dateFnsLocalizer } from "shadcn-big-calendar";
import "shadcn-big-calendar/styles";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function MyCalendar() {
  return (
    <ShadcnBigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      height={600}
    />
  );
}
```

## Advanced Usage

### Drag and Drop with Event Variants

```tsx
"use client";

import { useState } from "react";
import {
  ShadcnBigCalendar,
  momentLocalizer,
  withDragAndDrop,
  CalendarEvent,
  type EventInteractionArgs,
} from "shadcn-big-calendar";
import "shadcn-big-calendar/styles";
import moment from "moment";

const DnDCalendar = withDragAndDrop(ShadcnBigCalendar);
const localizer = momentLocalizer(moment);

function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      title: "Team Meeting",
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 0),
      variant: "primary",
    },
    {
      title: "Lunch Break",
      start: new Date(2024, 0, 15, 12, 0),
      end: new Date(2024, 0, 15, 13, 0),
      variant: "secondary",
    },
    {
      title: "Code Review",
      start: new Date(2024, 0, 15, 14, 0),
      end: new Date(2024, 0, 15, 15, 0),
      variant: "outline",
    },
  ]);

  const handleEventDrop = ({ event, start, end }: EventInteractionArgs<CalendarEvent>) => {
    const updatedEvents = events.map((e) =>
      e === event ? { ...e, start: new Date(start), end: new Date(end) } : e
    );
    setEvents(updatedEvents);
  };

  const eventPropGetter = (event: CalendarEvent) => ({
    className: `event-variant-${event.variant ?? "primary"}`,
  });

  return (
    <DnDCalendar
      localizer={localizer}
      events={events}
      eventPropGetter={eventPropGetter}
      onEventDrop={handleEventDrop}
      onEventResize={handleEventDrop}
      resizable
      draggableAccessor={() => true}
      style={{ height: 600 }}
    />
  );
}
```

### Custom Event Form

For event creation and editing, you can use the provided `EventForm` component or create your own:

```tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { eventFormSchema, type EventFormData } from "shadcn-big-calendar";

function EventForm({ start, end, onSubmit, onCancel }) {
  const form = useForm({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      start: start.toISOString().slice(0, 16),
      end: end.toISOString().slice(0, 16),
      variant: "primary",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter event title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="variant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  {...field}
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                </select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </Form>
  );
}
```

## Enhanced Event Features

### Custom Styling with className

Each event supports a `className` property for custom styling beyond the built-in variants:

```tsx
import { getEventClassName } from "shadcn-big-calendar";

const events = [
  {
    title: "Important Meeting",
    start: new Date(2024, 0, 15, 10, 0),
    end: new Date(2024, 0, 15, 11, 0),
    variant: "primary",
    className: "font-bold text-lg", // Custom Tailwind classes
  }
];

<ShadcnBigCalendar
  events={events}
  eventPropGetter={getEventClassName} // Helper applies variant + className
/>
```

### Time Display with Event Names

Custom event components show the time alongside the event title:

```tsx
import { CustomEvent } from "shadcn-big-calendar";

<ShadcnBigCalendar
  events={events}
  components={{
    event: CustomEvent, // Shows "9:00 AM - 10:30 AM" with title
  }}
/>
```

**Available components:**
- `CustomEvent` - Default (works for all views)
- `CustomMonthEvent` - Optimized for month view
- `CustomWeekEvent` - Optimized for week/day views
- `CustomAgendaEvent` - For agenda view, displays time next to the event title.

### Generic Data Property

Store custom metadata with events using the generic `data` property:

```tsx
interface MeetingData {
  attendees: string[];
  location: string;
  conferenceLink?: string;
}

const events: CalendarEvent<MeetingData>[] = [
  {
    title: "Product Review",
    start: new Date(2024, 0, 15, 10, 0),
    end: new Date(2024, 0, 15, 11, 0),
    data: {
      attendees: ["John Doe", "Jane Smith"],
      location: "Conference Room A",
      conferenceLink: "https://meet.example.com/abc-123",
    },
  }
];

const handleSelectEvent = (event: CalendarEvent<MeetingData>) => {
  // Access custom data for your modal
  console.log(event.data?.attendees);
  console.log(event.data?.location);
};
```

### Drag & Drop with Confirmation Modal

Add an optional confirmation step before applying drag/drop or resize changes. This pattern is demonstrated in the feature demo pages and can be customized for your needs:

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
import "shadcn-big-calendar/styles";
import moment from "moment";

const DnDCalendar = withDragAndDrop(ShadcnBigCalendar);
const localizer = momentLocalizer(moment);

function CalendarWithConfirmation() {
  const [events, setEvents] = useState<CalendarEvent[]>([...]);
  const [requireConfirmation, setRequireConfirmation] = useState(false);
  const [pendingChange, setPendingChange] = useState<{
    event: CalendarEvent;
    start: Date;
    end: Date;
    type: "drag" | "resize";
  } | null>(null);

  const applyEventChange = (event: CalendarEvent, start: Date, end: Date) => {
    setEvents(prevEvents =>
      prevEvents.map(ev =>
        ev.title === event.title && ev.start.getTime() === event.start.getTime()
          ? { ...ev, start, end }
          : ev
      )
    );
  };

  const handleEventDrop = ({ event, start, end }: EventInteractionArgs<CalendarEvent>) => {
    const startDate = typeof start === 'string' ? new Date(start) : start;
    const endDate = typeof end === 'string' ? new Date(end) : end;

    if (requireConfirmation) {
      setPendingChange({ event, start: startDate, end: endDate, type: "drag" });
    } else {
      applyEventChange(event, startDate, endDate);
    }
  };

  const handleEventResize = ({ event, start, end }: EventInteractionArgs<CalendarEvent>) => {
    const startDate = typeof start === 'string' ? new Date(start) : start;
    const endDate = typeof end === 'string' ? new Date(end) : end;

    if (requireConfirmation) {
      setPendingChange({ event, start: startDate, end: endDate, type: "resize" });
    } else {
      applyEventChange(event, startDate, endDate);
    }
  };

  return (
    <>
      {/* Toggle for confirmation mode */}
      <div className="flex items-center gap-2 mb-4">
        <Switch
          checked={requireConfirmation}
          onCheckedChange={setRequireConfirmation}
        />
        <label>Require Confirmation</label>
      </div>

      <DnDCalendar
        localizer={localizer}
        events={events}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        resizable
        style={{ height: 600 }}
      />

      {/* Your custom confirmation modal component */}
      {pendingChange && (
        <YourConfirmationModal
          isOpen={true}
          eventTitle={pendingChange.event.title}
          oldStart={pendingChange.event.start}
          oldEnd={pendingChange.event.end}
          newStart={pendingChange.start}
          newEnd={pendingChange.end}
          changeType={pendingChange.type}
          onConfirm={() => {
            applyEventChange(pendingChange.event, pendingChange.start, pendingChange.end);
            setPendingChange(null);
          }}
          onCancel={() => setPendingChange(null)}
        />
      )}
    </>
  );
}
```

See the [interactive demos](https://shadcn-big-calendar.vercel.app/features) for a complete working example with a confirmation modal implementation.

### Complete Example with All Features

```tsx
import {
  ShadcnBigCalendar,
  momentLocalizer,
  CustomEvent,
  getEventClassName,
  type CalendarEvent
} from "shadcn-big-calendar";
import "shadcn-big-calendar/styles";
import moment from "moment";

interface CustomData {
  location: string;
  attendees: string[];
}

const events: CalendarEvent<CustomData>[] = [
  {
    title: "Team Meeting",
    start: new Date(2024, 0, 15, 10, 0),
    end: new Date(2024, 0, 15, 11, 0),
    variant: "primary",
    className: "font-semibold",
    data: {
      location: "Room A",
      attendees: ["John", "Jane"]
    }
  }
];

function MyCalendar() {
  return (
    <ShadcnBigCalendar
      localizer={momentLocalizer(moment)}
      events={events}
      eventPropGetter={getEventClassName}
      components={{ event: CustomEvent }}
      onSelectEvent={(event) => {
        // Open your custom modal with event.data
        console.log(event.data?.location); // "Room A"
      }}
    />
  );
}
```

## Styling & Customization

### Event Variants

The package supports three built-in event variants:

- `primary`: Uses your theme's primary color
- `secondary`: Uses your theme's secondary color
- `outline`: Uses a transparent background with border

```tsx
const events = [
  { title: "Important", variant: "primary", /* ... */ },
  { title: "Regular", variant: "secondary", /* ... */ },
  { title: "Optional", variant: "outline", /* ... */ },
];
```

### Theming

The calendar uses CSS custom properties from Shadcn UI. Make sure your project has the following CSS variables defined:

```css
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
  /* ... other dark mode variables ... */
}
```

### Custom CSS Overrides

You can override the default styles by targeting the calendar classes:

```css
.rbc-calendar {
  /* Custom styles */
}

.rbc-event {
  /* Custom event styles */
}

.rbc-toolbar {
  /* Custom toolbar styles */
}
```

## TypeScript Support

The package is fully typed with comprehensive TypeScript definitions. All `react-big-calendar` types are re-exported directly — no separate import from `react-big-calendar` needed:

```tsx
import type {
  CalendarEvent,
  CalendarProps,
  EventPropGetter,
  SlotInfo,
  EventInteractionArgs,
  ToolbarProps,
  Components,
  Formats,
  Messages,
  DragAction,
  OnDragStartArgs,
} from "shadcn-big-calendar";

// Your typed event interface
interface MyEvent extends CalendarEvent {
  id: string;
  description?: string;
  location?: string;
}

const eventPropGetter: EventPropGetter<MyEvent> = (event) => ({
  className: `event-variant-${event.variant}`,
  style: {
    /* custom styles */
  },
});
```

## API Reference

### ShadcnBigCalendar Props

This component accepts all props from [React Big Calendar](https://github.com/jquense/react-big-calendar#react-big-calendar-documentation). See the React Big Calendar documentation for the full API.

It also adds two optional sizing props:

```tsx
<ShadcnBigCalendar height={700} rowHeight={60} />
```

- `height?: React.CSSProperties["height"]` sets the calendar height without requiring `style={{ height: ... }}`.
- If both `height` and `style.height` are provided, `style.height` takes precedence.
- `rowHeight?: number | string` sets the height of each time-slot row in the Week/Day views (a number is treated as pixels). Defaults to react-big-calendar's built-in 40px row height — increase it for taller, easier-to-read time slots.
- When using `withDragAndDrop`, `style.height` is still the most TypeScript-friendly option because the upstream HOC does not preserve custom wrapper props.

### CalendarEvent Interface

```tsx
interface CalendarEvent<T = Record<string, any>> {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  variant?: "primary" | "secondary" | "outline";
  className?: string;  // Custom CSS classes for individual event styling
  data?: T;            // Generic data for custom modal content
}
```

### Event Form Schema

```tsx
const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  start: z.string(),
  end: z.string(),
  variant: z.enum(["primary", "secondary", "outline"]),
});
```

## Interactive Feature Demos

The package includes comprehensive interactive demo pages showcasing all features:

- **Custom className Styling** - `/features/custom-classname`
  - Examples of applying custom Tailwind classes to events
  - Dynamic class toggling
  - Code snippets showing implementation

- **Time Display Components** - `/features/time-display`
  - Demonstration of `CustomEvent`, `CustomMonthEvent`, `CustomWeekEvent`, and `CustomAgendaEvent`
  - View switching to see different components in action
  - Side-by-side comparisons

- **Data Props & Custom Modals** - `/features/data-props`
  - Type-safe generic data properties
  - Custom modal integration with event data
  - Rich event metadata examples (attendees, location, conference links)

Visit the live demos at [https://shadcn-big-calendar.vercel.app/features](https://shadcn-big-calendar.vercel.app/features)

## Demo

Check out the live demo at [https://shadcn-big-calendar.vercel.app/](https://shadcn-big-calendar.vercel.app/)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request at [https://github.com/list-jonas/shadcn-ui-big-calendar](https://github.com/list-jonas/shadcn-ui-big-calendar).

## License

MIT

## Acknowledgments

- [React Big Calendar](https://github.com/jquense/react-big-calendar) - The underlying calendar component
- [Shadcn UI](https://ui.shadcn.com/) - Design system and component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
