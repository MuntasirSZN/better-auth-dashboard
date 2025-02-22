"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type Table,
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
import type { User } from "../UsersComponent";

interface DataTableProps<TData, TValue> {
  columns: (data: {
    components: RequiredComponents;
    selectedUserRef: React.MutableRefObject<User | null>;
    setUserViewSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => ColumnDef<TData, TValue>[];
  data: TData[];
  components: RequiredComponents;
  onPaginationChange: (pageIndex: number, pageSize: number) => Promise<void>;
  isLoading?: boolean;
  hasMore?: boolean;
  onSearch?: (value: string) => void;
  selectedUserRef: React.MutableRefObject<User | null>;
  setUserViewSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  components,
  onPaginationChange,
  isLoading = false,
  hasMore = true,
  onSearch,
  selectedUserRef,
  setUserViewSheetOpen,
}: DataTableProps<TData, TValue>) {
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
    if (initialLoadFetched.current === true) return;
    initialLoadFetched.current = true;
    onPaginationChange(0, pageSize);
  }, []);

  // Handle search
  const handleSearch = React.useCallback(
    (value: string) => {
      setPageIndex(0); // Reset to first page
      if (onSearch) {
        onSearch(value);
      }
    },
    [onSearch]
  );

  const columns_ = columns({
    components,
    selectedUserRef,
    setUserViewSheetOpen,
  });

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
      const firstRow = tableContainerRef.current.querySelector("tr");
      if (firstRow) {
        const cells = Array.from(firstRow.children);
        const widths = cells.map((cell) => cell.getBoundingClientRect().width);
        setTableMeasures(widths);
      }
    }
  }, [data, columnVisibility]);

  return (
    <div className="space-y-4">
      <DataTableToolbar
        rowSelection={rowSelection}
        components={components}
        table={table}
        onSearch={handleSearch}
      />
      <TableRender
        components={components}
        table={table}
        columns_={columns_}
        data={data}
        hasMore={hasMore}
        isLoading={isLoading}
        onPaginationChange={onPaginationChange}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        tableContainerRef={tableContainerRef}
        tableMeasures={tableMeasures}
      />
    </div>
  );
}

const TableRender = React.memo(
  ({
    components,
    table,
    hasMore,
    isLoading,
    tableContainerRef,
    pageIndex,
    setPageIndex,
    onPaginationChange,
    pageSize,
    tableMeasures,
    columns_,
    data,
  }: {
    components: RequiredComponents;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: Table<any>;
    isLoading: boolean;
    hasMore: boolean;
    tableContainerRef: React.RefObject<HTMLDivElement>;
    pageIndex: number;
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
    onPaginationChange: (pageIndex: number, pageSize: number) => Promise<void>;
    pageSize: number;
    tableMeasures: number[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns_: ColumnDef<any, any>[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
  }) => {
    const { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } =
      components;

    // Handle scroll-based loading
    const handleScroll = React.useCallback(() => {
      if (!tableContainerRef.current || isLoading || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } =
        tableContainerRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 20) {
        const nextPage = pageIndex + 1;
        setPageIndex(nextPage);
        onPaginationChange(nextPage, pageSize);
      }
    }, [isLoading, hasMore, pageIndex, pageSize, onPaginationChange]);

    return (
      <>
        <div className="border rounded-md h-[600px] flex flex-col">
          {/* Header with sticky positioning */}
          <div className="sticky top-0 z-10 rounded-md bg-background">
            <Table>
              <TableHeader>
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
      </>
    );
  }
);
