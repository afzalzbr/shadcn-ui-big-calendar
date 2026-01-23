# Enhanced Calendar Features

This document describes the new enhanced features added to the shadcn-big-calendar package.

## Features Overview

### 1. Custom className for Events
Each event can now have a custom `className` property for additional styling beyond the built-in variants.

### 2. Time Display with Event Names
New custom event components that show the time alongside event titles for better readability.

### 3. Generic Data Property
Events support a generic `data` prop to store custom metadata that can be used in modals or event handlers.

---

## Usage Examples

### Basic Usage with Custom className

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

const localizer = momentLocalizer(moment);

// Define events with custom className
const events: CalendarEvent[] = [
  {
    title: "Team Meeting",
    start: new Date(2024, 0, 15, 10, 0),
    end: new Date(2024, 0, 15, 11, 0),
    variant: "primary",
    className: "font-bold text-lg", // Custom styling
  },
  {
    title: "Client Call",
    start: new Date(2024, 0, 15, 14, 0),
    end: new Date(2024, 0, 15, 15, 0),
    variant: "secondary",
    className: "italic opacity-80", // Custom styling
  },
];

function MyCalendar() {
  return (
    <ShadcnBigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 600 }}
      eventPropGetter={getEventClassName} // Helper function applies variant + className
      components={{
        event: CustomEvent, // Shows time with event name
      }}
    />
  );
}
```

### Using Generic Data Property

```tsx
import type { CalendarEvent } from "shadcn-big-calendar";

// Define custom data type
interface MeetingData {
  attendees: string[];
  location: string;
  conferenceLink?: string;
}

// Create events with typed data
const events: CalendarEvent<MeetingData>[] = [
  {
    title: "Product Review",
    start: new Date(2024, 0, 15, 10, 0),
    end: new Date(2024, 0, 15, 11, 0),
    variant: "primary",
    data: {
      attendees: ["John Doe", "Jane Smith"],
      location: "Conference Room A",
      conferenceLink: "https://meet.example.com/abc-123",
    },
  },
];

function MyCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent<MeetingData> | null>(null);

  const handleSelectEvent = (event: CalendarEvent<MeetingData>) => {
    setSelectedEvent(event);
    // Access custom data
    console.log("Attendees:", event.data?.attendees);
    console.log("Location:", event.data?.location);
  };

  return (
    <>
      <ShadcnBigCalendar
        localizer={localizer}
        events={events}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={getEventClassName}
        components={{ event: CustomEvent }}
      />

      {selectedEvent && (
        <Dialog open={true} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p><strong>Location:</strong> {selectedEvent.data?.location}</p>
              <p><strong>Attendees:</strong></p>
              <ul>
                {selectedEvent.data?.attendees.map((attendee, i) => (
                  <li key={i}>{attendee}</li>
                ))}
              </ul>
              {selectedEvent.data?.conferenceLink && (
                <a href={selectedEvent.data.conferenceLink} target="_blank" rel="noopener noreferrer">
                  Join Meeting
                </a>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
```

### Custom Event Components by View

The library provides specialized event components optimized for different calendar views:

```tsx
import {
  CustomEvent,        // Default - works for all views
  CustomMonthEvent,   // Optimized for month view (inline time + title)
  CustomWeekEvent,    // Optimized for week/day views (stacked time + title)
  CustomAgendaEvent,  // Optimized for agenda view
} from "shadcn-big-calendar";

function MyCalendar() {
  return (
    <ShadcnBigCalendar
      localizer={localizer}
      events={events}
      eventPropGetter={getEventClassName}
      components={{
        month: {
          event: CustomMonthEvent,
        },
        week: {
          event: CustomWeekEvent,
        },
        day: {
          event: CustomWeekEvent,
        },
        agenda: {
          event: CustomAgendaEvent,
        },
      }}
    />
  );
}
```

### Manual eventPropGetter (without helper)

If you need more control, you can manually create the eventPropGetter:

```tsx
import { cn } from "shadcn-big-calendar";
import type { CalendarEvent } from "shadcn-big-calendar";

const eventPropGetter = (event: CalendarEvent) => {
  const variantClass = event.variant ? `event-variant-${event.variant}` : "";
  const customClass = event.className || "";

  return {
    className: cn(variantClass, customClass),
  };
};

<ShadcnBigCalendar
  eventPropGetter={eventPropGetter}
  // ...other props
/>
```

### Creating Events with Custom Data

When using the EventForm, you can extend it to capture custom data:

```tsx
import { EventForm, eventFormSchema } from "shadcn-big-calendar";
import { z } from "zod";

// Extend the schema
const customEventSchema = eventFormSchema.extend({
  location: z.string().optional(),
  attendees: z.array(z.string()).optional(),
});

type CustomEventFormData = z.infer<typeof customEventSchema>;

function MyEventForm({ start, end, onSubmit, onCancel }) {
  const handleSubmit = (formData: CustomEventFormData) => {
    const newEvent: CalendarEvent<{ location?: string; attendees?: string[] }> = {
      title: formData.title,
      start: new Date(formData.start),
      end: new Date(formData.end),
      variant: formData.variant,
      className: formData.className,
      data: {
        location: formData.location,
        attendees: formData.attendees,
      },
    };

    onSubmit(newEvent);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Your form fields including custom ones for location, attendees, etc. */}
    </Form>
  );
}
```

## API Reference

### CalendarEvent Interface

```typescript
interface CalendarEvent<T = Record<string, any>> {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  variant?: "primary" | "secondary" | "outline";
  className?: string;  // NEW: Custom CSS classes
  data?: T;           // NEW: Generic custom data
}
```

### Helper Functions

#### `getEventClassName(event)`
Combines variant-based styling with custom className.

**Parameters:**
- `event`: Event object with optional `variant` and `className` properties

**Returns:**
- Object with `className` property for use in `eventPropGetter`

**Example:**
```tsx
eventPropGetter={getEventClassName}
```

### Custom Event Components

#### `CustomEvent`
Default event component showing time and title in a vertical layout.

#### `CustomMonthEvent`
Optimized for month view with inline time and title display.

#### `CustomWeekEvent`
Optimized for week/day views with better spacing and readability.

#### `CustomAgendaEvent`
Simple title display for agenda view.

**Usage:**
```tsx
components={{
  event: CustomEvent,
}}
```

## Styling Tips

### Combining Variants with Custom Classes

```tsx
const events = [
  {
    title: "Important Meeting",
    variant: "primary",        // Base color scheme
    className: "font-bold",    // Additional styling
    // ...
  },
  {
    title: "Optional Event",
    variant: "outline",
    className: "opacity-60 italic",
    // ...
  },
];
```

### Using Tailwind Classes

You can use any Tailwind utility classes in the `className` prop:

```tsx
{
  title: "Urgent",
  className: "ring-2 ring-red-500 font-extrabold text-base",
  // ...
}
```

### Custom CSS Classes

You can also define custom CSS classes in your global CSS:

```css
.urgent-event {
  border-left: 4px solid red;
  font-weight: 700;
  animation: pulse 2s infinite;
}
```

```tsx
{
  title: "Critical Task",
  className: "urgent-event",
  // ...
}
```

## TypeScript Support

All new features are fully typed. Use generic types for custom data:

```typescript
import type { CalendarEvent } from "shadcn-big-calendar";

interface CustomData {
  priority: "low" | "medium" | "high";
  tags: string[];
}

const event: CalendarEvent<CustomData> = {
  title: "Task",
  start: new Date(),
  end: new Date(),
  data: {
    priority: "high",
    tags: ["urgent", "client"],
  },
};
```

## Migration Guide

### From Previous Version

If you're upgrading from a previous version:

1. The `CalendarEvent` interface is backward compatible - existing code will continue to work
2. To use new features, simply add `className` or `data` to your event objects
3. To show time with events, add custom event components via the `components` prop
4. Use `getEventClassName` helper for automatic className merging

**Before:**
```tsx
eventPropGetter={(event) => ({
  className: event.variant ? `event-variant-${event.variant}` : '',
})}
```

**After (with new features):**
```tsx
eventPropGetter={getEventClassName}
```

## Examples

See the main demo app for complete working examples:
- `/src/app/page.tsx` - Full calendar implementation
- `/lib/components/event.tsx` - Custom event component source
