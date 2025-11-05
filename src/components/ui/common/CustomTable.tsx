"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnDefWithClass } from "@/lib/type";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDefWithClass<TData, TValue>[];
  data: TData[];
  enableSorting?: boolean;

  /** selection */
  enableRowSelection?: boolean;
  rowSelection?: Record<string, boolean>;
  onRowSelectionChange?: (updater: any) => void;
  getRowId?: (row: TData) => string;

  /** infinite scroll */
  useInfiniteScroll?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<TData[], Error>>;

  /** pagination */
  page?: number;
  handleChangePage?: (page: number) => void;
  total?: number;
  limit?: number;

  /** styling */
  striped?: boolean;
  headerBgClass?: string;
  rowBgClass?: string;
  rowAltBgClass?: string;
}

function getPaginationRange({
  currentPage,
  totalPages,
  siblingCount = 1,
}: {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
}): (number | "...")[] {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
  const rightSiblingIndex = Math.min(
    currentPage + siblingCount,
    totalPages - 1
  );

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  const range: (number | "...")[] = [1];

  if (showLeftEllipsis) {
    range.push("...");
  }

  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    range.push(i);
  }

  if (showRightEllipsis) {
    range.push("...");
  }

  range.push(totalPages);

  return range;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  enableRowSelection = false,
  rowSelection,
  onRowSelectionChange,
  getRowId,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  enableSorting = false,
  striped = false,
  headerBgClass,
  rowBgClass = "bg-white",
  rowAltBgClass,
  useInfiniteScroll = false,
  page = 1,
  total = 0,
  limit = 10,
  handleChangePage = () => {},  
}: DataTableProps<TData, TValue>) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  // inject checkbox column if row selection is enabled
  const finalColumns: ColumnDefWithClass<TData, TValue>[] = enableRowSelection
    ? [
        {
          id: "__select",
          header: ({ table }) => (
            <Checkbox
              className="cursor-pointer bg-white text-white"
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              className="cursor-pointer bg-white"
              checked={row.getIsSelected()}
              onCheckedChange={row.getToggleSelectedHandler()}
            />
          ),
          headerClassName: "min-w-[50px]",
          cellClassName: "min-w-[50px]",
        },
        ...columns,
      ]
    : columns;

  const table = useReactTable({
    data,
    columns: finalColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      ...(enableRowSelection && { rowSelection }),
    },
    ...(enableRowSelection && {
      enableRowSelection,
      onRowSelectionChange,
      getRowId,
    }),
    enableSorting,
  });

  // Infinite scroll
  useEffect(() => {
    if (!useInfiniteScroll) return;
    if (!loadMoreRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage?.();
    });
    observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="h-full flex flex-col">
      <div className="w-full grow overflow-auto">
        <Table className="relative border-separate border-spacing-x-0  ">
          <TableHeader
            className={`sticky top-0 ${headerBgClass} bg-background h-9 text-sm font-normal z-[10]`}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border ">
                {headerGroup.headers.map((header, i) => (
                  <TableHead
                    key={i}
                    className={clsx(
                      "relative h-[40px] first:rounded-l-lg text-primary-text! text-sm! font-normal! opacity-70! last:rounded-r-lg",
                      (
                        header.column.columnDef as ColumnDefWithClass<
                          TData,
                          TValue
                        >
                      ).headerClassName
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {i !== headerGroup.headers.length - 1 && (
                      <div className="absolute top-0 right-0 bottom-0 hidden w-[1px] bg-white md:block" />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={i}
                  data-state={
                    enableRowSelection && row.getIsSelected()
                      ? "selected"
                      : undefined
                  }
                  className={clsx(
                    "mb-2 h-[40px] md:h-[50px] border border-background border-b last:border-b",
                    striped ? rowBgClass : rowBgClass
                  )}
                >
                  {row.getVisibleCells().map((cell, i) => (
                    <TableCell
                      key={i}
                      className={clsx(
                        "relative first:rounded-l-lg last:rounded-r-lg px-3 py-4  !border-b text-base font-normal text-primary-text",
                        (
                          cell.column.columnDef as ColumnDefWithClass<
                            TData,
                            TValue
                          >
                        ).cellClassName
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {i !== row.getVisibleCells().length - 1 && (
                        <div className="absolute top-3 right-0 bottom-3 hidden w-[1.5px] bg-background md:block" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={finalColumns.length}
                  className="h-24 text-center"
                >
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {useInfiniteScroll && fetchNextPage && (
        <div ref={loadMoreRef} className="p-4 text-center">
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Scroll to load more"
            : "No more data"}
        </div>
      )}

      {!useInfiniteScroll && total > 0 && (
        <div className="w-full flex flex-col-reverse md:flex-row gap-3 justify-between items-center mt-3">
          <p className="text-black/50 text-base font-semibold">
            Result per page 10
          </p>
          <div>
            <Pagination>
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      className="border border-primary h-10 md:h-12 md:w-26.5"
                      href={`?page=${Math.max(1, page - 1)}`}
                      onClick={() => handleChangePage(Math.max(1, page - 1))}
                    />
                  </PaginationItem>
                )}

                {getPaginationRange({
                  currentPage: page,
                  totalPages: Math.ceil(total / limit),
                }).map((item, index) => (
                  <PaginationItem key={index}>
                    {item === "..." ? (
                      <PaginationEllipsis className="border border-primary rounded-md size-10 md:size-12" />
                    ) : (
                      <PaginationLink
                        className={clsx(
                          "border border-primary size-10 md:size-12",
                          item === page && "bg-primary text-primary-foreground"
                        )}
                        // href={`?page=${item}`}
                        isActive={item === page}

                        onClick={() => handleChangePage(item)}
                      >
                        {item}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                {page < Math.ceil(total / limit) && (
                  <PaginationItem>
                    <PaginationNext
                      className="border border-primary h-10 md:h-12 md:w-26.5"
                      // href={`?page=${Math.min(total, page + 1)}`}
                      onClick={() => handleChangePage(Math.min(total, page + 1))}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}
