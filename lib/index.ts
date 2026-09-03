// Main exports for the shadcn-big-calendar package
export {
  CustomAgendaEvent, CustomEvent,
  CustomMonthEvent,
  CustomWeekEvent
} from "./components/event";
export { EventForm, eventFormSchema } from "./components/event-form";
export type { EventFormData, EventFormProps } from "./components/event-form";
export { default as ShadcnBigCalendar } from "./components/shadcn-big-calendar";
export type { ShadcnBigCalendarProps } from "./components/shadcn-big-calendar";
export { cn, getEventClassName } from "./utils";

// Re-export all types from react-big-calendar
export type {
  CalendarProps,
  Components,
  Culture,
  DateCellWrapperProps,
  DateFormat,
  DateFormatFunction,
  DateHeaderProps,
  DateLocalizerSpec,
  DateRange,
  DateRangeFormatFunction,
  DayLayoutAlgorithm,
  DayLayoutFunction,
  DayPropGetter,
  DayProps,
  Event,
  EventPropGetter,
  EventProps,
  EventWrapperProps,
  FormatInput,
  Formats,
  HeaderProps,
  Messages,
  MoveOptions,
  NavigateAction,
  ResourceHeaderProps,
  SlotGroupPropGetter,
  SlotInfo,
  SlotPropGetter, stringOrDate, TimeGridProps,
  TitleOptions,
  ToolbarProps,
  View,
  ViewKey,
  ViewProps,
  ViewsProps,
  ViewStatic,
  WeekProps,
  WorkWeekProps
} from "react-big-calendar";

export type {
  DragAction,
  DragDirection,
  DragFromOutsideItemArgs,
  EventInteractionArgs,
  OnDragStartArgs,
  withDragAndDropProps
} from "react-big-calendar/lib/addons/dragAndDrop";

// Export the localizer setup utilities
export { dateFnsLocalizer, momentLocalizer, Views } from "react-big-calendar";

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
