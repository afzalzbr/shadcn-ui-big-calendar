import { createElement, type CSSProperties, type ComponentType } from "react";
import { Calendar } from "react-big-calendar";
import type { CalendarProps } from "react-big-calendar";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./shadcn-big-calendar.css";

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

const ShadcnBigCalendar = <
  TEvent extends object = object,
  TResource extends object = object,
>({
  height,
  rowHeight,
  style,
  ...props
}: ShadcnBigCalendarProps<TEvent, TResource>) => {
  let resolvedStyle =
    style?.height == null && height != null ? { ...style, height } : style;

  if (rowHeight != null) {
    resolvedStyle = {
      ...resolvedStyle,
      ["--calendar-row-height" as string]:
        typeof rowHeight === "number" ? `${rowHeight}px` : rowHeight,
    } as CSSProperties;
  }

  return createElement(
    Calendar as ComponentType<CalendarProps<TEvent, TResource>>,
    { ...props, style: resolvedStyle }
  );
};

export default ShadcnBigCalendar;
