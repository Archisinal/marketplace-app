"use client";
import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { RESOLUTION_QUERY } from "@/utils/resolutionScreens";
import { collectionData } from "@/data/collectionData";
import { createColumnHelper } from "@tanstack/react-table";
import { ImageComponent } from "@/components";
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
    enableSorting: false,
  }),
  columnHelper.accessor("itemName", {
    cell: (info) => {
      console.log("info", info);
      return (
        <div className="flex items-center gap-5 ">
          <ImageComponent
            src="/mockMembers/member.png"
            width={40}
            height={40}
          />
          <span className="truncate whitespace-nowrap">{info.getValue()}</span>
        </div>
      );
    },
    header: () => <span>COLLECTIONS</span>,
    enableSorting: true,
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
    meta: "text-center",
  }),
];

const CollectionComponent = () => {
  const data: TCollectionListItem[] = collectionData;
  const [isFilterOpen, setFilterOpen] = useState(false);
  const variants = {
    open: { width: "95%" },
    closed: { x: 0, width: "100%" },
  };

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
            suffix={<Icon name="chevronDown" width="16" height="16" />}
            title="All categories"
            styles="rounded-2xl p-3 sm:font-semibold "
          />
        </div>
        <div className={isFilterOpen ? "grid grid-cols-with-filter" : "grid "}>
          {isFilterOpen && (
            <Filter
              onClose={() => {
                setFilterOpen(false);
              }}
            />
          )}
          <motion.div
            animate={isFilterOpen ? "open" : "closed"}
            variants={variants}
          >
            <TableComponent columnsData={collectionColumns} />
          </motion.div>
        </div>
      </>
    );
  }
};

export default CollectionComponent;