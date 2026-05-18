"use client";

import { CodeBlock } from "@/components/code-block";
import { EventChangeConfirmationModal } from "@/components/event-change-confirmation-modal";
import ShadcnBigCalendar from "@/components/shadcn-big-calendar/shadcn-big-calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { ComponentType, useState } from "react";
import type { CalendarProps, View } from "react-big-calendar";
import { momentLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { CustomEvent } from "shadcn-big-calendar";

const DnDCalendar = withDragAndDrop<CalendarEventWithData>(
  ShadcnBigCalendar as ComponentType<CalendarProps<CalendarEventWithData>>
);

const localizer = momentLocalizer(moment);

// Define custom data interface
interface MeetingData {
  location: string;
  attendees: string[];
  description: string;
  priority: "low" | "medium" | "high";
  conferenceLink?: string;
  organizer: string;
}

// CalendarEvent with generic data type
type CalendarEventWithData = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  variant?: "primary" | "secondary" | "outline";
  data: MeetingData;
};

const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const createDate = (dayOffset: number, hours: number, minutes = 0) => {
  const date = new Date(startOfToday);
  date.setDate(startOfToday.getDate() + dayOffset);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const sampleEvents: CalendarEventWithData[] = [
  {
    title: "Product Review Meeting",
    start: createDate(0, 10, 0),
    end: createDate(0, 11, 0),
    variant: "primary",
    data: {
      location: "Conference Room A",
      attendees: ["Sarah Chen", "Mike Johnson", "Emily Davis"],
      description:
        "Quarterly product review and roadmap discussion. We'll cover Q4 achievements and Q1 planning.",
      priority: "high",
      conferenceLink: "https://meet.example.com/product-review",
      organizer: "Sarah Chen",
    },
  },
  {
    title: "Design Sprint Session",
    start: createDate(0, 14, 0),
    end: createDate(0, 16, 0),
    variant: "secondary",
    data: {
      location: "Creative Lab",
      attendees: ["Alex Kim", "Jordan Lee", "Taylor Smith", "Casey Brown"],
      description:
        "Brainstorming session for the new user dashboard redesign. Bring your sketches!",
      priority: "high",
      organizer: "Alex Kim",
    },
  },
  {
    title: "Client Check-in Call",
    start: createDate(1, 9, 30),
    end: createDate(1, 10, 0),
    variant: "outline",
    data: {
      location: "Virtual",
      attendees: ["John Williams", "Project Team"],
      description:
        "Weekly sync with Acme Corp to review progress and next steps.",
      priority: "medium",
      conferenceLink: "https://zoom.us/j/123456789",
      organizer: "John Williams",
    },
  },
  {
    title: "Team Retrospective",
    start: createDate(1, 15, 0),
    end: createDate(1, 16, 0),
    variant: "primary",
    data: {
      location: "Main Conference Room",
      attendees: ["Dev Team", "QA Team", "Product Manager"],
      description:
        "Sprint retrospective - discuss what went well, what didn't, and improvements for next sprint.",
      priority: "medium",
      organizer: "Scrum Master",
    },
  },
  {
    title: "Interview - Senior Developer",
    start: createDate(2, 11, 0),
    end: createDate(2, 12, 0),
    variant: "secondary",
    data: {
      location: "HR Office",
      attendees: ["HR Manager", "Tech Lead", "Senior Developer Candidate"],
      description:
        "Technical interview for senior developer position. Focus on system design and architecture.",
      priority: "high",
      conferenceLink: "https://meet.example.com/interview-dev",
      organizer: "HR Manager",
    },
  },
  {
    title: "Company All-Hands",
    start: createDate(3, 13, 0),
    end: createDate(3, 14, 0),
    variant: "primary",
    data: {
      location: "Main Auditorium",
      attendees: ["All Employees"],
      description:
        "Monthly all-hands meeting with CEO. Company updates, wins, and Q&A session.",
      priority: "high",
      conferenceLink: "https://meet.example.com/all-hands",
      organizer: "CEO Office",
    },
  },
  {
    title: "Code Review Workshop",
    start: createDate(4, 10, 0),
    end: createDate(4, 11, 30),
    variant: "outline",
    data: {
      location: "Training Room B",
      attendees: ["Junior Developers", "Senior Developers"],
      description:
        "Workshop on best practices for code reviews and how to provide constructive feedback.",
      priority: "low",
      organizer: "Engineering Manager",
    },
  },
];

export default function DataPropsDemo() {
  const [events, setEvents] = useState<CalendarEventWithData[]>(sampleEvents);
  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEventWithData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState(new Date());
  const [requireConfirmation, setRequireConfirmation] = useState(false);

  // Confirmation modal state
  const [pendingChange, setPendingChange] = useState<{
    event: CalendarEventWithData;
    start: Date;
    end: Date;
    type: "drag" | "resize";
  } | null>(null);

  const handleSelectEvent = (event: CalendarEventWithData) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const applyEventChange = (
    event: CalendarEventWithData,
    start: Date,
    end: Date
  ) => {
    setEvents((prevEvents) =>
      prevEvents.map((ev) =>
        ev.title === event.title && ev.start.getTime() === event.start.getTime()
          ? { ...ev, start, end }
          : ev
      )
    );
  };

  const handleEventDrop = ({
    event,
    start,
    end,
  }: {
    event: CalendarEventWithData;
    start: string | Date;
    end: string | Date;
  }) => {
    const startDate = typeof start === "string" ? new Date(start) : start;
    const endDate = typeof end === "string" ? new Date(end) : end;

    if (requireConfirmation) {
      setPendingChange({ event, start: startDate, end: endDate, type: "drag" });
    } else {
      applyEventChange(event, startDate, endDate);
    }
  };

  const handleEventResize = ({
    event,
    start,
    end,
  }: {
    event: CalendarEventWithData;
    start: string | Date;
    end: string | Date;
  }) => {
    const startDate = typeof start === "string" ? new Date(start) : start;
    const endDate = typeof end === "string" ? new Date(end) : end;

    if (requireConfirmation) {
      setPendingChange({
        event,
        start: startDate,
        end: endDate,
        type: "resize",
      });
    } else {
      applyEventChange(event, startDate, endDate);
    }
  };

  const handleConfirmChange = () => {
    if (pendingChange) {
      applyEventChange(
        pendingChange.event,
        pendingChange.start,
        pendingChange.end
      );
      setPendingChange(null);
    }
  };

  const handleCancelChange = () => {
    setPendingChange(null);
  };

  const eventPropGetter: CalendarProps<CalendarEventWithData>["eventPropGetter"] =
    (event) => {
      const variant = event.variant ?? "primary";
      return {
        className: `event-variant-${variant}`,
      };
    };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 dark:text-red-400";
      case "medium":
        return "text-yellow-600 dark:text-yellow-400";
      case "low":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-muted-foreground";
    }
  };

  const typeDefinitionCode = `// Define your custom data interface
interface MeetingData {
  location: string;
  attendees: string[];
  description: string;
  priority: "low" | "medium" | "high";
  conferenceLink?: string;
  organizer: string;
}

// Use CalendarEvent with generic type
type CalendarEventWithData = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  variant?: "primary" | "secondary" | "outline";
  data: MeetingData;  // Type-safe custom data
};`;

  const eventCreationCode = `const events: CalendarEventWithData[] = [
  {
    title: "Product Review Meeting",
    start: new Date(2024, 0, 15, 10, 0),
    end: new Date(2024, 0, 15, 11, 0),
    variant: "primary",
    data: {
      location: "Conference Room A",
      attendees: ["Sarah Chen", "Mike Johnson"],
      description: "Quarterly product review",
      priority: "high",
      conferenceLink: "https://meet.example.com/review",
      organizer: "Sarah Chen",
    },
  },
];`;

  const eventHandlerCode = `const handleSelectEvent = (event: CalendarEventWithData) => {
  setSelectedEvent(event);
  setModalOpen(true);
};

<ShadcnBigCalendar
  localizer={localizer}
  events={events}
  onSelectEvent={handleSelectEvent}
  // ... other props
/>`;

  const modalCode = `<Dialog open={modalOpen} onOpenChange={setModalOpen}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>{selectedEvent?.title}</DialogTitle>
      <DialogDescription>
        {formatDate(selectedEvent?.start)} at {formatTime(selectedEvent?.start)}
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-4">
      {/* Location */}
      <div className="flex gap-3">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="font-medium">Location</p>
          <p className="text-sm text-muted-foreground">
            {selectedEvent?.data?.location}
          </p>
        </div>
      </div>

      {/* Attendees */}
      <div className="flex gap-3">
        <Users className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="font-medium">Attendees ({selectedEvent?.data?.attendees.length})</p>
          <p className="text-sm text-muted-foreground">
            {selectedEvent?.data?.attendees.join(", ")}
          </p>
        </div>
      </div>

      {/* Conference Link */}
      {selectedEvent?.data?.conferenceLink && (
        <Button asChild variant="outline" className="w-full">
          <a href={selectedEvent.data.conferenceLink} target="_blank" rel="noreferrer">
            <Video className="mr-2 h-4 w-4" />
            Join Meeting
          </a>
        </Button>
      )}
    </div>
  </DialogContent>
</Dialog>`;

  return (
    <main className="mx-auto my-auto w-full max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8 py-2">
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" asChild className="mt-1">
          <Link href="/features">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="scroll-m-20 text-3xl md:text-4xl font-bold tracking-tight">
            Generic Data Props
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Extend events with custom data properties and display them in
            interactive modals
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Interactive Demo
          </h2>
          <div className="flex items-center gap-2">
            <Switch
              id="confirmation-mode"
              checked={requireConfirmation}
              onCheckedChange={setRequireConfirmation}
            />
            <label
              htmlFor="confirmation-mode"
              className="text-sm font-medium cursor-pointer"
            >
              Require Confirmation
            </label>
          </div>
        </div>

        <div className="rounded-lg border bg-card/50 p-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            Click on any event to view its detailed information including
            location, attendees, priority, and conference links. All data is
            type-safe using TypeScript generics.
          </p>
          <p className="text-xs text-muted-foreground">
            {requireConfirmation
              ? "Confirmation modal enabled - drag or resize events to see the confirmation dialog"
              : "Immediate updates - drag or resize events for instant changes"}
          </p>
        </div>

        <div className="h-[500px] md:h-[600px]">
          <DnDCalendar
            localizer={localizer}
            events={events}
            eventPropGetter={eventPropGetter}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            onSelectEvent={handleSelectEvent}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            resizable
            components={{ event: CustomEvent }}
            className="border-border border-rounded-md border-solid border-2 rounded-lg"
          />
        </div>
      </section>

      {/* Event Details Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription className="text-base">
              <div className="flex items-center gap-2 mt-2">
                <Calendar className="h-4 w-4" />
                {selectedEvent && formatDate(selectedEvent.start)}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-4 w-4" />
                {selectedEvent &&
                  `${formatTime(selectedEvent.start)} - ${formatTime(selectedEvent.end)}`}
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Priority */}
            <div className="flex gap-3 items-start">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium mb-1">Priority</p>
                <span
                  className={`text-sm font-semibold uppercase ${getPriorityColor(selectedEvent?.data?.priority || "low")}`}
                >
                  {selectedEvent?.data?.priority}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-3 items-start">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium mb-1">Location</p>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent?.data?.location}
                </p>
              </div>
            </div>

            {/* Organizer */}
            <div className="flex gap-3 items-start">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium mb-1">Organizer</p>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent?.data?.organizer}
                </p>
              </div>
            </div>

            {/* Attendees */}
            <div className="flex gap-3 items-start">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="font-medium mb-1">
                  Attendees ({selectedEvent?.data?.attendees.length || 0})
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedEvent?.data?.attendees.map((attendee, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full border px-3 py-1 text-xs"
                    >
                      {attendee}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-4">
              <p className="font-medium mb-2">Description</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedEvent?.data?.description}
              </p>
            </div>

            {/* Conference Link */}
            {selectedEvent?.data?.conferenceLink && (
              <div className="border-t pt-4">
                <Button asChild variant="default" className="w-full">
                  <a
                    href={selectedEvent.data.conferenceLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Join Virtual Meeting
                  </a>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          Implementation Guide
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">
              1. Define Your Data Interface
            </h3>
            <p className="text-muted-foreground mb-3">
              Create a TypeScript interface for your custom event data. This
              ensures type safety and autocomplete support throughout your
              application.
            </p>
            <CodeBlock
              code={typeDefinitionCode}
              language="tsx"
              fileName="types.ts"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">
              2. Create Events with Custom Data
            </h3>
            <p className="text-muted-foreground mb-3">
              Populate your events array with the custom data. All properties
              are type-checked by TypeScript.
            </p>
            <CodeBlock
              code={eventCreationCode}
              language="tsx"
              fileName="events.ts"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">
              3. Handle Event Selection
            </h3>
            <p className="text-muted-foreground mb-3">
              Use the onSelectEvent callback to capture when users click on
              events and display the custom data.
            </p>
            <CodeBlock
              code={eventHandlerCode}
              language="tsx"
              fileName="calendar.tsx"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">
              4. Display Data in Modal
            </h3>
            <p className="text-muted-foreground mb-3">
              Create a modal dialog to show the event details. Access custom
              data via the event.data property.
            </p>
            <CodeBlock
              code={modalCode}
              language="tsx"
              fileName="event-modal.tsx"
            />
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">Benefits</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-semibold">Type Safety</h3>
            <p className="text-sm text-muted-foreground">
              TypeScript generics ensure your custom data is type-safe with
              autocomplete support.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Flexible Schema</h3>
            <p className="text-sm text-muted-foreground">
              Define any data structure you need - from simple strings to
              complex nested objects.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Rich Context</h3>
            <p className="text-sm text-muted-foreground">
              Store meeting links, attendees, locations, priorities, and any
              other metadata.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Maintainable Code</h3>
            <p className="text-sm text-muted-foreground">
              Clear interfaces make it easy to understand and modify your event
              data structure.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight">Use Cases</h2>

        <div className="space-y-4 text-muted-foreground">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Meeting Scheduler
            </h3>
            <p>
              Store conference links, attendee lists, meeting rooms, and agenda
              items for each meeting.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Project Management
            </h3>
            <p>
              Track task assignees, priority levels, project IDs, and completion
              status for project milestones.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Resource Booking
            </h3>
            <p>
              Manage room reservations, equipment bookings, and capacity limits
              with detailed resource information.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Healthcare Appointments
            </h3>
            <p>
              Store patient information, doctor details, appointment types, and
              medical notes securely.
            </p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .event-variant-primary {
          background-color: hsl(var(--primary)) !important;
          border-color: hsl(var(--primary)) !important;
          color: hsl(var(--primary-foreground)) !important;
        }

        .event-variant-secondary {
          background-color: hsl(var(--secondary)) !important;
          border-color: hsl(var(--secondary)) !important;
          color: hsl(var(--secondary-foreground)) !important;
        }

        .event-variant-outline {
          background-color: transparent !important;
          border: 2px solid hsl(var(--primary)) !important;
          color: hsl(var(--foreground)) !important;
        }
      `}</style>

      {/* Confirmation Modal */}
      {pendingChange && (
        <EventChangeConfirmationModal
          isOpen={true}
          onConfirm={handleConfirmChange}
          onCancel={handleCancelChange}
          eventTitle={pendingChange.event.title}
          oldStart={pendingChange.event.start}
          oldEnd={pendingChange.event.end}
          newStart={pendingChange.start}
          newEnd={pendingChange.end}
          changeType={pendingChange.type}
        />
      )}
    </main>
  );
}
