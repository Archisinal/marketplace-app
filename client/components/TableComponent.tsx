"use client";
import React, { FC, useMemo, useState } from "react";
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
import { collectionData } from "../data/collectionData";
import { TablePagination } from "../components";

type TTableComponent = {
  columnsData: any[];
};
const TableComponent: FC<TTableComponent> = ({ columnsData }) => {
  const [data, setData] = useState(collectionData);

  const columns = useMemo(() => columnsData, []);

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
