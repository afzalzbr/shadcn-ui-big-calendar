"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.ts
var index_exports = {};
__export(index_exports, {
  CustomAgendaEvent: () => CustomAgendaEvent,
  CustomEvent: () => CustomEvent,
  CustomMonthEvent: () => CustomMonthEvent,
  CustomWeekEvent: () => CustomWeekEvent,
  EventForm: () => EventForm,
  ShadcnBigCalendar: () => shadcn_big_calendar_default,
  Views: () => import_react_big_calendar2.Views,
  cn: () => cn,
  dateFnsLocalizer: () => import_react_big_calendar2.dateFnsLocalizer,
  eventFormSchema: () => eventFormSchema,
  getEventClassName: () => getEventClassName,
  momentLocalizer: () => import_react_big_calendar2.momentLocalizer,
  withDragAndDrop: () => import_dragAndDrop.default
});
module.exports = __toCommonJS(index_exports);

// lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}
function getEventClassName(event) {
  const variantClass = event.variant ? `event-variant-${event.variant}` : "";
  const customClass = event.className || "";
  return {
    className: cn(variantClass, customClass)
  };
}

// lib/components/event.tsx
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: cn("flex flex-col gap-0.5 overflow-hidden", customClassName), children: [
    timeString && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-[10px] font-medium opacity-90 leading-tight", children: timeString }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-medium leading-tight truncate", children: title })
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: cn("flex items-baseline gap-1 overflow-hidden", customClassName), children: [
    timeString && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[10px] font-medium opacity-90 shrink-0", children: timeString }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs font-medium truncate", children: title })
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: cn("flex flex-col gap-0.5 px-1 py-0.5", customClassName), children: [
    timeString && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-[10px] font-semibold opacity-90 leading-tight", children: timeString }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-medium leading-tight", children: title })
  ] });
}
function CustomAgendaEvent({
  event
}) {
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
  const timeString = !isAllDay && start && end ? `${formatTime(start)} - ${formatTime(end)}` : "All Day";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: cn("flex items-center gap-2", customClassName), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-sm font-medium text-gray-500 w-40", children: timeString }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-sm", children: title })
  ] });
}

// lib/components/event-form.tsx
var z = __toESM(require("zod"));
var import_jsx_runtime2 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-4 w-full p-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm text-muted-foreground", children: "This is a placeholder EventForm component. Please implement your own form using your preferred UI library and form handling solution." }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-muted-foreground", children: "See the package documentation for implementation examples with react-hook-form and Shadcn UI components." })
  ] });
}

// lib/components/shadcn-big-calendar.tsx
var import_react_big_calendar = require("react-big-calendar");
var import_jsx_runtime3 = require("react/jsx-runtime");
function ShadcnBigCalendar({
  height,
  rowHeight,
  style,
  ...props
}) {
  let resolvedStyle = style?.height == null && height != null ? { ...style, height } : style;
  if (rowHeight != null) {
    resolvedStyle = {
      ...resolvedStyle,
      ["--calendar-row-height"]: typeof rowHeight === "number" ? `${rowHeight}px` : rowHeight
    };
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react_big_calendar.Calendar, { ...props, style: resolvedStyle });
}
var shadcn_big_calendar_default = ShadcnBigCalendar;

// lib/index.ts
var import_react_big_calendar2 = require("react-big-calendar");
var import_dragAndDrop = __toESM(require("react-big-calendar/lib/addons/dragAndDrop"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomAgendaEvent,
  CustomEvent,
  CustomMonthEvent,
  CustomWeekEvent,
  EventForm,
  ShadcnBigCalendar,
  Views,
  cn,
  dateFnsLocalizer,
  eventFormSchema,
  getEventClassName,
  momentLocalizer,
  withDragAndDrop
});
//# sourceMappingURL=index.js.map