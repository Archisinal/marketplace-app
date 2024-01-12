'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { NftListItem, TabNav } from '@/components';
import { cardData } from '@/data/cardItems';
import { SearchListItem } from '@/features/nft';
import { useSearchParams } from 'next/navigation';
import { NftFilter } from '@/features/nft';
import { AutoSizer, CellMeasurerCache, Grid } from 'react-virtualized';

type TNftsCollectionComponent = {};

const NftsCollectionComponent = ({}: TNftsCollectionComponent) => {
  const [isFilterOpen, setFilterOpen] = useState(true);
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [gridRef, setGridRef] = useState(null);

  const cache = new CellMeasurerCache({
    defaultWidth: 280,
    minWidth: 240,
    fixedHeight: true,
  });

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
        {isMobileFilterOpen && (
          <NftFilter onClose={() => setMobileFilterOpen(false)} />
        )}
        {!isMobileFilterOpen && (
          <>
            <TabNav
              onFilterClick={setMobileFilterOpen}
              searchCb={searchCb}
              SearchResultItemComponent={SearchListItem}
              onResultItemClick={onSearchResultClick}
            />
            <div className="-ml-2 -mr-2">
              <AutoSizer
                onResize={() => {
                  //@ts-ignore
                  gridRef?.recomputeGridSize({ columnIndex: 0, rowIndex: 0 });
                }}
                style={{ width: 0, overflow: 'visible', height: undefined }}
              >
                {({ width, height }) => {
                  const columnCount = () => {
                    if (width > 620) return 3;
                    if (width > 350) return 2;
                    return 1;
                  };

                  const columns = columnCount();

                  const listItemWidth = width / columns;
                  const listItemHeight = listItemWidth * 1.35;
                  const rowHeight = listItemHeight;
                  const rowCount = Math.ceil(cardData.length / columns);
                  const newHeight = listItemHeight * rowCount;

                  console.log(listItemWidth, listItemHeight);

                  return (
                    <Grid
                      ref={(ref) => {
                        //@ts-ignore
                        setGridRef(ref);
                      }}
                      style={{ overflow: 'visible!important' }}
                      autoHeight
                      containerStyle={{ overflow: 'visible!important' }}
                      cellRenderer={({ key, style }) => {
                        const newStyle = { ...style };
                        newStyle.height = listItemHeight;
                        newStyle.width = listItemWidth;

                        return (
                          <div key={key} style={newStyle} className="p-2">
                            <NftListItem {...cardData[0]} />
                          </div>
                        );
                      }}
                      columnCount={columnCount()}
                      columnWidth={listItemWidth}
                      rowCount={rowCount}
                      rowHeight={rowHeight}
                      width={width}
                      height={newHeight}
                      role="rowgroup"
                    />
                  );
                }}
              </AutoSizer>
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
          style={{ width: '100%', height: '100vh' }}
        >
          {isFilterOpen && (
            <NftFilter
              onClose={() => setFilterOpen(false)}
              styles="border rounded-lg border-stroke-gray dark:border-dark-gray mt-2 sticky self-start top-32 "
            />
          )}
          <div className="-ml-2 -mr-2">
            <AutoSizer
              onResize={() => {
                //@ts-ignore
                gridRef?.recomputeGridSize({ columnIndex: 0, rowIndex: 0 });
              }}
              style={{ width: 0, overflow: 'visible', height: undefined }}
            >
              {({ width, height }) => {
                const columnCount = () => {
                  if (width > 1440) return 6;
                  if (width > 1393) return 5;
                  if (width > 786) return 4;
                  return 3;
                };

                const columns = columnCount();

                const listItemWidth = width / columns;
                const listItemHeight = listItemWidth * 1.42;
                const rowHeight = listItemHeight;
                const rowCount = Math.ceil(cardData.length / columns);
                const newHeight = listItemHeight * rowCount;

                return (
                  <Grid
                    ref={(ref) => {
                      //@ts-ignore
                      setGridRef(ref);
                    }}
                    style={{ overflow: 'visible!important' }}
                    autoHeight
                    containerStyle={{ overflow: 'visible!important' }}
                    cellRenderer={({ key, style }) => {
                      const newStyle = { ...style };
                      newStyle.height = listItemHeight;
                      newStyle.width = listItemWidth;

                      console.log(style);
                      return (
                        <div key={key} style={newStyle} className="p-2">
                          <NftListItem {...cardData[0]} />
                        </div>
                      );
                    }}
                    columnCount={columnCount()}
                    columnWidth={listItemWidth}
                    rowCount={rowCount}
                    rowHeight={rowHeight}
                    width={width}
                    height={newHeight}
                    role="rowgroup"
                  />
                );
              }}
            </AutoSizer>
          </div>

          {/*<motion.ul*/}
          {/*  animate={isFilterOpen ? 'open' : 'closed'}*/}
          {/*  variants={variants}*/}
          {/*  className={*/}
          {/*    isFilterOpen*/}
          {/*      ? 'grid auto-rows-min grid-cols-3 gap-5 xlg:grid-cols-4'*/}
          {/*      : 'grid grid-cols-4 gap-4 md:gap-5 lg:grid-cols-5 xlg:grid-cols-6'*/}
          {/*  }*/}
          {/*>*/}
          {/*  {cardData.map((nftData, i) => (*/}
          {/*    <li key={i}>*/}
          {/*      <NftListItem {...nftData} />*/}
          {/*    </li>*/}
          {/*  ))}*/}
          {/*</motion.ul>*/}
        </div>
      </div>
    </>
  );
};

export default NftsCollectionComponent;
