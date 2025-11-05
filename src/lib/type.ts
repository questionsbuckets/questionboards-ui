import { ColumnDef } from "@tanstack/react-table";


//column def with class
export type ColumnDefWithClass<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  cellClassName?: string;
  headerClassName?: string;
};