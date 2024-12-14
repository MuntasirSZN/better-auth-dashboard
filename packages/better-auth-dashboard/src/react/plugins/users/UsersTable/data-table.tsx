"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTableToolbar } from "./data-table-toolbar";
import type { RequiredComponents } from "../../../types";

interface DataTableProps<TData, TValue> {
  columns: (components: RequiredComponents) => ColumnDef<TData, TValue>[];
  data: TData[];
  components: RequiredComponents;
  onPaginationChange: (pageIndex: number, pageSize: number) => Promise<void>;
  isLoading?: boolean;
  hasMore?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  components,
  onPaginationChange,
  isLoading = false,
  hasMore = true,
}: DataTableProps<TData, TValue>) {
  const {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Button,
  } = components;

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pageIndex, setPageIndex] = React.useState(0);
  const pageSize = 10; // Fixed page size

  // Initial load
  React.useEffect(() => {
    onPaginationChange(0, pageSize);
  }, []);

  const columns_ = columns(components);

  const table = useReactTable({
    data,
    columns: columns_,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const loadMore = () => {
    const nextPage = pageIndex + 1;
    setPageIndex(nextPage);
    onPaginationChange(nextPage, pageSize);
  };

  return (
    <div className="space-y-4">
      <DataTableToolbar components={components} table={table} />
      <div className="border rounded-md">
        <Table className="overflow-hidden">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="overflow-auto max-h-[650px]">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns_.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-4">
        {isLoading ? (
          <Button disabled>Loading...</Button>
        ) : hasMore ? (
          <Button onClick={loadMore}>Load More</Button>
        ) : (
          <Button disabled>No more users</Button>
        )}
      </div>
    </div>
  );
}
