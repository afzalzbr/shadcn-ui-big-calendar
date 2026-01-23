// Main exports for the shadcn-big-calendar package
export { default as ShadcnBigCalendar } from "./components/shadcn-big-calendar";
export { EventForm, eventFormSchema } from "./components/event-form";
export type { EventFormData, EventFormProps } from "./components/event-form";
export {
  CustomEvent,
  CustomMonthEvent,
  CustomWeekEvent,
  CustomAgendaEvent,
} from "./components/event";
export { cn, getEventClassName } from "./utils";

// Re-export types from react-big-calendar for convenience
export type {
  CalendarProps,
  Event,
  SlotInfo,
  View,
  NavigateAction,
  EventPropGetter,
  SlotPropGetter,
  DayPropGetter,
} from "react-big-calendar";

export type {
  EventInteractionArgs,
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";

// Export the localizer setup utilities
export { momentLocalizer, dateFnsLocalizer, Views } from "react-big-calendar";

// Export drag and drop HOC
export { default as withDragAndDrop } from "react-big-calendar/lib/addons/dragAndDrop";

// Custom types for the library
export interface CalendarEvent<T = Record<string, any>> {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  data?: T;
}

export type EventVariant = "primary" | "secondary" | "outline";
