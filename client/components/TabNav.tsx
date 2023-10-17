import React, { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { RESOLUTION_QUERY } from "../utils/resolutionScreens";

import { MultiButton, InputSearch } from "../components";
import Icon from "../icons";

type TTabNav = {
  onFilterClick: (cb: (v: boolean) => boolean) => void;
  isFilterOpen?: boolean;
};

const ICON_SIZE = {
  small: "16",
  medium: "20",
};

const TabNav: FC<TTabNav> = ({ onFilterClick, isFilterOpen }) => {
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);

  const iconSize = isTablet ? ICON_SIZE.medium : ICON_SIZE.small;
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
            <Icon name="filter" width={iconSize} height={iconSize} />
          )
        }
        styles="md:w-24 p-3 rounded-xl bg-white-smoke mx-auto"
        onClick={() => onFilterClick((prev) => !prev)}
      />
      <InputSearch
        prefix={<Icon name="search" width="16" height="16" />}
        placeholder="Search by collections"
      />
      {!isTablet && (
        <MultiButton
          prefix={<Icon name="sort" width={iconSize} height={iconSize} />}
          title=""
          styles="p-3 rounded-xl bg-white-smoke"
        />
      )}
      {isTablet && !isDesktop && (
        <>
          <MultiButton
            suffix={<Icon name="chevronDown" />}
            title="25h"
            styles=" rounded-2xl p-2.5 sm:font-semibold bg-white-smoke"
          />
          <MultiButton
            suffix={<Icon name="chevronDown" />}
            title="All categories"
            styles="rounded-2xl p-2.5 sm:font-semibold bg-white-smoke"
          />
        </>
      )}
      {isDesktop && (
        <MultiButton
          suffix={<Icon name="chevronDown" />}
          title="Newests"
          styles="rounded-2xl p-2.5 sm:font-semibold bg-white-smoke"
        />
      )}
    </div>
  );
};

export default TabNav;
