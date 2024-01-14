'use client';
import React, { useContext, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Icon, NftListItem, TabNav } from '@/components';
import { NftFilter, SearchListItem } from '@/features/nft';
import { AutoSizer, Grid } from 'react-virtualized';
import { SCREENS, useScreenSize } from '@/utils/resolutionScreens';
import { NFT } from '@archisinal/backend/src/graphql-types';
import { formatIpfsLink } from '@/utils/formaters';
import { NodeContext } from '@/context';

const NftsCollectionComponent = ({ nfts = [] }: { nfts: NFT[] }) => {
  const { nativeCurrency } = useContext(NodeContext);
  const screenSize = useScreenSize();
  const [isFilterOpen, setFilterOpen] = useState(
    screenSize === SCREENS.desktop,
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  const [gridRef, setGridRef] = useState(null);

  const variants = {
    open: { width: '100%' },
    closed: { x: 0, width: '100%' },
  };

  const onSearchResultClick = () => {
    router.push('/explore/nft/item');
  };

  const searchCb = (searchValue: string) =>
    nfts?.filter((item) => item?.name?.toLowerCase().includes(searchValue));

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
        {isFilterOpen && (
          <NftFilter
            filters={['category']}
            onClose={() => setFilterOpen(false)}
          />
        )}
        {nfts.length === 0 && (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 text-txt-gray sm:min-h-[340px]">
            <div className="flex items-center gap-4">
              <Icon name="search" />
              No items found
              {searchParams.has('categories') && ' by selected categories'}.
            </div>
          </div>
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
              const rowCount = Math.ceil(nfts.length / columns);
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
                  cellRenderer={({ key, style, rowIndex, columnIndex }) => {
                    const newStyle = { ...style };
                    newStyle.height = listItemHeight;
                    newStyle.width = listItemWidth;
                    const dataIndex = rowIndex * columns + columnIndex;

                    if (dataIndex >= nfts.length) return null;
                    else {
                      return (
                        <div key={key} style={newStyle} className="p-2">
                          <NftListItem
                            id={nfts[dataIndex].id}
                            name={nfts[dataIndex].name}
                            idInCollection={nfts[dataIndex].id_in_collection}
                            imgUrl={formatIpfsLink(nfts[dataIndex].img_url)}
                            collectionName={nfts[dataIndex].collection.name}
                            owner={nfts[dataIndex].owner}
                            price={{
                              currency: nativeCurrency,
                            }}
                          />
                        </div>
                      );
                    }
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
