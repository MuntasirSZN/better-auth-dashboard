"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { roles } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import type { RequiredComponents } from "../../../types";
import { UserPFP } from "../components/UserPFP";
import type { User } from "../UsersComponent";
import { Tag } from "lucide-react";

export const columns: (data: {
  components: RequiredComponents;
  selectedUserRef: React.MutableRefObject<User | null>;
  setUserViewSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => ColumnDef<User>[] = ({
  components,
  selectedUserRef,
  setUserViewSheetOpen,
}) => {
  const { Checkbox, Badge } = components;

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "user",
      header: ({ column }) => (
        <DataTableColumnHeader
          components={components}
          column={column}
          title="User"
        />
      ),
      accessorFn: (originalRow) => {
        return {
          image: originalRow.image,
          name: originalRow.name,
        };
      },
      filterFn: (row, _id, filterValue) => {
        return row.original.name
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      },
      cell: ({ getValue }) => {
        const { name, image } = getValue() as {
          name: string;
          image: string | undefined | null;
        };
        return (
          <div className="w-[150px] flex gap-2 items-center justify-start">
            <UserPFP
              components={components}
              image={image}
              name={
                name.includes(" ") && name.length >= 3
                  ? `${name.split(" ")[0].charAt(0).toUpperCase()}${name.split(" ")[1].charAt(0).toUpperCase()}`
                  : name.length >= 2
                    ? `${name.charAt(0).toUpperCase()}${name.charAt(1).toUpperCase()}`
                    : `${name.charAt(0).toUpperCase()}`
              }
            />
            {name}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "email",
      header: ({ column }) => (
        <DataTableColumnHeader
          components={components}
          column={column}
          title="Email"
        />
      ),
      accessorFn: (originalRow) => {
        return {
          email: originalRow.email,
          emailVerified: originalRow.emailVerified,
        };
      },
      cell: ({ getValue }) => {
        const { email, emailVerified } = getValue() as {
          email: string;
          emailVerified: boolean;
        };
        return (
          <div className="flex space-x-2">
            <span className="max-w-[200px] truncate font-medium">{email}</span>
            {emailVerified && (
              // @ts-expect-error - intentioanl
              <Badge variant="outline">verified</Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader
          components={components}
          column={column}
          title="Role"
        />
      ),
      cell: ({ row }) => {
        const status = roles.find(
          (role) => role.value === row.getValue("role")
        );
        const role_name: string = row.getValue("role");

        return (
          <div className="flex w-[100px] items-center">
            {status && status.icon ? (
              <status.icon className="w-4 h-4 mr-2 text-muted-foreground" />
            ) : (
              <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
            )}
            <span>
              {role_name.charAt(0).toUpperCase()}
              {role_name.slice(1, role_name.length)}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader
          components={components}
          column={column}
          title="Created At"
        />
      ),
      accessorFn: (originalRow) => {
        return {
          createdAt: originalRow.createdAt,
        };
      },
      cell: ({ getValue }) => {
        const { createdAt } = getValue() as {
          createdAt: Date;
        };

        return (
          <div className="flex items-center">{createdAt.toDateString()}</div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          components={components}
          row={row}
          selectedUserRef={selectedUserRef}
          setUserViewSheetOpen={setUserViewSheetOpen}
        />
      ),
    },
  ];
};
