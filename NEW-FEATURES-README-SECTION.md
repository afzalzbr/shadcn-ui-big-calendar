# New Features - Add This to Main README

## Enhanced Event Features

### Custom Styling with className

Each event now supports a `className` property for custom styling beyond the built-in variants:

```tsx
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

New custom event components show the time alongside the event title:

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
- `CustomAgendaEvent` - For agenda view

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
  console.log(event.data?.attendees); // Type-safe access
};
```

### Helper Functions

**getEventClassName(event)**
Automatically merges variant styling with custom className:

```tsx
import { getEventClassName } from "shadcn-big-calendar";

<ShadcnBigCalendar
  eventPropGetter={getEventClassName}
  // No need to manually merge classes
/>
```

### Complete Example

```tsx
import {
  ShadcnBigCalendar,
  momentLocalizer,
  CustomEvent,
  getEventClassName,
  type CalendarEvent
} from "shadcn-big-calendar";
import "shadcn-big-calendar/styles";

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
        console.log(event.data?.location); // "Room A"
      }}
    />
  );
}
```

For detailed documentation, see [ENHANCED-FEATURES.md](./ENHANCED-FEATURES.md).
