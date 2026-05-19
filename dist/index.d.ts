import * as react_jsx_runtime from 'react/jsx-runtime';
import { EventProps, CalendarProps } from 'react-big-calendar';
export { CalendarProps, Components, Culture, DateCellWrapperProps, DateFormat, DateFormatFunction, DateHeaderProps, DateLocalizerSpec, DateRange, DateRangeFormatFunction, DayLayoutAlgorithm, DayLayoutFunction, DayPropGetter, DayProps, Event, EventPropGetter, EventProps, EventWrapperProps, FormatInput, Formats, HeaderProps, Messages, MoveOptions, NavigateAction, ResourceHeaderProps, SlotGroupPropGetter, SlotInfo, SlotPropGetter, TimeGridProps, TitleOptions, ToolbarProps, View, ViewKey, ViewProps, ViewStatic, Views, ViewsProps, WeekProps, WorkWeekProps, dateFnsLocalizer, momentLocalizer, stringOrDate } from 'react-big-calendar';
import * as z from 'zod';
import { ComponentType } from 'react';
import { ClassValue } from 'clsx';
export { DragAction, DragDirection, DragFromOutsideItemArgs, EventInteractionArgs, OnDragStartArgs, default as withDragAndDrop, withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';

/**
 * Custom Event Component for ShadcnBigCalendar
 *
 * This component displays events with time information alongside the event title.
 * It supports custom className prop for additional styling and respects the variant-based styling.
 *
 * @example
 * ```tsx
 * <ShadcnBigCalendar
 *   localizer={localizer}
 *   events={events}
 *   components={{
 *     event: CustomEvent,
 *   }}
 * />
 * ```
 */
declare function CustomEvent<T = Record<string, any>>({ event }: EventProps<T & {
    className?: string;
}>): react_jsx_runtime.JSX.Element;
/**
 * Month Event Component
 *
 * Optimized for month view where space is limited.
 * Shows time inline with title for better space utilization.
 */
declare function CustomMonthEvent<T = Record<string, any>>({ event }: EventProps<T & {
    className?: string;
}>): react_jsx_runtime.JSX.Element;
/**
 * Week/Day Event Component
 *
 * Optimized for week and day views where there's more vertical space.
 * Shows time and title stacked for better readability.
 */
declare function CustomWeekEvent<T = Record<string, any>>({ event }: EventProps<T & {
    className?: string;
}>): react_jsx_runtime.JSX.Element;
/**
 * Agenda Event Component
 *
 * Optimized for agenda view where events are displayed in a list format.
 */
declare function CustomAgendaEvent<T = Record<string, any>>({ event, }: EventProps<T & {
    className?: string;
}>): react_jsx_runtime.JSX.Element;

/**
 * Event Form Schema
 *
 * Validation schema for calendar event creation/editing.
 * Supports optional className for custom styling.
 */
declare const eventFormSchema: z.ZodObject<{
    title: z.ZodString;
    start: z.ZodString;
    end: z.ZodString;
    variant: z.ZodEnum<["primary", "secondary", "outline"]>;
    className: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    start: string;
    end: string;
    variant: "primary" | "secondary" | "outline";
    className?: string | undefined;
}, {
    title: string;
    start: string;
    end: string;
    variant: "primary" | "secondary" | "outline";
    className?: string | undefined;
}>;
type EventFormData = z.infer<typeof eventFormSchema>;
/**
 * EventForm Component Props
 */
type EventFormProps = {
    start: Date;
    end: Date;
    onSubmit: (data: EventFormData) => void;
    onCancel: () => void;
    /** Custom button component - should accept standard button props */
    ButtonComponent?: React.ComponentType<any>;
    /** Custom form components - pass your shadcn/ui form components */
    FormComponents?: {
        Form: React.ComponentType<any>;
        FormControl: React.ComponentType<any>;
        FormField: React.ComponentType<any>;
        FormItem: React.ComponentType<any>;
        FormLabel: React.ComponentType<any>;
    };
    /** Custom input component - should accept standard input props */
    InputComponent?: React.ComponentType<any>;
};
/**
 * EventForm Component
 *
 * A form component for creating and editing calendar events. This is an optional
 * component that integrates with react-hook-form and zod validation.
 *
 * Note: This component requires the following peer dependencies:
 * - react-hook-form
 * - @hookform/resolvers
 * - zod
 *
 * You must also provide your own Shadcn UI components (Button, Form, Input) or
 * similar components through the props.
 *
 * @example
 * ```tsx
 * import { EventForm } from "shadcn-big-calendar";
 * import { Button } from "@/components/ui/button";
 * import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
 * import { Input } from "@/components/ui/input";
 *
 * function MyEventDialog({ start, end, onSubmit, onCancel }) {
 *   return (
 *     <EventForm
 *       start={start}
 *       end={end}
 *       onSubmit={onSubmit}
 *       onCancel={onCancel}
 *       ButtonComponent={Button}
 *       InputComponent={Input}
 *       FormComponents={{
 *         Form,
 *         FormControl,
 *         FormField,
 *         FormItem,
 *         FormLabel,
 *       }}
 *     />
 *   );
 * }
 * ```
 */
declare function EventForm({ start, end, onSubmit, onCancel, ButtonComponent, InputComponent, FormComponents, }: EventFormProps): react_jsx_runtime.JSX.Element;

/**
 * ShadcnBigCalendar Component
 *
 * A wrapper around React Big Calendar with Shadcn UI styling and theming support.
 * Supports light/dark mode through CSS custom properties and integrates seamlessly
 * with Shadcn UI design system.
 *
 * Features:
 * - Custom className support for individual events
 * - Generic data prop for storing custom event data
 * - Event variant styling (primary, secondary, outline)
 * - Time display with event names
 *
 * @example
 * ```tsx
 * import { ShadcnBigCalendar, momentLocalizer, CustomEvent } from "shadcn-big-calendar";
 * import moment from "moment";
 *
 * const localizer = momentLocalizer(moment);
 *
 * function MyCalendar() {
 *   const eventPropGetter = (event) => ({
 *     className: cn(
 *       event.variant ? `event-variant-${event.variant}` : '',
 *       event.className
 *     ),
 *   });
 *
 *   return (
 *     <ShadcnBigCalendar
 *       localizer={localizer}
 *       events={events}
 *       startAccessor="start"
 *       endAccessor="end"
 *       style={{ height: 600 }}
 *       eventPropGetter={eventPropGetter}
 *       components={{
 *         event: CustomEvent,
 *       }}
 *     />
 *   );
 * }
 * ```
 */
declare const ShadcnBigCalendar: ComponentType<CalendarProps>;

/**
 * Utility function to merge Tailwind CSS classes
 *
 * Combines clsx for conditional classes and tailwind-merge to properly
 * handle Tailwind class conflicts.
 *
 * @example
 * ```tsx
 * cn("px-2 py-1", isActive && "bg-blue-500", "px-4") // "py-1 bg-blue-500 px-4"
 * ```
 */
declare function cn(...inputs: ClassValue[]): string;
/**
 * Helper function to generate event className for React Big Calendar
 *
 * Combines the variant-based styling with custom className prop.
 * Use this in your eventPropGetter to ensure proper styling is applied.
 *
 * @param event - The calendar event object with optional variant and className
 * @returns Object with className property for eventPropGetter
 *
 * @example
 * ```tsx
 * const eventPropGetter = (event) => getEventClassName(event);
 *
 * <ShadcnBigCalendar
 *   eventPropGetter={eventPropGetter}
 *   // ...other props
 * />
 * ```
 */
declare function getEventClassName<T extends {
    variant?: string;
    className?: string;
}>(event: T): {
    className: string;
};

interface CalendarEvent<T = Record<string, any>> {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    variant?: "primary" | "secondary" | "outline";
    className?: string;
    data?: T;
}
type EventVariant = "primary" | "secondary" | "outline";

export { type CalendarEvent, CustomAgendaEvent, CustomEvent, CustomMonthEvent, CustomWeekEvent, EventForm, type EventFormData, type EventFormProps, type EventVariant, ShadcnBigCalendar, cn, eventFormSchema, getEventClassName };
