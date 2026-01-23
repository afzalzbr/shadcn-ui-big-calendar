"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface EventChangeConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  eventTitle: string;
  oldStart: Date;
  oldEnd: Date;
  newStart: Date;
  newEnd: Date;
  changeType: "drag" | "resize";
}

export function EventChangeConfirmationModal({
  isOpen,
  onConfirm,
  onCancel,
  eventTitle,
  oldStart,
  oldEnd,
  newStart,
  newEnd,
  changeType,
}: EventChangeConfirmationModalProps) {
  const formatDateTime = (date: Date) => {
    return date.toLocaleString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Confirm Event {changeType === "drag" ? "Move" : "Resize"}
          </DialogTitle>
          <DialogDescription>
            Review the changes to this event before confirming.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Event
            </h4>
            <p className="text-sm text-muted-foreground">{eventTitle}</p>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time Change
            </h4>

            <div className="space-y-3">
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Original Time
                </p>
                <p className="text-sm font-medium">
                  {isSameDay(oldStart, oldEnd)
                    ? `${formatDateTime(oldStart)} - ${formatTime(oldEnd)}`
                    : `${formatDateTime(oldStart)} - ${formatDateTime(oldEnd)}`}
                </p>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="bg-primary/10 p-3 rounded-md border border-primary/20">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  New Time
                </p>
                <p className="text-sm font-medium">
                  {isSameDay(newStart, newEnd)
                    ? `${formatDateTime(newStart)} - ${formatTime(newEnd)}`
                    : `${formatDateTime(newStart)} - ${formatDateTime(newEnd)}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm {changeType === "drag" ? "Move" : "Resize"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
