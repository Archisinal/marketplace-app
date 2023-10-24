"use client";
import React, { useState, FC } from "react";
import { motion } from "framer-motion";
import { Filter, TabNav, UserListItem } from "@/components";
import { useMediaQuery } from "react-responsive";
import { RESOLUTION_QUERY } from "@/utils/resolutionScreens";
import { cardData } from "@/data/cardItems";

const UsersCollectionComponent = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);

  const variants = {
    open: { width: "95%" },
    closed: { x: 0, width: "100%" },
  };

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
              <motion.ul
                animate={isFilterOpen ? "open" : "closed"}
                variants={variants}
                className={`${
                  isTablet ? containerClasses.tablet : containerClasses.mobile
                }`}
              >
                {cardData.map((card) => (
                  <UserListItem {...card} />
                ))}
              </motion.ul>
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
            styles="border rounded-lg dark:border-dark-gray border-stroke-gray mt-2"
          />
        )}
        <motion.ul
          animate={isFilterOpen ? "open" : "closed"}
          variants={variants}
          className={
            isFilterOpen
              ? "grid grid-cols-3 xlg:grid-cols-4 auto-rows-min gap-5"
              : "grid grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5 gap-6 auto-rows-min"
          }
        >
          {cardData.map((card) => (
            <UserListItem {...card} />
          ))}
        </motion.ul>
      </div>
    </>
  );
};

export default UsersCollectionComponent;
