'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    <div>
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
        <AnimatePresence>
          {isFilterOpen && <NftFilter onClose={() => setFilterOpen(false)} />}
        </AnimatePresence>
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
                if (width > 1120) return 5;
                if (width > 786) return 4;
                if (width > 620) return 3;
                if (width > 350) return 2;
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
      </div>
    </div>
  );
};

export default NftsCollectionComponent;
