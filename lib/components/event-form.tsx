"use client";

import * as z from "zod";

/**
 * Event Form Schema
 *
 * Validation schema for calendar event creation/editing.
 * Supports optional className for custom styling.
 */
export const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  start: z.string(),
  end: z.string(),
  variant: z.enum(["primary", "secondary", "outline"]),
  className: z.string().optional(),
});

export type EventFormData = z.infer<typeof eventFormSchema>;

/**
 * EventForm Component Props
 */
export type EventFormProps = {
  start: Date;
  end: Date;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  /** Custom button component - should accept standard button props */
  ButtonComponent?: React.ComponentType<any>;
  /** Custom form components - pass your shadcn/ui form components */
  FormComponents?: {
    Form: React.ComponentType<any>;
    FormControl: React.ComponentType<any>;
    FormField: React.ComponentType<any>;
    FormItem: React.ComponentType<any>;
    FormLabel: React.ComponentType<any>;
  };
  /** Custom input component - should accept standard input props */
  InputComponent?: React.ComponentType<any>;
};

/**
 * EventForm Component
 *
 * A form component for creating and editing calendar events. This is an optional
 * component that integrates with react-hook-form and zod validation.
 *
 * Note: This component requires the following peer dependencies:
 * - react-hook-form
 * - @hookform/resolvers
 * - zod
 *
 * You must also provide your own Shadcn UI components (Button, Form, Input) or
 * similar components through the props.
 *
 * @example
 * ```tsx
 * import { EventForm } from "shadcn-big-calendar";
 * import { Button } from "@/components/ui/button";
 * import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
 * import { Input } from "@/components/ui/input";
 *
 * function MyEventDialog({ start, end, onSubmit, onCancel }) {
 *   return (
 *     <EventForm
 *       start={start}
 *       end={end}
 *       onSubmit={onSubmit}
 *       onCancel={onCancel}
 *       ButtonComponent={Button}
 *       InputComponent={Input}
 *       FormComponents={{
 *         Form,
 *         FormControl,
 *         FormField,
 *         FormItem,
 *         FormLabel,
 *       }}
 *     />
 *   );
 * }
 * ```
 */
export function EventForm({
  start,
  end,
  onSubmit,
  onCancel,
  ButtonComponent,
  InputComponent,
  FormComponents,
}: EventFormProps) {
  // This component is provided as a reference implementation
  // Users should implement their own form using their UI library

  return (
    <div className="space-y-4 w-full p-4">
      <p className="text-sm text-muted-foreground">
        This is a placeholder EventForm component. Please implement your own form
        using your preferred UI library and form handling solution.
      </p>
      <p className="text-xs text-muted-foreground">
        See the package documentation for implementation examples with react-hook-form
        and Shadcn UI components.
      </p>
    </div>
  );
}

/**
 * Example implementation with react-hook-form
 *
 * Copy this code to your project and customize:
 *
 * ```tsx
 * "use client";
 *
 * import { Button } from "@/components/ui/button";
 * import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
 * import { Input } from "@/components/ui/input";
 * import { zodResolver } from "@hookform/resolvers/zod";
 * import { useForm } from "react-hook-form";
 * import { eventFormSchema, type EventFormProps } from "shadcn-big-calendar";
 *
 * export function EventForm({ start, end, onSubmit, onCancel }: EventFormProps) {
 *   const form = useForm({
 *     resolver: zodResolver(eventFormSchema),
 *     defaultValues: {
 *       title: "",
 *       start: start.toISOString().slice(0, 16),
 *       end: end.toISOString().slice(0, 16),
 *       variant: "primary" as const,
 *       className: "",
 *     },
 *   });
 *
 *   return (
 *     <Form {...form}>
 *       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full p-4">
 *         <FormField
 *           control={form.control}
 *           name="title"
 *           render={({ field }) => (
 *             <FormItem>
 *               <FormLabel>Event Title</FormLabel>
 *               <FormControl>
 *                 <Input placeholder="Enter event title" {...field} />
 *               </FormControl>
 *             </FormItem>
 *           )}
 *         />
 *         <FormField
 *           control={form.control}
 *           name="variant"
 *           render={({ field }) => (
 *             <FormItem>
 *               <FormLabel>Style</FormLabel>
 *               <FormControl>
 *                 <select
 *                   className="w-full rounded-md border border-input bg-background px-3 py-2"
 *                   {...field}
 *                 >
 *                   <option value="primary">Primary</option>
 *                   <option value="secondary">Secondary</option>
 *                   <option value="outline">Outline</option>
 *                 </select>
 *               </FormControl>
 *             </FormItem>
 *           )}
 *         />
 *         <FormField
 *           control={form.control}
 *           name="start"
 *           render={({ field }) => (
 *             <FormItem>
 *               <FormLabel>Start Time</FormLabel>
 *               <FormControl>
 *                 <Input type="datetime-local" {...field} />
 *               </FormControl>
 *             </FormItem>
 *           )}
 *         />
 *         <FormField
 *           control={form.control}
 *           name="end"
 *           render={({ field }) => (
 *             <FormItem>
 *               <FormLabel>End Time</FormLabel>
 *               <FormControl>
 *                 <Input type="datetime-local" {...field} />
 *               </FormControl>
 *             </FormItem>
 *           )}
 *         />
 *         <FormField
 *           control={form.control}
 *           name="className"
 *           render={({ field }) => (
 *             <FormItem>
 *               <FormLabel>Custom Class (Optional)</FormLabel>
 *               <FormControl>
 *                 <Input placeholder="e.g., font-bold text-lg" {...field} />
 *               </FormControl>
 *             </FormItem>
 *           )}
 *         />
 *         <div className="flex justify-end space-x-2">
 *           <Button variant="outline" type="button" onClick={onCancel}>
 *             Cancel
 *           </Button>
 *           <Button type="submit">Create Event</Button>
 *         </div>
 *       </form>
 *     </Form>
 *   );
 * }
 * ```
 */
