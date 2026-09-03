"use client";

import { EventForm } from "@/components/shadcn-big-calendar/event-form";
import ShadcnBigCalendar from "@/components/shadcn-big-calendar/shadcn-big-calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { GithubIcon, Plus } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { ComponentType, SetStateAction, useState } from "react";
import type { CalendarProps } from "react-big-calendar";
import { momentLocalizer, SlotInfo, Views } from "react-big-calendar";
import type { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const DnDCalendar = withDragAndDrop<CalendarEvent>(
  ShadcnBigCalendar as ComponentType<CalendarProps<CalendarEvent>>
);
const localizer = momentLocalizer(moment);

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  variant?: "primary" | "secondary" | "outline";
};

const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const createDate = (dayOffset: number, hours: number, minutes = 0) => {
  const date = new Date(startOfToday);
  date.setDate(startOfToday.getDate() + dayOffset);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const presetEvents: CalendarEvent[] = [
  {
    title: "Product design sync",
    start: createDate(0, 9, 30),
    end: createDate(0, 12, 30),
    variant: "primary",
  },
  {
    title: "Customer onboarding",
    start: createDate(1, 13),
    end: createDate(1, 14, 30),
    variant: "secondary",
  },
  {
    title: "Deep work block",
    start: createDate(2, 11),
    end: createDate(2, 13),
    variant: "outline",
  },
  {
    title: "Prepare Presentation",
    start: createDate(-2, 9),
    end: createDate(-2, 13),
    variant: "secondary",
  },
  {
    title: "Team offsite",
    start: createDate(-1, 0),
    end: createDate(1, 0),
    allDay: true,
    variant: "secondary",
  },
  {
    title: "Retro & planning",
    start: createDate(3, 15),
    end: createDate(3, 16, 30),
    variant: "primary",
  },
  {
    title: "Quarterly roadmap",
    start: createDate(30, 10),
    end: createDate(30, 11, 30),
    variant: "primary",
  },
  {
    title: "Partner demo",
    start: createDate(32, 14),
    end: createDate(32, 15),
    variant: "secondary",
  },
  {
    title: "Billing review",
    start: createDate(34, 9),
    end: createDate(34, 11),
    variant: "outline",
  },
  {
    title: "Security tabletop",
    start: createDate(36, 13),
    end: createDate(36, 14, 30),
    variant: "primary",
  },
];

const LandingPage = () => {
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(() => [
    ...presetEvents,
  ]);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

  const eventPropGetter: CalendarProps<CalendarEvent>["eventPropGetter"] = (
    event
  ) => {
    const variant = event.variant ?? "primary";
    return {
      className: `event-variant-${variant}`,
    };
  };

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: SetStateAction<any>) => {
    setView(newView);
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleCreateEvent = (data: {
    title: string;
    start: string;
    end: string;
    variant: CalendarEvent["variant"];
  }) => {
    const startDate = new Date(data.start);
    const endDate = new Date(data.end);
    const allDaySelection =
      startDate.getHours() === 0 &&
      startDate.getMinutes() === 0 &&
      endDate.getHours() === 0 &&
      endDate.getMinutes() === 0 &&
      endDate.getTime() - startDate.getTime() >= 24 * 60 * 60 * 1000;

    const newEvent: CalendarEvent = {
      title: data.title,
      start: startDate,
      end: endDate,
      allDay: allDaySelection,
      variant: data.variant ?? "primary",
    };
    setEvents((previous) => [...previous, newEvent]);
    setSelectedSlot(null);
  };

  const deriveAllDay = (
    startDate: Date,
    endDate: Date,
    isAllDay?: boolean,
    fallback?: boolean
  ) => {
    if (typeof isAllDay === "boolean") return isAllDay;
    const dayDiff = endDate.getTime() - startDate.getTime();
    const startsAtMidnight =
      startDate.getHours() === 0 &&
      startDate.getMinutes() === 0 &&
      startDate.getSeconds() === 0;
    const endsAtMidnight =
      endDate.getHours() === 0 &&
      endDate.getMinutes() === 0 &&
      endDate.getSeconds() === 0;
    if (startsAtMidnight && endsAtMidnight && dayDiff >= 24 * 60 * 60 * 1000) {
      return true;
    }
    if (!startsAtMidnight || dayDiff < 24 * 60 * 60 * 1000) {
      return false;
    }
    return fallback ?? false;
  };

  const clampToSingleDay = (startDate: Date) => {
    const endOfDay = new Date(startDate);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
  };

  const handleEventDrop = ({
    event,
    start,
    end,
    isAllDay,
  }: EventInteractionArgs<CalendarEvent>) => {
    const nextStart = new Date(start);
    const nextEnd = new Date(end);
    const nextAllDay = deriveAllDay(nextStart, nextEnd, isAllDay, event.allDay);
    const normalizedEnd =
      !nextAllDay &&
      event.allDay &&
      event.end.getTime() - event.start.getTime() >= 24 * 60 * 60 * 1000
        ? clampToSingleDay(nextStart)
        : nextEnd;
    const updatedEvents = events.map((existingEvent) =>
      existingEvent === event
        ? {
            ...existingEvent,
            start: nextStart,
            end: normalizedEnd,
            allDay: nextAllDay,
          }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  const handleEventResize = ({
    event,
    start,
    end,
    isAllDay,
  }: EventInteractionArgs<CalendarEvent>) => {
    const nextStart = new Date(start);
    const nextEnd = new Date(end);
    const nextAllDay = deriveAllDay(nextStart, nextEnd, isAllDay, event.allDay);
    const updatedEvents = events.map((existingEvent) =>
      existingEvent === event
        ? {
            ...existingEvent,
            start: nextStart,
            end: nextEnd,
            allDay: nextAllDay,
          }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  return (
    <main className="mx-auto my-auto w-full max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8 sm:pb-8">
      <header className="max-w-3xl space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Drag-and-drop scheduling with shadcn/ui and React Big Calendar
        </h1>
        <p className="text-muted-foreground">
          Build production-ready scheduling experiences in Next.js with
          theme-aware components, accessible dialogs, and resizable events. This
          demo shows how quickly you can prototype meetings, shifts, and
          reminders with a modern calendar interface.
        </p>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span className="rounded-full border px-3 py-1">
            Drag and drop + resizing
          </span>
          <span className="rounded-full border px-3 py-1">
            Week, day, month, and agenda views
          </span>
          <span className="rounded-full border px-3 py-1">
            Light/dark theme toggle
          </span>
          <span className="rounded-full border px-3 py-1">
            Shadcn/ui + Next.js App Router
          </span>
        </div>
      </header>
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <p className="text-muted-foreground">
            Add a meeting, workshop, or reminder to the demo.
          </p>
          <Button
            aria-label="Create a new calendar event"
            onClick={() =>
              setSelectedSlot({
                start: new Date(),
                end: new Date(),
                slots: [],
                action: "click",
              })
            }
          >
            <Plus />
            Create Event
          </Button>
        </div>

        <Dialog
          open={selectedSlot !== null}
          onOpenChange={() => setSelectedSlot(null)}
        >
          <DialogContent>
            <DialogHeader>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Create Event
              </h3>
            </DialogHeader>
            {selectedSlot && (
              <EventForm
                start={selectedSlot.start}
                end={selectedSlot.end}
                onSubmit={handleCreateEvent}
                onCancel={() => setSelectedSlot(null)}
              />
            )}
          </DialogContent>
        </Dialog>
        <DnDCalendar
          localizer={localizer}
          style={{ height: 800, width: "100%" }}
          className="border-border border-rounded-md border-solid border-2 rounded-lg"
          selectable
          date={date}
          onNavigate={handleNavigate}
          view={view}
          onView={handleViewChange}
          resizable
          draggableAccessor={() => true}
          resizableAccessor={() => true}
          events={events}
          eventPropGetter={eventPropGetter}
          onSelectSlot={handleSelectSlot}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
        />
      </section>
      <section className="border border-border rounded-lg p-4 bg-card/60 flex flex-wrap items-center gap-4 justify-between">
        <div className="space-y-1">
          <p className="text-lg font-semibold">Get the code</p>
          <p className="text-muted-foreground text-sm">
            Grab the repo and, if this helps you ship faster, please drop a star
            or a quick &lt;3.
          </p>
        </div>
        <Button asChild>
          <Link
            href="https://github.com/list-jonas/shadcn-ui-big-calendar"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
            Get the code
          </Link>
        </Button>
      </section>
    </main>
  );
};

export default LandingPage;
