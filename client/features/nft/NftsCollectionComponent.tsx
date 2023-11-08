'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, NftListItem, TabNav } from '@/components';
import { cardData } from '@/data/cardItems';

type TNftsCollectionComponent = {};

const NftsCollectionComponent = ({}: TNftsCollectionComponent) => {
  const [isFilterOpen, setFilterOpen] = useState(true);
  const variants = {
    open: { width: '100%' },
    closed: { x: 0, width: '100%' },
  };

  return (
    <>
      {/* Mobile- Tablet screen */}
      <div className="md:hidden">
        {isFilterOpen && <Filter onClose={() => setFilterOpen(false)} />}
        {!isFilterOpen && (
          <>
            <TabNav onFilterClick={setFilterOpen} />
            <div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 ">
                {cardData.map((nftData) => (
                  <li>
                    <NftListItem {...nftData} />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Desktop screen  */}
      <div className="hidden md:block">
        <TabNav onFilterClick={setFilterOpen} isFilterOpen={isFilterOpen} />
        <div
          className={isFilterOpen ? 'grid grid-cols-with-filter gap-5' : 'grid'}
        >
          {isFilterOpen && (
            <Filter
              onClose={() => setFilterOpen(false)}
              styles="border rounded-lg border-stroke-gray dark:border-dark-gray mt-2"
            />
          )}
          <motion.ul
            animate={isFilterOpen ? 'open' : 'closed'}
            variants={variants}
            className={
              isFilterOpen
                ? 'grid auto-rows-min grid-cols-3 gap-5 xlg:grid-cols-4'
                : 'grid grid-cols-4 gap-4 md:gap-5 lg:grid-cols-5 xlg:grid-cols-6'
            }
          >
            {cardData.map((nftData) => (
              <li>
                <NftListItem {...nftData} />
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </>
  );
};

export default NftsCollectionComponent;
