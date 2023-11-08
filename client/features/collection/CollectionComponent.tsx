'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { RESOLUTION_QUERY } from '@/utils/resolutionScreens';
import { collectionData } from '@/data/collectionData';
import { createColumnHelper } from '@tanstack/react-table';
import { DropDownSelect, ImageComponent } from '@/components';
import { abbriviateNumber, getPercentageDiff } from '@/utils/formaters';

import {
  CollectionListItem,
  DaysFilter,
  Filter,
  InputSearch,
  MultiButton,
  TableComponent,
  TabNav,
} from '../../components';
import Icon from '../../icons';
import { TCollectionListItem } from './CollectionListItem';

const daysFilterConfig = [
  { label: '1H' },
  { label: '1D' },
  { label: '7D' },
  { label: '30D' },
  { label: 'All' },
];

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
  const variants = {
    open: { width: '100%' },
    closed: { x: 0, width: '100%' },
  };

  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);

  if (!isDesktop) {
    return (
      <>
        {isFilterOpen && <Filter onClose={() => setFilterOpen(false)} />}
        {!isFilterOpen && (
          <>
            <TabNav onFilterClick={setFilterOpen} />
            <ul className="flex flex-col gap-5 overflow-auto">
              {data.map((collection, i) => {
                return (
                  <li key={i}>
                    <CollectionListItem itemData={collection} />
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </>
    );
  }

  if (isDesktop) {
    return (
      <>
        <div className="flex items-center gap-2.5 py-3.5 sm:gap-5">
          <MultiButton
            prefix={
              isDesktop ? (
                <Icon
                  name={isFilterOpen ? 'nextLeft' : 'filter'}
                  width="16"
                  height="16"
                />
              ) : null
            }
            title={
              isDesktop ? (
                <span className="font-semibold">Filter</span>
              ) : (
                <Icon name="filter" />
              )
            }
            styles="md:w-24 rounded-2xl p-2.5 "
            onClick={() => setFilterOpen((prev) => !prev)}
          />
          <DaysFilter config={daysFilterConfig} initFilter="1H" />
          <InputSearch
            prefix={<Icon name="search" width="16" height="16" />}
            placeholder="Search by collections"
          />
          <DropDownSelect
            onSelect={() => {}}
            containerClass="bg-white-smoke dark:bg-dark-gray w-37 rounded-2xl flex justify-center px-0 font-semibold"
            inputClass="px-2 "
            listContainerClass="bg-white-smoke dark:bg-dark-gray"
            label=""
            options={[
              { label: 'All categories', value: 'all' },
              { label: 'Catefory_1', value: 'category_1' },
            ]}
            initValue="All categories"
            disableSearch={true}
          />
        </div>
        <div className={isFilterOpen ? 'grid grid-cols-with-filter' : 'grid '}>
          {isFilterOpen && (
            <Filter
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
      </>
    );
  }
};

export default CollectionComponent;
