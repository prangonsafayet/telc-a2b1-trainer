/**
 * The design system's public surface.
 *
 * Feature code imports primitives from here, never from the individual files: those are
 * written by the shadcn CLI (hence kebab-case names) and are treated as vendored, while
 * this barrel is ours. Funnelling through it means a primitive can be swapped, wrapped or
 * renamed without touching call sites — and a lint rule enforces it.
 */

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion.tsx';
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger
} from './alert-dialog.tsx';
export { Alert, AlertDescription, AlertTitle, alertVariants } from './alert.tsx';
export type { AlertProps } from './alert.tsx';
export { Avatar, AvatarFallback, AvatarImage } from './avatar.tsx';
export { Badge, badgeVariants } from './badge.tsx';
export type { BadgeProps, BadgeVariant } from './badge.tsx';
export { Button, buttonVariants } from './button.tsx';
export type { ButtonProps, ButtonVariant } from './button.tsx';
export { Calendar } from './calendar.tsx';
export type { CalendarProps } from './calendar.tsx';
export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './card.tsx';
export { Checkbox } from './checkbox.tsx';
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './dropdown-menu.tsx';
export type { DropdownMenuItemProps, DropdownMenuLabelProps } from './dropdown-menu.tsx';
export { Input } from './input.tsx';
export type { InputProps } from './input.tsx';
export { Label } from './label.tsx';
export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from './popover.tsx';
export { Progress } from './progress.tsx';
export type { ProgressProps } from './progress.tsx';
export { RadioGroup, RadioGroupItem } from './radio-group.tsx';
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from './select.tsx';
export type { SelectTriggerProps } from './select.tsx';
export { Separator } from './separator.tsx';
export { Skeleton } from './skeleton.tsx';
export { Slider } from './slider.tsx';
export { Toaster } from './sonner.tsx';
export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table.tsx';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs.tsx';
export { Textarea } from './textarea.tsx';
export type { TextareaProps } from './textarea.tsx';
export { VisuallyHidden } from './visually-hidden.tsx';
