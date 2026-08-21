import type { CSSProperties } from "react";
import type { CalendarProps } from "react-big-calendar";
import { Calendar } from "react-big-calendar";

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
 *       height={600}
 *       eventPropGetter={eventPropGetter}
 *       components={{
 *         event: CustomEvent,
 *       }}
 *     />
 *   );
 * }
 * ```
 */
export interface ShadcnBigCalendarProps<
  TEvent extends object = object,
  TResource extends object = object,
> extends CalendarProps<TEvent, TResource> {
  height?: CSSProperties["height"];
}

function ShadcnBigCalendar<
  TEvent extends object = object,
  TResource extends object = object,
>({ height, style, ...props }: ShadcnBigCalendarProps<TEvent, TResource>) {
  const resolvedStyle =
    style?.height == null && height != null ? { ...style, height } : style;

  return <Calendar {...props} style={resolvedStyle} />;
}

export default ShadcnBigCalendar;
