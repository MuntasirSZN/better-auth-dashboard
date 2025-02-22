"use client";

import type { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

// import { labels } from "../data/data";
// import { userSchema } from "../data/schema";
import type { RequiredComponents } from "../../../types";
import type { User } from "../UsersComponent";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  components: RequiredComponents;
  setUserViewSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUserRef: React.MutableRefObject<User | null>;
}

export function DataTableRowActions<TData>({
  row,
  components,
  setUserViewSheetOpen,
  selectedUserRef,
}: DataTableRowActionsProps<TData>) {
  const {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Button,
  } = components;
  // const user = userSchema.parse(row.original);

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
        <DropdownMenuItem
          onClick={() => {
            setUserViewSheetOpen(true);
            selectedUserRef.current = row.original as User
          }}
        >
          View
        </DropdownMenuItem>
        <DropdownMenuItem>Impersonate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Ban</DropdownMenuItem>
        <DropdownMenuItem>Unban</DropdownMenuItem>
        <DropdownMenuItem>Remove user</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
