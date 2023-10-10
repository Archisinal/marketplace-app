import React, { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "@apollo/client";
import { GET_COLLECTION_LIST } from "../mockData/queryMock";
import { RESOLUTION_QUERY } from "../utils/resolutionScreens";

import {
  MultiButton,
  InputSearch,
  DaysFilter,
  TableComponent,
  CollectionListItem,
  Filter,
  TabNav,
} from "../components";
import Icon from "../icons";
import { TCollectionListItem } from "./CollectionListItem";

const daysFilterConfig = [
  { label: "1H" },
  { label: "1D" },
  { label: "7D" },
  { label: "30D" },
  { label: "All" },
];

const CollectionComponent = () => {
  const { loading, error, data } = useQuery<{
    collections: TCollectionListItem[];
  }>(GET_COLLECTION_LIST, {
    variables: {},
  });

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
              {data?.collections.map((collection) => {
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
            styles="md:w-24 h-9 p-2 rounded-2xl px-2"
            onClick={() => setFilterOpen((prev) => !prev)}
          />
          <DaysFilter config={daysFilterConfig} initFilter="1H" />
          <InputSearch
            prefix={<Icon name="search" width="16" height="16" />}
            placeholder="Search by collections"
          />
          <MultiButton
            suffix={<Icon name="arrowDown" />}
            title="All categories"
            styles="rounded-2xl p-2 sm:font-semibold"
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
          <TableComponent />
        </div>
      </>
    );
  }
};

export default CollectionComponent;
