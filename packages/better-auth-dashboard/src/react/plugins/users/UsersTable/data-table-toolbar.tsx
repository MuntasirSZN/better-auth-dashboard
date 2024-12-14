"use client";

import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { DataTableViewOptions } from "./data-table-view-options";

import { roles } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import type { RequiredComponents } from "../../../types";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  components: RequiredComponents;
}

export function DataTableToolbar<TData>({
  table,
  components,
}: DataTableToolbarProps<TData>) {
  const { Button, Input } = components;
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-1 space-x-2">
        <Input
          placeholder="Filter users..."
          value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("user")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            components={components}
            column={table.getColumn("role")}
            title="Role"
            options={roles}
          />
        )}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            components={components}
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            // @ts-expect-error - intentional
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions components={components} table={table} />
    </div>
  );
}
