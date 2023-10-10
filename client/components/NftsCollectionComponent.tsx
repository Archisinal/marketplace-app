import React, { useState } from "react";
import { Filter, TabNav, NftListItem } from "../components";
import { useMediaQuery } from "react-responsive";
import { RESOLUTION_QUERY } from "../utils/resolutionScreens";

import { auctionData } from "../mockData/auctionItems";

const NftsCollectionComponent = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);

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
                  isDesktop
                    ? containerClasses.desktop
                    : isTablet
                    ? containerClasses.tablet
                    : containerClasses.mobile
                }`}
              >
                {auctionData.map((nftData) => (
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
            styles="border rounded-lg border-stroke-gray mt-2"
          />
        )}
        <ul
          className={
            isFilterOpen
              ? "grid grid-cols-3 gap-3 auto-rows-min"
              : "grid grid-cols-4 gap-3"
          }
        >
          {auctionData.map((nftData) => (
            <li>
              <NftListItem {...nftData} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NftsCollectionComponent;
