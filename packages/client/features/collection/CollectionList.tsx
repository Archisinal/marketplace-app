'use client';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createColumnHelper } from '@tanstack/react-table';
import { ImageComponent } from '@/components';
import {
  abbriviateNumber,
  calcCollectionStats,
  CollectionStats,
  formatAddress,
  formatIpfsLink,
  formatPrice,
} from '@/utils/formaters';
import { CollectionFilter, SearchListItem } from '@/features/collection';
import { CollectionListItem, TableComponent, TabNav } from '../../components';
import { Collection } from '@archisinal/backend';
import IdentIcon from '@/features/wallet-connect/components/Identicon';
import { NodeContext } from '@/context';

export type CollectionWithStats = Collection & CollectionStats;

const columnHelper = createColumnHelper<CollectionWithStats>();

const CollectionList = ({ collections }: { collections: Collection[] }) => {
  const { api } = useContext(NodeContext);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const router = useRouter();

  const collectionsWithStats: CollectionWithStats[] = collections.map(
    (collection) => ({
      ...collection,
      ...calcCollectionStats(collection),
    }),
  );

  const searchData = collectionsWithStats.map((item) => ({
    id: item.address,
    name: item.name,
    address: item.address,
    itemImg: item.uri || '',
    price: item.floorPrice,
  }));

  const collectionColumns = [
    columnHelper.accessor('name', {
      cell: (info) => {
        return (
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-10">
              <ImageComponent
                fill
                src={formatIpfsLink(info.row.original.uri || '')}
                alt={info.getValue()}
                className="rounded-md"
              />
            </div>
            <span className="truncate whitespace-nowrap">
              {info.getValue()}
            </span>
          </div>
        );
      },
      header: () => <span>Name</span>,
      enableSorting: true,
    }),
    columnHelper.accessor('address', {
      cell: (info) => {
        return <div>{formatAddress(info.getValue())}</div>;
      },
      header: () => <span>Address</span>,
      enableSorting: false,
    }),
    columnHelper.accessor('floorPrice', {
      cell: (info) => {
        const floorPrice = info.getValue();
        if (!api)
          return (
            <div className="h-6 w-24 animate-pulse rounded-xl bg-gray-600"></div>
          );
        return floorPrice ? formatPrice(floorPrice, api) : '-';
      },
      header: () => <span>Floor price</span>,
      enableSorting: true,
    }),
    // columnHelper.accessor('floorChange', {
    //   cell: (info) => {
    //     const value = info.cell.getValue();
    //     return (
    //       <span className={`${value > 0 ? 'text-chateau-green' : 'text-red'}`}>
    //         {getPercentageDiff(value)}
    //       </span>
    //     );
    //   },
    //   header: () => <span>FLOOR CHANGE</span>,
    //   enableSorting: true,
    // }),
    columnHelper.accessor('volume', {
      cell: (info) => {
        const volume = info.getValue();
        if (!api)
          return (
            <div className="h-6 w-24 animate-pulse rounded-xl bg-gray-600"></div>
          );
        return volume ? formatPrice(volume, api) : '-';
      },
      header: () => <span>Volume</span>,
      enableSorting: true,
    }),
    columnHelper.accessor('sales', {
      cell: (info) => {
        return abbriviateNumber(Number(info.getValue()));
      },
      header: () => <span>Sales</span>,
      enableSorting: true,
    }),
    columnHelper.accessor('collection_owner', {
      cell: (info) => {
        return (
          <span className="flex items-center gap-2">
            <IdentIcon address={info.getValue()} />
            {formatAddress(info.getValue())}
          </span>
        );
      },
      header: () => <span>Owner</span>,
      enableSorting: true,
      meta: 'text-center',
    }),
    columnHelper.accessor('items', {
      cell: (info) => {
        return abbriviateNumber(Number(info.getValue()));
      },
      header: () => <span>ITEMS</span>,
      enableSorting: true,
    }),
  ];

  const variants = {
    open: { width: '100%' },
    closed: { x: 0, width: '100%' },
  };

  const onSearchResultClick = () => {
    router.push('/explore/collection/item');
  };

  return (
    <>
      {/* Mobile/Tablet screen */}
      <div className="min-h-screen md:hidden">
        {isFilterOpen && (
          <CollectionFilter onClose={() => setFilterOpen(false)} />
        )}
        {!isFilterOpen && (
          <>
            <TabNav
              onFilterClick={setFilterOpen}
              SearchResultItemComponent={SearchListItem}
              onResultItemClick={onSearchResultClick}
              searchData={searchData}
              searchNagivationPath="/explore/collection/item"
            />
            <ul className="flex flex-col gap-5 overflow-auto">
              {collectionsWithStats?.map((collection, i) => {
                return (
                  <li key={i}>
                    <CollectionListItem itemData={collection} />
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
      {/* Desktop screen */}
      <div className="hidden md:block">
        <TabNav
          isFilterOpen={isFilterOpen}
          onFilterClick={setFilterOpen}
          onResultItemClick={onSearchResultClick}
          SearchResultItemComponent={SearchListItem}
          searchData={searchData}
          searchNagivationPath="/explore/collection/item"
        />
        <div
          className={
            isFilterOpen ? 'grid grid-cols-with-filter gap-5' : 'grid '
          }
        >
          {isFilterOpen && (
            <CollectionFilter
              onClose={() => {
                setFilterOpen(false);
              }}
            />
          )}
          <motion.div
            animate={isFilterOpen ? 'open' : 'closed'}
            variants={variants}
          >
            <TableComponent
              columnsData={collectionColumns}
              tableData={collectionsWithStats}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CollectionList;
