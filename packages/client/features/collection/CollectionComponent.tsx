'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { collectionData } from '@/data/collectionData';
import { createColumnHelper } from '@tanstack/react-table';
import { ImageComponent } from '@/components';
import { abbriviateNumber, getPercentageDiff } from '@/utils/formaters';
import {
  SearchListItem,
  CollectionTabNav,
  CollectionFilter,
} from '@/features/collection';
import { CollectionListItem, TableComponent, TabNav } from '../../components';
import { TCollectionListItem } from './CollectionListItem';

type TColection = {
  id?: string;
  itemName: string;
  floorPrice: number;
  currency: string;
  floorChange: number;
  volume: number;
  sales: number;
  items: string;
  owners: string;
};

const columnHelper = createColumnHelper<TColection>();

const collectionColumns = [
  columnHelper.accessor('id', {
    cell: (info) => {
      return <div>{Number(info.row.index) + 1}</div>;
    },
    header: () => <span>#</span>,
    enableSorting: false,
  }),
  columnHelper.accessor('itemName', {
    cell: (info) => {
      return (
        <div className="flex items-center gap-5 ">
          <ImageComponent
            src="/mockMembers/member.png"
            width={40}
            height={40}
          />
          <span className="truncate whitespace-nowrap">{info.getValue()}</span>
        </div>
      );
    },
    header: () => <span>COLLECTIONS</span>,
    enableSorting: true,
  }),
  columnHelper.accessor('floorPrice', {
    cell: (info) => info.getValue(),
    header: () => <span>FLOOR PRICE</span>,
    enableSorting: true,
  }),
  columnHelper.accessor('floorChange', {
    cell: (info) => {
      const value = info.cell.getValue();
      return (
        <span className={`${value > 0 ? 'text-chateau-green' : 'text-red'}`}>
          {getPercentageDiff(value)}
        </span>
      );
    },
    header: () => <span>FLOOR CHANGE</span>,
    enableSorting: true,
  }),
  columnHelper.accessor('volume', {
    cell: (info) => {
      return (
        <div className="flex items-center gap-1">
          <span>{abbriviateNumber(info.getValue(), 2, false)}</span>
          <span className="text-txt-gray">{info.row.original?.currency}</span>
        </div>
      );
    },
    header: () => <span>VOLUME</span>,
    enableSorting: true,
  }),
  columnHelper.accessor('sales', {
    cell: (info) => info.getValue(),
    header: () => <span>SALES</span>,
    enableSorting: true,
  }),
  columnHelper.accessor('items', {
    cell: (info) => {
      return abbriviateNumber(Number(info.getValue()));
    },
    header: () => <span>ITEMS</span>,
    enableSorting: true,
  }),
  columnHelper.accessor('owners', {
    cell: (info) => {
      return abbriviateNumber(Number(info.getValue()));
    },
    header: () => <span>OWNERS</span>,
    enableSorting: true,
    meta: 'text-center',
  }),
];

const CollectionComponent = () => {
  const data: TCollectionListItem[] = collectionData;
  const [isFilterOpen, setFilterOpen] = useState(false);
  const router = useRouter();

  const variants = {
    open: { width: '100%' },
    closed: { x: 0, width: '100%' },
  };

  const searchCb = (searchValue: string) =>
    collectionData.filter((collection) =>
      collection.itemName.toLocaleLowerCase().includes(searchValue),
    );

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
              items={collectionData}
              searchCb={searchCb}
              SearchResultItemComponent={SearchListItem}
              onResultItemClick={onSearchResultClick}
            />
            <ul className="flex flex-col gap-5 overflow-auto">
              {data?.map((collection, i) => {
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
        <CollectionTabNav
          isFilterOpen={isFilterOpen}
          onFilterClick={setFilterOpen}
          searchCb={searchCb}
          onResultItemClick={onSearchResultClick}
          SearchResultItemComponent={SearchListItem}
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
              tableData={collectionData}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CollectionComponent;
