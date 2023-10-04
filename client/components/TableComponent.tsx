import React, { useMemo, useState } from "react";
import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { collectionData } from "../mockData/collectionData";
import { TablePagination } from "../components";
import { getPercentageDiff } from "../utils/formaters";

type TColection = {
  id?: string;
  itemName: string;
  floorPrice: number;
  currency: string;
  floorChange: number;
  volume: number;
  sales: number;
  items: string;
  owners: string;
};

const TableComponent = () => {
  const [data, setData] = useState(collectionData);
  const columnHelper = createColumnHelper<TColection>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        cell: (row) => {
          return <div>{Number(row.row.index) + 1}</div>;
        },
        header: () => <span>#</span>,
      }),
      columnHelper.accessor("itemName", {
        cell: (info) => info.getValue(),
        header: () => <span>COLLECTIONS</span>,
      }),
      columnHelper.accessor("floorPrice", {
        cell: (info) => info.getValue(),
        header: () => <span>FLOOR PRICE</span>,
      }),
      columnHelper.accessor("floorChange", {
        cell: (info) => {
          const value = info.cell.getValue();
          return (
            <span
              className={`${value > 0 ? "text-chateau-green" : "text-red"}`}
            >
              {getPercentageDiff(value)}
            </span>
          );
        },
        header: () => <span>FLOOR CHANGE</span>,
      }),
      columnHelper.accessor("volume", {
        cell: (info) => info.getValue(),
        header: () => <span>VOLUME</span>,
      }),
      columnHelper.accessor("sales", {
        cell: (info) => info.getValue(),
        header: () => <span>SALES</span>,
      }),
      columnHelper.accessor("items", {
        cell: (info) => info.getValue(),
        header: () => <span>ITEMS</span>,
      }),
      columnHelper.accessor("owners", {
        cell: (info) => info.getValue(),
        header: () => <span>OWNERS</span>,
        meta: "text-end",
      }),
    ],
    []
  );

  const table = useReactTable({
    data: collectionData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 dark:bg-black-rus">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            console.log("headerGroup", headerGroup);
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-txt-gray text-xs px-7 py-4 text-start font-normal"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody className=" shadow-tb-light dark:shadow-tb-dark rounded-2xl">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const styles = cell.column.columnDef?.meta;
                return (
                  <td className={`${styles} px-7 py-4 `} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>{" "}
      <div className="flex mt-7 justify-center">
        <TablePagination />
      </div>
    </div>
  );
};

export default TableComponent;
