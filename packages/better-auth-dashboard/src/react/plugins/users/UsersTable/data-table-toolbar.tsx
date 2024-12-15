"use client";

import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { DataTableViewOptions } from "./data-table-view-options";
import { roles } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import type { RequiredComponents } from "../../../types";
import { CreateUserDialog } from "../components/CreateUserDialog";
import { UserActionsButton } from "../components/UserActionsButton";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  components: RequiredComponents;
  onSearch?: (value: string) => void;
  rowSelection: object;
}

export function DataTableToolbar<TData>({
  table,
  components,
  onSearch,
  rowSelection,
}: DataTableToolbarProps<TData>) {
  const { Button, Input } = components;
  const isFiltered = table.getState().columnFilters.length > 0;
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [localSearchValue, setLocalSearchValue] = useState("");

  // Handle local filtering and server-side search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSearchValue(value);

    // Update local table filter
    table.getColumn("user")?.setFilterValue(value);

    // Debounce server-side search
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      if (onSearch) {
        onSearch(value);
      }
    }, 500);

    setSearchTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-1 space-x-2">
        <form autoComplete="off">
          <Input
            placeholder="Filter users..."
            value={localSearchValue}
            onChange={handleSearchChange}
            autoComplete="off"
            type="text"
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </form>
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            components={components}
            column={table.getColumn("role")}
            title="Role"
            options={roles}
          />
        )}
        {isFiltered && (
          <Button
            // @ts-expect-error - intentional
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setLocalSearchValue("");
              if (onSearch) {
                onSearch("");
              }
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions components={components} table={table} />
      {Object.keys(rowSelection).length > 0 ? (
        <UserActionsButton components={components} />
      ) : (
        <CreateUserDialog components={components} />
      )}
    </div>
  );
}
