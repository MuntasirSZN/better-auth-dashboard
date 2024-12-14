import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import type { forwardRef } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";

type ShadCNComponent<T1, T2> = ReturnType<typeof forwardRef<T1, T2>>;

type SidebarProvider = ShadCNComponent<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>;

type Sidebar = ShadCNComponent<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>;

type SidebarContent = ShadCNComponent<
  HTMLDivElement,
  React.ComponentProps<"div">
>;

type SidebarGroup = ShadCNComponent<
  HTMLDivElement,
  React.ComponentProps<"div">
>;

type SidebarGroupLabel = ShadCNComponent<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>;

type SidebarGroupContent = ShadCNComponent<
  HTMLDivElement,
  React.ComponentProps<"div">
>;

type SidebarMenu = ShadCNComponent<
  HTMLUListElement,
  React.ComponentProps<"ul">
>;
type SidebarMenuItem = ShadCNComponent<
  HTMLLIElement,
  React.ComponentProps<"li">
>;

type SidebarMenuButton = ShadCNComponent<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<TooltipContent>;
  }
>;

type TooltipContent = ShadCNComponent<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>;

type SidebarTrigger = ShadCNComponent<
  React.ElementRef<Button>,
  React.ComponentProps<Button>
>;

type Collapsible = typeof CollapsiblePrimitive.Collapsible;
type CollapsibleTrigger = typeof CollapsiblePrimitive.CollapsibleTrigger;
type CollapsibleContent = typeof CollapsiblePrimitive.CollapsibleContent;

type Input = ShadCNComponent<HTMLInputElement, React.ComponentProps<"input">>;

type Table = ShadCNComponent<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>;

type TableHeader = ShadCNComponent<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>;

type TableBody = ShadCNComponent<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>;

type TableFooter = ShadCNComponent<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>;

type TableRow = ShadCNComponent<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>;

type TableHead = ShadCNComponent<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>;

type TableCell = ShadCNComponent<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>;

type TableCaption = ShadCNComponent<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>;

type Sheet = typeof SheetPrimitive.Root;

type SheetTrigger = typeof SheetPrimitive.Trigger;

type SheetClose = typeof SheetPrimitive.Close;

type SheetPortal = typeof SheetPrimitive.Portal;

type SheetOverlay = ShadCNComponent<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>;

type SheetContent = ShadCNComponent<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>
>;

type SheetHeader = (props: React.HTMLAttributes<HTMLDivElement>) => JSX.Element;

type SheetFooter = (props: React.HTMLAttributes<HTMLDivElement>) => JSX.Element;

type SheetTitle = ShadCNComponent<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>;

type SheetDescription = ShadCNComponent<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

type Button = ShadCNComponent<HTMLButtonElement, ButtonProps>;

type Select = typeof SelectPrimitive.Root;

type SelectGroup = typeof SelectPrimitive.Group;

type SelectValue = typeof SelectPrimitive.Value;

type SelectTrigger = ShadCNComponent<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>;

type SelectScrollUpButton = ShadCNComponent<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>;

type SelectScrollDownButton = ShadCNComponent<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>;

type SelectContent = ShadCNComponent<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>;

type SelectLabel = ShadCNComponent<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>;

type SelectItem = ShadCNComponent<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>;

type SelectSeparator = ShadCNComponent<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>;

type Dialog = typeof DialogPrimitive.Root;

type DialogTrigger = typeof DialogPrimitive.Trigger;

type DialogPortal = typeof DialogPrimitive.Portal;

type DialogClose = typeof DialogPrimitive.Close;

type DialogOverlay = ShadCNComponent<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>;

type DialogContent = ShadCNComponent<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>;

type DialogHeader = (
  props: React.HTMLAttributes<HTMLDivElement>
) => JSX.Element;

type DialogFooter = (
  props: React.HTMLAttributes<HTMLDivElement>
) => JSX.Element;

type DialogTitle = ShadCNComponent<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>;

type DialogDescription = ShadCNComponent<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>;

type Label = ShadCNComponent<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>;

export type RequiredComponents = {
  Label: Label;
  Dialog: Dialog;
  DialogPortal: DialogPortal;
  DialogOverlay: DialogOverlay;
  DialogClose: DialogClose;
  DialogTrigger: DialogTrigger;
  DialogContent: DialogContent;
  DialogHeader: DialogHeader;
  DialogFooter: DialogFooter;
  DialogTitle: DialogTitle;
  DialogDescription: DialogDescription;
  Select: Select;
  SelectGroup: SelectGroup;
  SelectValue: SelectValue;
  SelectTrigger: SelectTrigger;
  SelectContent: SelectContent;
  SelectLabel: SelectLabel;
  SelectItem: SelectItem;
  SelectSeparator: SelectSeparator;
  SelectScrollUpButton: SelectScrollUpButton;
  SelectScrollDownButton: SelectScrollDownButton;
  Button: Button;
  Sheet: Sheet;
  SheetTrigger: SheetTrigger;
  SheetClose: SheetClose;
  SheetPortal: SheetPortal;
  SheetOverlay: SheetOverlay;
  SheetContent: SheetContent;
  SheetHeader: SheetHeader;
  SheetFooter: SheetFooter;
  SheetTitle: SheetTitle;
  SheetDescription: SheetDescription;
  SidebarProvider: SidebarProvider;
  Sidebar: Sidebar;
  SidebarContent: SidebarContent;
  SidebarGroup: SidebarGroup;
  SidebarGroupLabel: SidebarGroupLabel;
  SidebarGroupContent: SidebarGroupContent;
  SidebarMenu: SidebarMenu;
  SidebarMenuItem: SidebarMenuItem;
  SidebarMenuButton: SidebarMenuButton;
  SidebarTrigger: SidebarTrigger;
  Collapsible: Collapsible;
  CollapsibleTrigger: CollapsibleTrigger;
  CollapsibleContent: CollapsibleContent;
  Input: Input;
  Table: Table;
  TableHeader: TableHeader;
  TableHead: TableHead;
  TableBody: TableBody;
  TableFooter: TableFooter;
  TableRow: TableRow;
  TableCell: TableCell;
  TableCaption: TableCaption;
};
