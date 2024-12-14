"use client";

import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

// import { labels } from "../data/data";
// import { userSchema } from "../data/schema";
import type { RequiredComponents } from "../../../types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  components: RequiredComponents;
}

export function DataTableRowActions<TData>({
  //   row,
  components,
}: DataTableRowActionsProps<TData>) {
  const {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuRadioGroup,
    // DropdownMenuRadioItem,
    DropdownMenuSeparator,
    // DropdownMenuShortcut,
    // DropdownMenuSub,
    // DropdownMenuSubContent,
    // DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    Button,
  } = components;
  //   const user = userSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          // @ts-expect-error - intentional
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem>Impersonate</DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub> */}
        <DropdownMenuItem>Ban</DropdownMenuItem>
        <DropdownMenuItem>Unban</DropdownMenuItem>
        <DropdownMenuItem>Remove user</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
