"use client";
import React, { useState, FC } from "react";
import { Filter, TabNav, UserListItem } from "../../components";
import { useMediaQuery } from "react-responsive";
import { RESOLUTION_QUERY } from "../../utils/resolutionScreens";

const UsersCollectionComponent = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);

  if (!isDesktop) {
    return (
      <>
        {isFilterOpen && <Filter onClose={() => setFilterOpen(false)} />}
        {!isFilterOpen && (
          <>
            <TabNav onFilterClick={setFilterOpen} />
            <div>
              <ul className="flex flex-col gap-5 overflow-auto">
                <UserListItem />
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
        <ul></ul>
      </div>
    </>
  );
};

export default UsersCollectionComponent;
