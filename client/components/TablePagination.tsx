"use client";
import React, { useState, FC } from "react";
import Icon from "../icons";

type TTablePagination = {
  initPage?: number;
  table: { [key: string]: any };
};

const TablePagination: FC<TTablePagination> = ({ initPage = 1, table }) => {
  let second: string | number = 2;
  let beforeLast: string | number = 7;
  let mid = [3, 4, 5, 6];
  let last: string | number = 8;
  let values = [];

  const [currentPage, setCurrentPage] = useState(initPage);

  // For demo only
  const size = 23;

  // Use for real data!
  // const size = table.getPageCount();
  const nextHandler = () => {
    table.nextPage();
    setCurrentPage((prev) => (prev < size ? prev + 1 : size));
  };

  const prevHandler = () => {
    table.previousPage();
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const onPageClick = (pageNumber: any) => () => {
    if (!isNaN(pageNumber)) {
      table.setPageIndex(Number(pageNumber) - 1);
      setCurrentPage(pageNumber);
    }
  };

  if (size > 8) {
    last = size;
    beforeLast = "...";

    if (currentPage > 6) {
      if (currentPage > size - 6) {
        beforeLast = size - 1;
        const midStart = size - 5;
        //@ts-ignore
        mid = [...Array(4).keys()].map((i) => midStart + i);
      } else {
        //@ts-ignore
        mid = [...Array(4).keys()].map((i) => currentPage + i);
      }
      second = "...";
    }
    values = [1, second, ...mid, beforeLast, last];
  } else {
    values = Array.from({ length: size }, (_, i) => i + 1);
  }

  return (
    <div className="flex gap-2 items-center">
      <button disabled={!table.getCanPreviousPage()} onClick={prevHandler}>
        <Icon name="nextLeft" />
      </button>
      <div className="flex gap-2">
        {values.map((v, i) => (
          <div
            key={i}
            onClick={onPageClick(v)}
            className={`cursor-pointer text-sm font-semibold ${
              v === currentPage ? "dark:bg-dark-gray bg-white-smoke" : ""
            } px-3 py-2 rounded-lg min-w-[42px] text-center`}
          >
            {v}
          </div>
        ))}
      </div>
      <button disabled={!table.getCanNextPage()} onClick={nextHandler}>
        <Icon name="nextRight" />
      </button>
    </div>
  );
};

export default TablePagination;
