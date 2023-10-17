"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, TabNav, NftListItem } from "@/components";
import { useMediaQuery } from "react-responsive";
import { RESOLUTION_QUERY } from "@/utils/resolutionScreens";

import { cardData } from "@/data/cardItems";

const NftsCollectionComponent = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);
  const variants = {
    open: { width: "95%" },
    closed: { x: 0, width: "100%" },
  };

  const containerClasses = {
    mobile: "grid grid-cols-2 gap-3",
    tablet: "grid grid-cols-3 gap-3",
    desktop: "grid grid-cols-4 gap-3",
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
                {cardData.map((nftData) => (
                  <li>
                    <NftListItem {...nftData} />
                  </li>
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
            styles="border rounded-lg border-stroke-gray dark:border-dark-gray mt-2"
          />
        )}
        <motion.ul
          animate={isFilterOpen ? "open" : "closed"}
          variants={variants}
          className={
            isFilterOpen
              ? "grid grid-cols-3 xlg:grid-cols-4 gap-3 auto-rows-min"
              : "grid grid-cols-4 lg:grid-cols-5 xlg:grid-cols-6 gap-3"
          }
        >
          {cardData.map((nftData) => (
            <li>
              <NftListItem {...nftData} />
            </li>
          ))}
        </motion.ul>
      </div>
    </>
  );
};

export default NftsCollectionComponent;
