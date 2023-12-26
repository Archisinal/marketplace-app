'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TabNav, UserListItem } from '@/components';
import { cardData } from '@/data/cardItems';
import { SearchListItem } from '@/features/user';

const UsersCollectionComponent = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const router = useRouter();

  const variants = {
    open: { width: '100%' },
    closed: { x: 0, width: '100%' },
  };

  const searchCb = (searchValue: string) =>
    cardData.filter((card) =>
      card.owner.name.toLocaleLowerCase().includes(searchValue),
    );

  const onSearchResultClick = () => {
    router.push('/user/profileEdit');
  };

  return (
    <>
      {/* Mobile - Tablet screen */}
      <div className="md:hidden">
        {/*{isFilterOpen && <Filter onClose={() => setFilterOpen(false)} />}*/}
        {!isFilterOpen && (
          <>
            <TabNav
              onFilterClick={setFilterOpen}
              searchCb={searchCb}
              onResultItemClick={onSearchResultClick}
              SearchResultItemComponent={SearchListItem}
            />
            <div>
              <motion.ul
                animate={isFilterOpen ? 'open' : 'closed'}
                variants={variants}
                className="grid grid-cols-1 gap-3"
              >
                {cardData.map((card) => (
                  <UserListItem {...card} key={card.name} />
                ))}
              </motion.ul>
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
          onResultItemClick={onSearchResultClick}
          SearchResultItemComponent={SearchListItem}
        />
        <div
          className={isFilterOpen ? 'grid grid-cols-with-filter gap-5' : 'grid'}
        >
          {/*{isFilterOpen && (*/}
          {/*  // <Filter*/}
          {/*  //   onClose={() => setFilterOpen(false)}*/}
          {/*  //   styles="border rounded-lg dark:border-dark-gray border-stroke-gray mt-2"*/}
          {/*  // />*/}
          {/*)}*/}
          <motion.ul
            animate={isFilterOpen ? 'open' : 'closed'}
            variants={variants}
            className={
              isFilterOpen
                ? 'grid auto-rows-min grid-cols-3 gap-5 xlg:grid-cols-4'
                : 'grid auto-rows-min grid-cols-3 gap-6 lg:grid-cols-4 xlg:grid-cols-5'
            }
          >
            {cardData.map((card) => (
              <UserListItem {...card} key={card.name} />
            ))}
          </motion.ul>
        </div>
      </div>
    </>
  );
};

export default UsersCollectionComponent;
