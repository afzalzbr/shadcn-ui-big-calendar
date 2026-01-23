"use client";

// lib/components/shadcn-big-calendar.tsx
import { Calendar } from "react-big-calendar";
var ShadcnBigCalendar = Calendar;
var shadcn_big_calendar_default = ShadcnBigCalendar;

// lib/components/event-form.tsx
import * as z from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  start: z.string(),
  end: z.string(),
  variant: z.enum(["primary", "secondary", "outline"]),
  className: z.string().optional()
});
function EventForm({
  start,
  end,
  onSubmit,
  onCancel,
  ButtonComponent,
  InputComponent,
  FormComponents
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4 w-full p-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "This is a placeholder EventForm component. Please implement your own form using your preferred UI library and form handling solution." }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "See the package documentation for implementation examples with react-hook-form and Shadcn UI components." })
  ] });
}

// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function getEventClassName(event) {
  const variantClass = event.variant ? `event-variant-${event.variant}` : "";
  const customClass = event.className || "";
  return {
    className: cn(variantClass, customClass)
  };
}

// lib/components/event.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function CustomEvent({ event }) {
  const formatTime = (date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };
  const eventWithTime = event;
  const start = eventWithTime.start;
  const end = eventWithTime.end;
  const title = eventWithTime.title || "";
  const isAllDay = eventWithTime.allDay;
  const customClassName = eventWithTime.className || "";
  const timeString = !isAllDay && start && end ? `${formatTime(start)} - ${formatTime(end)}` : "";
  return /* @__PURE__ */ jsxs2("div", { className: cn("flex flex-col gap-0.5 overflow-hidden", customClassName), children: [
    timeString && /* @__PURE__ */ jsx2("div", { className: "text-[10px] font-medium opacity-90 leading-tight", children: timeString }),
    /* @__PURE__ */ jsx2("div", { className: "text-xs font-medium leading-tight truncate", children: title })
  ] });
}
function CustomMonthEvent({ event }) {
  const formatTime = (date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };
  const eventWithTime = event;
  const start = eventWithTime.start;
  const title = eventWithTime.title || "";
  const isAllDay = eventWithTime.allDay;
  const customClassName = eventWithTime.className || "";
  const timeString = !isAllDay && start ? `${formatTime(start)}` : "";
  return /* @__PURE__ */ jsxs2("div", { className: cn("flex items-baseline gap-1 overflow-hidden", customClassName), children: [
    timeString && /* @__PURE__ */ jsx2("span", { className: "text-[10px] font-medium opacity-90 shrink-0", children: timeString }),
    /* @__PURE__ */ jsx2("span", { className: "text-xs font-medium truncate", children: title })
  ] });
}
function CustomWeekEvent({ event }) {
  const formatTime = (date) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };
  const eventWithTime = event;
  const start = eventWithTime.start;
  const end = eventWithTime.end;
  const title = eventWithTime.title || "";
  const isAllDay = eventWithTime.allDay;
  const customClassName = eventWithTime.className || "";
  const timeString = !isAllDay && start && end ? `${formatTime(start)} - ${formatTime(end)}` : "";
  return /* @__PURE__ */ jsxs2("div", { className: cn("flex flex-col gap-0.5 px-1 py-0.5", customClassName), children: [
    timeString && /* @__PURE__ */ jsx2("div", { className: "text-[10px] font-semibold opacity-90 leading-tight", children: timeString }),
    /* @__PURE__ */ jsx2("div", { className: "text-xs font-medium leading-tight", children: title })
  ] });
}
function CustomAgendaEvent({ event }) {
  const eventWithTime = event;
  const title = eventWithTime.title || "";
  const customClassName = eventWithTime.className || "";
  return /* @__PURE__ */ jsx2("div", { className: cn("text-sm", customClassName), children: title });
}

// lib/index.ts
import { momentLocalizer, dateFnsLocalizer, Views } from "react-big-calendar";
import { default as default2 } from "react-big-calendar/lib/addons/dragAndDrop";
export {
  CustomAgendaEvent,
  CustomEvent,
  CustomMonthEvent,
  CustomWeekEvent,
  EventForm,
  shadcn_big_calendar_default as ShadcnBigCalendar,
  Views,
  cn,
  dateFnsLocalizer,
  eventFormSchema,
  getEventClassName,
  momentLocalizer,
  default2 as withDragAndDrop
};
//# sourceMappingURL=index.mjs.map