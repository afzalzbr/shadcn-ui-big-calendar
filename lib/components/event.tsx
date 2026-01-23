"use client";

import type { EventProps } from "react-big-calendar";
import { cn } from "../utils";

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
export function CustomEvent<T = Record<string, any>>({ event }: EventProps<T & { className?: string }>) {
  const formatTime = (date: Date | string): string => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const eventWithTime = event as any;
  const start = eventWithTime.start;
  const end = eventWithTime.end;
  const title = eventWithTime.title || "";
  const isAllDay = eventWithTime.allDay;
  const customClassName = eventWithTime.className || "";

  // Format the time string
  const timeString = !isAllDay && start && end
    ? `${formatTime(start)} - ${formatTime(end)}`
    : "";

  return (
    <div className={cn("flex flex-col gap-0.5 overflow-hidden", customClassName)}>
      {timeString && (
        <div className="text-[10px] font-medium opacity-90 leading-tight">
          {timeString}
        </div>
      )}
      <div className="text-xs font-medium leading-tight truncate">
        {title}
      </div>
    </div>
  );
}

/**
 * Month Event Component
 *
 * Optimized for month view where space is limited.
 * Shows time inline with title for better space utilization.
 */
export function CustomMonthEvent<T = Record<string, any>>({ event }: EventProps<T & { className?: string }>) {
  const formatTime = (date: Date | string): string => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const eventWithTime = event as any;
  const start = eventWithTime.start;
  const title = eventWithTime.title || "";
  const isAllDay = eventWithTime.allDay;
  const customClassName = eventWithTime.className || "";

  // Format the time string
  const timeString = !isAllDay && start
    ? `${formatTime(start)}`
    : "";

  return (
    <div className={cn("flex items-baseline gap-1 overflow-hidden", customClassName)}>
      {timeString && (
        <span className="text-[10px] font-medium opacity-90 shrink-0">
          {timeString}
        </span>
      )}
      <span className="text-xs font-medium truncate">
        {title}
      </span>
    </div>
  );
}

/**
 * Week/Day Event Component
 *
 * Optimized for week and day views where there's more vertical space.
 * Shows time and title stacked for better readability.
 */
export function CustomWeekEvent<T = Record<string, any>>({ event }: EventProps<T & { className?: string }>) {
  const formatTime = (date: Date | string): string => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const eventWithTime = event as any;
  const start = eventWithTime.start;
  const end = eventWithTime.end;
  const title = eventWithTime.title || "";
  const isAllDay = eventWithTime.allDay;
  const customClassName = eventWithTime.className || "";

  // Format the time string
  const timeString = !isAllDay && start && end
    ? `${formatTime(start)} - ${formatTime(end)}`
    : "";

  return (
    <div className={cn("flex flex-col gap-0.5 px-1 py-0.5", customClassName)}>
      {timeString && (
        <div className="text-[10px] font-semibold opacity-90 leading-tight">
          {timeString}
        </div>
      )}
      <div className="text-xs font-medium leading-tight">
        {title}
      </div>
    </div>
  );
}

/**
 * Agenda Event Component
 *
 * Optimized for agenda view where events are displayed in a list format.
 */
export function CustomAgendaEvent<T = Record<string, any>>({
  event,
}: EventProps<T & { className?: string }>) {
  const formatTime = (date: Date | string): string => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const eventWithTime = event as any;
  const start = eventWithTime.start;
  const end = eventWithTime.end;
  const title = eventWithTime.title || "";
  const isAllDay = eventWithTime.allDay;
  const customClassName = eventWithTime.className || "";

  // Format the time string
  const timeString =
    !isAllDay && start && end
      ? `${formatTime(start)} - ${formatTime(end)}`
      : "All Day";

  return (
    <div className={cn("flex items-center gap-2", customClassName)}>
      <div className="text-sm font-medium text-gray-500 w-40">{timeString}</div>
      <div className="text-sm">{title}</div>
    </div>
  );
}
