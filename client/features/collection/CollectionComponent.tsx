"use client";
import React, { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { RESOLUTION_QUERY } from "../../utils/resolutionScreens";
import { collectionData } from "../../data/collectionData";
import { createColumnHelper } from "@tanstack/react-table";
import { getPercentageDiff } from "@/utils/formaters";

import {
  MultiButton,
  InputSearch,
  DaysFilter,
  TableComponent,
  CollectionListItem,
  Filter,
  TabNav,
} from "../../components";
import Icon from "../../icons";
import { TCollectionListItem } from "./CollectionListItem";

const daysFilterConfig = [
  { label: "1H" },
  { label: "1D" },
  { label: "7D" },
  { label: "30D" },
  { label: "All" },
];

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

const columnHelper = createColumnHelper<TColection>();

const collectionColumns = [
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
        <span className={`${value > 0 ? "text-chateau-green" : "text-red"}`}>
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
];

const CollectionComponent = () => {
  const data: TCollectionListItem[] = collectionData;
  const [isFilterOpen, setFilterOpen] = useState(false);

  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);

  if (!isDesktop) {
    return (
      <>
        {isFilterOpen && <Filter onClose={() => setFilterOpen(false)} />}
        {!isFilterOpen && (
          <>
            <TabNav onFilterClick={setFilterOpen} />
            <ul className="flex flex-col gap-5 overflow-auto">
              {data.map((collection) => {
                return (
                  <li>
                    <CollectionListItem itemData={collection} />
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </>
    );
  }

  if (isDesktop) {
    return (
      <>
        <div className="flex gap-2.5 sm:gap-5 py-3.5 items-center">
          <MultiButton
            prefix={
              isDesktop ? (
                <Icon
                  name={isFilterOpen ? "nextLeft" : "filter"}
                  width="16"
                  height="16"
                />
              ) : null
            }
            title={
              isDesktop ? (
                <span className="font-semibold">Filter</span>
              ) : (
                <Icon name="filter" />
              )
            }
            styles="md:w-24 rounded-2xl p-2.5 "
            onClick={() => setFilterOpen((prev) => !prev)}
          />
          <DaysFilter config={daysFilterConfig} initFilter="1H" />
          <InputSearch
            prefix={<Icon name="search" width="16" height="16" />}
            placeholder="Search by collections"
          />
          <MultiButton
            suffix={<Icon name="arrowDown" width="10" height="10" />}
            title="All categories"
            styles="rounded-2xl p-3 sm:font-semibold "
          />
        </div>
        <div className={isFilterOpen ? "grid grid-cols-with-filter" : "grid"}>
          {isFilterOpen && (
            <Filter
              onClose={() => {
                setFilterOpen(false);
              }}
            />
          )}
          <TableComponent columnsData={collectionColumns} />
        </div>
      </>
    );
  }
};

export default CollectionComponent;
