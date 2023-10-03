import React from "react";
import { useMediaQuery } from "react-responsive";
import {
  MultiButton,
  InputSearch,
  DaysFilter,
  TableComponent,
} from "../components";
import Icon from "../icons";
import { RESOLUTION_QUERY } from "../utils/resolutionScreens";

const daysFilterConfig = [
  { label: "1H" },
  { label: "1D" },
  { label: "7D" },
  { label: "30D" },
  { label: "All" },
];

const CollectionComponent = () => {
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);

  if (!isDesktop) {
    return (
      <>
        <div className="flex gap-2.5 sm:gap-5 py-3.5 items-center">
          <MultiButton
            prefix={<Icon name="filter" />}
            title=""
            styles="w-10 h-9 p-2 rounded-2xl px-2"
          />
          <InputSearch
            prefix={<Icon name="search" width="16" height="16" />}
            placeholder="Search by collections"
          />
          {!isTablet && (
            <MultiButton
              prefix={<Icon name="sort" />}
              title=""
              styles="w-10 h-9  p-2 rounded-2xl"
            />
          )}
          {isTablet && (
            <>
              <MultiButton
                suffix={<Icon name="arrowDown" />}
                title="25h"
                styles=" rounded-2xl p-2 sm:font-semibold"
              />
              <MultiButton
                suffix={<Icon name="arrowDown" />}
                title="All categories"
                styles="rounded-2xl p-2 sm:font-semibold"
              />
            </>
          )}
        </div>
        <div></div>
      </>
    );
  }

  if (isDesktop) {
    return (
      <>
        <div className="flex gap-2.5 sm:gap-5 py-3.5 items-center">
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
        <div>
          <TableComponent />
        </div>
      </>
    );
  }
};

export default CollectionComponent;
