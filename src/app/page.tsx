"use client";

import { EventForm } from "@/components/shadcn-big-calendar/event-form";
import ShadcnBigCalendar from "@/components/shadcn-big-calendar/shadcn-big-calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import moment from "moment";
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
    end: createDate(0, 10, 30),
  },
  {
    title: "Customer onboarding",
    start: createDate(1, 13),
    end: createDate(1, 14),
  },
  {
    title: "Deep work block",
    start: createDate(2, 11),
    end: createDate(2, 13),
  },
  {
    title: "Team offsite",
    start: createDate(-1, 0),
    end: createDate(1, 0),
    allDay: true,
  },
  {
    title: "Retro & planning",
    start: createDate(3, 15),
    end: createDate(3, 16, 30),
  },
];

const LandingPage = () => {
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(() => [...presetEvents]);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: SetStateAction<any>) => {
    setView(newView);
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleCreateEvent = (data: { title: string; start: string; end: string }) => {
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
    };
    setEvents((previous) => [...previous, newEvent]);
    setSelectedSlot(null);
  };

  const deriveAllDay = (startDate: Date, endDate: Date, isAllDay?: boolean, fallback?: boolean) => {
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

  const handleEventDrop = ({ event, start, end, isAllDay }: EventInteractionArgs<CalendarEvent>) => {
    const nextStart = new Date(start);
    const nextEnd = new Date(end);
    const nextAllDay = deriveAllDay(nextStart, nextEnd, isAllDay, event.allDay);
    const normalizedEnd =
      !nextAllDay && event.allDay && event.end.getTime() - event.start.getTime() >= 24 * 60 * 60 * 1000
        ? clampToSingleDay(nextStart)
        : nextEnd;
    const updatedEvents = events.map((existingEvent) =>
      existingEvent === event
        ? { ...existingEvent, start: nextStart, end: normalizedEnd, allDay: nextAllDay }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  const handleEventResize = ({ event, start, end, isAllDay }: EventInteractionArgs<CalendarEvent>) => {
    const nextStart = new Date(start);
    const nextEnd = new Date(end);
    const nextAllDay = deriveAllDay(nextStart, nextEnd, isAllDay, event.allDay);
    const updatedEvents = events.map((existingEvent) =>
      existingEvent === event
        ? { ...existingEvent, start: nextStart, end: nextEnd, allDay: nextAllDay }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  return (
    <main className="container my-auto space-y-8">
      <header className="max-w-3xl space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Drag-and-drop scheduling with shadcn/ui and React Big Calendar
        </h1>
        <p className="text-muted-foreground">
          Build production-ready scheduling experiences in Next.js with theme-aware components, accessible dialogs, and
          resizable events. This demo shows how quickly you can prototype meetings, shifts, and reminders with a modern
          calendar interface.
        </p>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span className="rounded-full border px-3 py-1">Drag and drop + resizing</span>
          <span className="rounded-full border px-3 py-1">Week, day, month, and agenda views</span>
          <span className="rounded-full border px-3 py-1">Light/dark theme toggle</span>
          <span className="rounded-full border px-3 py-1">Shadcn/ui + Next.js App Router</span>
        </div>
      </header>
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <p className="text-muted-foreground">
            Add a meeting, workshop, or reminder to the demo.
          </p>
          <Button
            aria-label="Create a new calendar event"
            onClick={() => setSelectedSlot({ start: new Date(), end: new Date(), slots: [], action: "click" })}
          >
            <Plus />
            Create Event
          </Button>
        </div>
        
        <Dialog open={selectedSlot !== null} onOpenChange={() => setSelectedSlot(null)}>
          <DialogContent>
            <DialogHeader>
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Create Event</h3>
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
          style={{ height: 600, width: "100%" }}
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
          onSelectSlot={handleSelectSlot}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
        />
      </section>
    </main>
  );
};

export default LandingPage;
