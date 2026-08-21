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
}

const ShadcnBigCalendar = <
  TEvent extends object = object,
  TResource extends object = object,
>({
  height,
  style,
  ...props
}: ShadcnBigCalendarProps<TEvent, TResource>) => {
  const resolvedStyle =
    style?.height == null && height != null ? { ...style, height } : style;

  return createElement(
    Calendar as ComponentType<CalendarProps<TEvent, TResource>>,
    { ...props, style: resolvedStyle }
  );
};

export default ShadcnBigCalendar;
