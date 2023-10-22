"use client";
import React, { useState, FC, useEffect } from "react";
import { useAnimate } from "framer-motion";
import { Icon, InputSearch, DropDown, Button } from "../components";
import { twMerge } from "tailwind-merge";

const defaultStatuses = [
  { label: "All", value: "all" },
  { label: "By now", value: "byNow" },
  { label: "Auctions", value: "auctions" },
];

const defaultFilterOptions = [
  {
    label: "Category",
    value: "category",
    component: () => <h3 className="text-txt-gray">Filter ComponentB</h3>,
  },
  {
    label: "Price",
    value: "price",
    component: () => <h3 className="text-txt-gray">Filter Component</h3>,
  },
  {
    label: "Marketplace",
    value: "marketplace",
    component: () => <h3 className="text-txt-gray">Filter Component</h3>,
  },
  {
    label: "Type",
    value: "type",
    component: () => <h3 className="text-txt-gray">Filter Component</h3>,
  },
  {
    label: "Options",
    value: "options",
    component: () => <h3 className="text-txt-gray">Filter Component</h3>,
  },
];
// TODO: Handling selected filters

type TFilter = {
  statuses?: { label: string; value: string }[];
  filteroptions?: {
    label: string;
    value: string;
    component: React.ReactNode;
  }[];
  onClose: () => void;
  styles?: string;
};

const Filter: FC<TFilter> = ({
  statuses = defaultStatuses,
  filteroptions = defaultFilterOptions,
  onClose,
  styles,
}) => {
  const [selectedFilters, setFilters] = useState({
    status: statuses[0].value,
  });
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(scope.current, { x: [-100, 0] }, { duration: 0.5 });
  }, []);

  return (
    <div className={`${styles} px-3.5 py-7 h-max`} ref={scope}>
      <div className="flex justify-between text-2xl font-bold">
        <p>FILTER</p>
        <span onClick={onClose}>
          <Icon name="close" />
        </span>
      </div>
      <div className="pt-7 text-xl flex flex-col gap-3.5 ">
        <p className="font-semibold">Status</p>
        <ul className="flex gap-3.5">
          {statuses.map(({ label, value }, i) => {
            const isActive = selectedFilters.status === value;
            return (
              <li
                key={i}
                className={twMerge(
                  " text-lg py-2 px-4 rounded-lg whitespace-nowrap",
                  isActive
                    ? "dark:bg-white dark:text-black bg-black text-white border"
                    : "dark:bg-dark-gray dark:text-txt-gray dark:border-none bg-white text-txt-gray border border-txt-gray"
                )}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
              >
                {label}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pt-5 flex flex-col gap-3.5">
        <p className="font-semibold text-xl">Price</p>
        <div className="flex gap-2 items-center pr-14 sm:w-2/4 md:w-full">
          <InputSearch placeholder="Min" styles="rounded-lg w-28" />
          <span className="text-txt-gray">to</span>
          <InputSearch placeholder="Max" styles="rounded-lg w-28" />
        </div>
      </div>
      <div className="pt-5">
        <ul>
          {filteroptions.map((filter, i) => {
            return (
              <DropDown
                key={i}
                label={filter.label}
                Component={filter.component as React.ElementType}
              />
            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-7">
        <Button
          title="Reset all"
          color="silver"
          className="rounded-xl !text-lg "
        />
        <Button title="Apply" color="black" className="rounded-xl !text-lg" />
      </div>
    </div>
  );
};

export default Filter;
