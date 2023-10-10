import React, { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { RESOLUTION_QUERY } from "../utils/resolutionScreens";

import { MultiButton, InputSearch } from "../components";
import Icon from "../icons";

type TTabNav = {
  onFilterClick: (cb: (v: boolean) => boolean) => void;
  isFilterOpen?: boolean;
};

const TabNav: FC<TTabNav> = ({ onFilterClick, isFilterOpen }) => {
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);

  return (
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
        styles="w-10 md:w-24 h-9 p-2 rounded-2xl px-2"
        onClick={() => onFilterClick((prev) => !prev)}
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
  );
};

export default TabNav;
