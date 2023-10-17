"use client";
import React, { useState, FC } from "react";
import { Filter, TabNav, UserListItem } from "@/components";
import { useMediaQuery } from "react-responsive";
import { RESOLUTION_QUERY } from "@/utils/resolutionScreens";
import { cardData } from "@/data/cardItems";

const UsersCollectionComponent = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);

  const containerClasses = {
    mobile: "grid grid-cols-1 gap-3",
    tablet: "grid grid-cols-1 gap-3",
    desktop: "grid grid-cols-3 gap-3",
  };

  if (!isDesktop) {
    return (
      <>
        {isFilterOpen && <Filter onClose={() => setFilterOpen(false)} />}
        {!isFilterOpen && (
          <>
            <TabNav onFilterClick={setFilterOpen} />
            <div>
              <ul
                className={`${
                  isTablet ? containerClasses.tablet : containerClasses.mobile
                }`}
              >
                {cardData.map((card) => (
                  <UserListItem {...card} />
                ))}
              </ul>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <TabNav onFilterClick={setFilterOpen} isFilterOpen={isFilterOpen} />
      <div
        className={isFilterOpen ? "grid grid-cols-with-filter gap-5" : "grid"}
      >
        {isFilterOpen && (
          <Filter
            onClose={() => setFilterOpen(false)}
            styles="border rounded-lg border-stroke-gray mt-2"
          />
        )}
        <ul className="grid grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5 gap-3 auto-rows-min">
          {cardData.map((card) => (
            <UserListItem {...card} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default UsersCollectionComponent;
