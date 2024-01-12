'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { NftListItem, TabNav } from '@/components';
import { cardData } from '@/data/cardItems';
import { SearchListItem } from '@/features/nft';
import { useSearchParams } from 'next/navigation';
import { NftFilter } from '@/features/nft';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  Grid,
  MultiGrid,
  ColumnSizer,
} from 'react-virtualized';
import { white } from 'next/dist/lib/picocolors';

type TNftsCollectionComponent = {};

const NftsCollectionComponent = ({}: TNftsCollectionComponent) => {
  const [isFilterOpen, setFilterOpen] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const renderGridRow = (width: number) => {
    const columnCount = () => {
      if (width > 1440) return 6;
      if (width > 1280) return 5;
      if (width > 1065) return 4;
      return 3;
    };
    return (
      <div
        className="flex justify-evenly gap-5"
        style={{ width: `${width}px` }}
      >
        {cardData.slice(0, columnCount()).map((nftData) => (
          <NftListItem {...nftData} />
        ))}
      </div>
    );
  };

  const cellRenderer = ({ key, style }) => {
    console.log(key, style);
    return (
      <div key={key} style={style} className="p-2">
        <NftListItem {...cardData[0]} />
      </div>
    );
  };

  // function cellRenderer({ columnIndex, key, parent, rowIndex, style }) {
  //   return (
  //     <CellMeasurer
  //       cache={cache}
  //       columnIndex={columnIndex}
  //       key={key}
  //       parent={parent}
  //       rowIndex={rowIndex}
  //     >
  //       <div
  //         style={{
  //           ...style,
  //           height: 35,
  //           whiteSpace: 'nowrap',
  //         }}
  //       >
  //         <NftListItem {...cardData[0]} />
  //       </div>
  //     </CellMeasurer>
  //   );
  // }
  // const gridRender = ({ data, width }) => {
  //   let result = [];
  //   const columnCount = () => {
  //     if (width > 1440) return 6;
  //     if (width > 1280) return 5;
  //     if (width > 1065) return 4;
  //     return 3;
  //   };
  //   let step = columnCount();
  //
  //   let dataLength = data.length;
  //   let lastIndex = 0;
  //   while (dataLength > 0) {
  //     const rowData = data.slice(lastIndex, lastIndex + step);
  //     lastIndex = lastIndex + step;
  //     result.push(rowData);
  //     dataLength = dataLength - step;
  //   }
  //   return result;
  // };

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
          style={{ width: '100%', height: '100vh' }}
        >
          {isFilterOpen && (
            <NftFilter
              onClose={() => setFilterOpen(false)}
              styles="border rounded-lg border-stroke-gray dark:border-dark-gray mt-2 sticky self-start top-32 "
            />
          )}
          <div className="list">
            {/*<AutoSizer>*/}
            {/*  {({ width, height }) => {*/}
            {/*    return (*/}
            {/*      <div>*/}
            {/*        <span className="whitespace-nowrap">{`Current width: ${width} Current height: ${height} Items: ${cardData.length}`}</span>*/}
            {/*        {renderGridRow(width)}*/}
            {/*      </div>*/}
            {/*    );*/}
            {/*  }}*/}
            {/*</AutoSizer>*/}

            <AutoSizer>
              {({ width, height }) => {
                const columnCount = () => {
                  if (width > 1440) return 6;
                  if (width > 1393) return 5;
                  if (width > 1063) return 4;
                  return 3;
                };

                const columns = columnCount();
                const gap = 15 * (columns - 1);

                const listItemWidth = Math.floor((width - gap) / columns);
                const listItemHeight = listItemWidth * 1.42;
                const rowHeight = listItemHeight;
                const rowCount = Math.ceil(cardData.length / columns);

                return (
                  <div className="w-0 overflow-visible">
                    <Grid
                      style={{ overflow: 'visible!important' }}
                      autoHeight
                      containerStyle={{ overflow: 'visible!important' }}
                      cellRenderer={({ key, style }) => {
                        console.log(key, style);
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
                      columnWidth={268}
                      rowCount={rowCount}
                      rowHeight={rowHeight}
                      estimatedRowSize={400}
                      width={width}
                      height={height}
                      role="rowgroup"
                    />
                  </div>
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
