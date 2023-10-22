"use client";
import React, { FC, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Table as ReactTable,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { TablePagination, MultiButton, Icon } from "@/components";

type TTableComponent = {
  columnsData: any[];
  tableData: any[];
  pagination?: boolean;
};

const DEFAULT_ROW_COUNTS = [10, 20, 30, 40, 50];

const ShowRowsCount = ({
  rowCountsArray = DEFAULT_ROW_COUNTS,
  table,
}: {
  rowCountsArray?: number[];
  table: { [key: string]: any };
}) => {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <div className="font-semibold flex gap-2.5 items-center">
      <span className="text-xs text-txt-gray">Show rows</span>
      <div className="relative">
        <MultiButton
          title={table.getState().pagination.pageSize}
          suffix={<Icon name="chevronDown" />}
          styles="rounded-lg p-2 bg-white-smoke text-sm"
          onClick={() => setExpanded(!isExpanded)}
        />
        <ul
          className={twMerge(
            "absolute cursor-pointer bg-white-smoke  flex flex-col items-center rounded-b-xl text-sm w-full",
            isExpanded ? "" : "hidden"
          )}
        >
          {rowCountsArray.map((pageSize) => (
            <li
              className="dark:bg-dark-gray  py-1  min-w-full text-center hover:bg-stroke-gray dark:hover:opacity-90"
              onClick={(e) => {
                table.setPageSize(pageSize);
                setExpanded(false);
              }}
              key={pageSize}
            >
              {pageSize}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

type TPageInfo = { pageSize: number; pageIndex: number; dataLength: number };

const PageInfo: FC<TPageInfo> = ({ pageSize, pageIndex, dataLength }) => {
  return (
    <div className="flex gap-2 text-xs text-txt-gray font-semibold items-center">
      <span>Showing</span>
      <span>{`${pageIndex + 1} - ${pageSize}`}</span>
      <span>{`out of ${dataLength}`}</span>
    </div>
  );
};

const TableComponent: FC<TTableComponent> = ({
  columnsData,
  tableData,
  pagination = true,
}) => {
  const [data, setData] = useState(tableData);

  const columns = useMemo(() => columnsData, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
  });

  return (
    <div className="p-2 dark:bg-black-rus">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-txt-gray text-xs  py-4 text-start font-normal cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={twMerge(
                          "gap-2 rounded-lg  p-2 w-max flex",
                          header.column.getIsSorted()
                            ? "bg-button-gray text-black dark:bg-dark-gray dark:text-white"
                            : ""
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.columnDef.enableSorting && (
                          <div className="w-3.5">
                            {header.column.getIsSorted() == "asc" && (
                              <Icon name="arrowDown" width="14" height="14" />
                            )}
                            {header.column.getIsSorted() == "desc" && (
                              <Icon name="arrowUp" width="14" height="14" />
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody className=" shadow-tb-light dark:shadow-tb-dark rounded-2xl">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:dark:bg-dark-gray hover:bg-white-smoke cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => {
                const styles = cell.column.columnDef?.meta;
                return (
                  <td
                    className={twMerge("px-7 py-4 ", styles as string)}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>{" "}
      {pagination && (
        <div className="flex mt-7 justify-between">
          <PageInfo
            pageIndex={table.getState().pagination.pageIndex}
            pageSize={table.getState().pagination.pageSize}
            dataLength={data.length}
          />
          <TablePagination table={table} />
          <ShowRowsCount table={table} />
        </div>
      )}{" "}
    </div>
  );
};

export default TableComponent;
