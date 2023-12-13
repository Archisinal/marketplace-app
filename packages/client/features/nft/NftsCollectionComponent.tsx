'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { NftListItem, TabNav } from '@/components';
import { cardData } from '@/data/cardItems';
import { SearchListItem } from '@/features/nft';
import { useSearchParams } from 'next/navigation';
import { NftFilter } from '@/features/nft';

type TNftsCollectionComponent = {};

const NftsCollectionComponent = ({}: TNftsCollectionComponent) => {
  const [isFilterOpen, setFilterOpen] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  //TODO: set selected category
  // console.log(searchParams.get('category'));

  const variants = {
    open: { width: '100%' },
    closed: { x: 0, width: '100%' },
  };

  const onSearchResultClick = () => {
    router.push('/explore/nft/item');
  };

  const searchCb = (searchValue: string) =>
    cardData?.filter((item) => item.name.toLowerCase().includes(searchValue));

  return (
    <>
      {/* Mobile- Tablet screen */}
      <div className="md:hidden">
        {isFilterOpen && <NftFilter onClose={() => setFilterOpen(false)} />}
        {!isFilterOpen && (
          <>
            <TabNav
              onFilterClick={setFilterOpen}
              searchCb={searchCb}
              SearchResultItemComponent={SearchListItem}
              onResultItemClick={onSearchResultClick}
            />
            <div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 ">
                {cardData.map((nftData, i) => (
                  <li key={i}>
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
        <TabNav
          onFilterClick={setFilterOpen}
          isFilterOpen={isFilterOpen}
          searchCb={searchCb}
          SearchResultItemComponent={SearchListItem}
          onResultItemClick={onSearchResultClick}
        />
        <div
          className={isFilterOpen ? 'grid grid-cols-with-filter gap-5' : 'grid'}
        >
          {isFilterOpen && (
            <NftFilter
              onClose={() => setFilterOpen(false)}
              styles="border rounded-lg border-stroke-gray dark:border-dark-gray mt-2 sticky self-start top-32 "
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
            {cardData.map((nftData, i) => (
              <li key={i}>
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
