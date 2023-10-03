import React, { use, useState } from "react";
import Icon from "../icons";

const TablePagination = ({ size = 23, initPage = 1 }) => {
  let second: string | number = 2;
  let beforeLast: string | number = 7;
  let mid = [3, 4, 5, 6];
  let last: string | number = 8;

  const [currentPage, setCurrentPage] = useState(initPage);

  const nextHandler = () =>
    setCurrentPage((prev) => (prev < size ? prev + 1 : size));
  const prevHandler = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));

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
  }

  const values = [1, second, ...mid, beforeLast, last];

  return (
    <div className="flex gap-2 items-center">
      <span onClick={prevHandler}>
        <Icon name="nextLeft" />
      </span>
      <div className="flex gap-2">
        {values.map((v) => (
          <div
            className={`${
              v === currentPage ? "dark:bg-dark-gray bg-white-smoke" : ""
            } px-3 py-2 rounded-lg min-w-[42px] text-center`}
          >
            {v}
          </div>
        ))}
      </div>
      <span onClick={nextHandler}>
        <Icon name="nextRight" />
      </span>
    </div>
  );
};

export default TablePagination;
