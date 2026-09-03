"use client";

import { type CSSProperties, useEffect } from "react";
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
 *       rowHeight={60}
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
  /**
   * Height of each time-slot row in the Week/Day views. Accepts a number
   * (pixels) or any CSS length (e.g. `"3rem"`). Defaults to react-big-calendar's
   * built-in 40px row height.
   */
  rowHeight?: number | string;
}

function ShadcnBigCalendar<
  TEvent extends object = object,
  TResource extends object = object,
>({
  height,
  rowHeight,
  className,
  style,
  ...props
}: ShadcnBigCalendarProps<TEvent, TResource>) {
  let resolvedStyle =
    style?.height == null && height != null ? { ...style, height } : style;

  if (rowHeight != null) {
    resolvedStyle = {
      ...resolvedStyle,
      ["--calendar-row-height" as string]:
        typeof rowHeight === "number" ? `${rowHeight}px` : rowHeight,
    } as CSSProperties;
  }

  const resolvedClassName =
    rowHeight == null
      ? className
      : [className, "rbc-custom-row-height"].filter(Boolean).join(" ");

  useEffect(() => {
    if (rowHeight == null) return;

    const frameId = window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [height, rowHeight]);

  return (
    <Calendar {...props} className={resolvedClassName} style={resolvedStyle} />
  );
}

export default ShadcnBigCalendar;
