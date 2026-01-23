import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
export function getEventClassName<T extends { variant?: string; className?: string }>(
  event: T
): { className: string } {
  const variantClass = event.variant ? `event-variant-${event.variant}` : "";
  const customClass = event.className || "";

  return {
    className: cn(variantClass, customClass),
  };
}
