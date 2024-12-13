import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import type { forwardRef } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ElementRef<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentProps<any>
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

export type RequiredComponents = {
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
