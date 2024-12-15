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
  onSearch?: (value: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  components,
  onPaginationChange,
  isLoading = false,
  hasMore = true,
  onSearch,
}: DataTableProps<TData, TValue>) {
  const {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } = components;

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pageIndex, setPageIndex] = React.useState(0);
  const pageSize = 10;

  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [tableMeasures, setTableMeasures] = React.useState<number[]>([]);

  const initialLoadFetched = React.useRef(false);

  // Initial load
  React.useEffect(() => {
    if(initialLoadFetched.current === true) return;
    initialLoadFetched.current = true;
    onPaginationChange(0, pageSize);
  }, []);

  // Handle scroll-based loading
  const handleScroll = React.useCallback(() => {
    if (!tableContainerRef.current || isLoading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;
    if (scrollHeight - scrollTop <= clientHeight + 20) {
      const nextPage = pageIndex + 1;
      setPageIndex(nextPage);
      onPaginationChange(nextPage, pageSize);
    }
  }, [isLoading, hasMore, pageIndex, pageSize, onPaginationChange]);

  // Handle search
  const handleSearch = React.useCallback((value: string) => {
    setPageIndex(0); // Reset to first page
    if (onSearch) {
      onSearch(value);
    }
  }, [onSearch]);

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

  // Measure table column widths after initial render
  React.useEffect(() => {
    if (tableContainerRef.current) {
      const firstRow = tableContainerRef.current.querySelector('tr');
      if (firstRow) {
        const cells = Array.from(firstRow.children);
        const widths = cells.map(cell => cell.getBoundingClientRect().width);
        setTableMeasures(widths);
      }
    }
  }, [data]);

  return (
    <div className="space-y-4">
      <DataTableToolbar components={components} table={table} onSearch={handleSearch} />

      {/* Fixed height container */}
      <div className="border rounded-md h-[600px] flex flex-col">
        {/* Header with sticky positioning */}
        <div className="sticky top-0 z-10 rounded-md bg-background">
          <Table>
            <TableHeader >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: tableMeasures[index] }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
          </Table>
        </div>

        {/* Scrollable body */}
        <div
          ref={tableContainerRef}
          className="flex-1 overflow-auto"
          onScroll={handleScroll}
        >
          <Table>
            <TableBody>
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

              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={columns_.length}
                    className="h-12 text-center"
                  >
                    Loading more...
                  </TableCell>
                </TableRow>
              )}

              {!hasMore && !isLoading && data.length > 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns_.length}
                    className="h-12 text-center text-muted-foreground"
                  >
                    No more users to load
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}