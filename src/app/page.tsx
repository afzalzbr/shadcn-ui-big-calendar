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

const LandingPage = () => {
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
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
    setEvents([...events, newEvent]);
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
    <main className="container my-auto">
      <div className="mb-4">
        <Button onClick={() => setSelectedSlot({ start: new Date(), end: new Date(), slots: [], action: 'click' })}>
          <Plus />
          Create Event
        </Button>
      </div>
      <Dialog open={selectedSlot !== null} onOpenChange={() => setSelectedSlot(null)}>
        <DialogContent>
          <DialogHeader>
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">Create Event</h2>
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
        className="border-border border-rounded-md border-solid border-2 rounded-lg" // Optional border
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
    </main>
  );
};

export default LandingPage;
