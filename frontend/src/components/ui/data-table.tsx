"use client";

import React, { useMemo, useState } from "react";
import {
   ChevronDownIcon,
   ChevronLeftIcon,
   ChevronRightIcon,
   ChevronsLeftIcon,
   ChevronsRightIcon,
   ChevronsUpDownIcon,
   ChevronUpIcon,
} from "lucide-react";
import {
   Table as TanstackTable,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";

// components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataTableProps {
   data: any[];
   columns: any[];
   searchColumns: string[];
}

export function DataTable({ data, columns, searchColumns }: DataTableProps) {
   const [sorting, setSorting] = useState<SortingState>([]);
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
   const [rowSelection, setRowSelection] = useState({});
   const [searchValue, setSearchValue] = useState("");

   const filteredData = useMemo(() => {
      if (!searchValue) return data;

      return data?.filter((item) => {
         return searchColumns.some((columnKey) => {
            const value = item[columnKey];
            if (value) {
               return String(value).toLowerCase().includes(searchValue.toLowerCase());
            }
            return false;
         });
      });
   }, [data, searchColumns, searchValue]);

   const table = useReactTable({
      data: filteredData,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
         rowSelection,
      },
   });

   return (
      <div className="w-full">
         <SearchInput value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
         <Table className="border-b">
            <DataTableHeader headerGroups={table.getHeaderGroups()} />
            <DataTableBody rows={table.getRowModel().rows} columns={columns} />
         </Table>
         <DataTablePagination table={table} />
      </div>
   );
}

interface SearchInputProps {
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
   return (
      <Input
         placeholder="Search..."
         value={value}
         onChange={onChange}
         className="mb-3 text-sm h-8 w-[100% ] sm:w-[200px]"
      />
   );
}

interface TableHeaderProps {
   headerGroups: any[];
}

export function DataTableHeader({ headerGroups }: TableHeaderProps) {
   return (
      <TableHeader>
         {headerGroups.map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
               {headerGroup.headers.map((header: any) => (
                  <TableHead key={header.id} className="table-heading">
                     {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
               ))}
            </TableRow>
         ))}
      </TableHeader>
   );
}

interface TableBodyProps {
   rows: any[];
   columns: any[];
}

function DataTableBody({ rows, columns }: TableBodyProps) {
   return (
      <TableBody>
         {rows.length ? (
            rows.map((row) => (
               <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="table-row">
                  {row.getVisibleCells().map((cell: any) => (
                     <TableCell key={cell.id} className="table-cell">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                     </TableCell>
                  ))}
               </TableRow>
            ))
         ) : (
            <TableRow>
               <TableCell colSpan={columns.length} className="text-center">
                  No results found.
               </TableCell>
            </TableRow>
         )}
      </TableBody>
   );
}

interface DataTablePaginationProps<TData> {
   table: TanstackTable<TData>;
}

function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
   return (
      <div className="flex items-center justify-between px-2 py-4">
         <div className="flex-1 text-xs text-muted-foreground">
            Total: {table.getFilteredRowModel().rows.length} records.
         </div>
         <div className="flex items-center space-x-2">
            <div className="text-xs text-muted-foreground">
               Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
               <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
               >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeftIcon className="h-4 w-4" />
               </Button>
               <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
               >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon className="h-4 w-4" />
               </Button>
               <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
               >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon className="h-4 w-4" />
               </Button>
               <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
               >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRightIcon className="h-4 w-4" />
               </Button>
            </div>
         </div>
      </div>
   );
}

interface ActionButtonProps {
   icon: React.ReactNode;
   color: string;
   onClick: () => void;
}

export function ActionButton({ icon, color, onClick }: ActionButtonProps) {
   return (
      <Button variant="ghost" size="icon" className={`h-6 w-6 transition-all ${color}`} onClick={onClick}>
         {icon}
      </Button>
   );
}

interface SortableHeaderProps {
   name: string;
   isSorted: boolean | "asc" | "desc";
   onToggleSorting: () => void;
}

export function SortableHeader({ name, isSorted, onToggleSorting }: SortableHeaderProps) {
   return (
      <div className="flex items-center cursor-pointer" onClick={() => onToggleSorting()}>
         {name}
         {isSorted === "asc" && <ChevronUpIcon className="ml-1.5 h-3.5 w-3.5" />}
         {isSorted === "desc" && <ChevronDownIcon className="ml-1.5 h-3.5 w-3.5" />}
         {!isSorted && <ChevronsUpDownIcon className="ml-1.5 h-3.5 w-3.5" />}
      </div>
   );
}
