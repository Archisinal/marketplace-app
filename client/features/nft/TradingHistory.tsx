import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { ImageComponent, TableComponent } from '@/components';
import { getCurrentScreen, SCREENS } from '@/utils/resolutionScreens';
import { nftTradHistory } from '@/data/nftTradHistory';

const columnHelper = createColumnHelper<TNftTrHistoryItem>();

type TNftTrHistoryItem = {
  imgSrc: string;
  itemName: string;
  price: number;
  priceUsd: number;
  currency: string;
  from: string;
  to: string;
  date: string;
  id: number;
};

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => {
      return (
        <div className="text-sm text-txt-gray">
          {Number(info.row.index) + 1}
        </div>
      );
    },
    header: () => <span>#</span>,
    enableSorting: false,
    meta: 'px-2.5',
  }),
  columnHelper.accessor('itemName', {
    cell: (info) => {
      return (
        <div className="flex w-32 items-center gap-5 text-sm md:w-48 ">
          <ImageComponent
            src="/mockCategories/Rectangle 44.png"
            width={40}
            height={40}
          />
          <span className="truncate whitespace-nowrap">{info.getValue()}</span>
        </div>
      );
    },
    header: () => <span>ITEM</span>,
    enableSorting: true,
    meta: 'px-2.5',
  }),
  columnHelper.accessor('price', {
    cell: (info) => {
      return (
        <div className="flex items-center gap-1 text-sm ">
          <span className="text-sm">{info.getValue()}</span>
          <span className="text-sm text-txt-gray">
            {info.row.original?.currency}
          </span>
        </div>
      );
    },
    header: () => <span>PRICE</span>,
    enableSorting: true,
    meta: 'px-2.5',
  }),
  columnHelper.accessor('from', {
    cell: (info) => info.getValue(),
    header: () => <span>FROM</span>,
    enableSorting: true,
    meta: 'px-2.5 text-sm',
  }),
  columnHelper.accessor('to', {
    cell: (info) => info.getValue(),
    header: () => <span>TO</span>,
    enableSorting: true,
    meta: 'px-2.5 text-sm',
  }),
  columnHelper.accessor('date', {
    cell: (info) => info.getValue(),
    header: () => <span>DATE</span>,
    enableSorting: true,
    meta: 'px-2.5 text-sm',
  }),
];

const TradingHistory = () => {
  if (getCurrentScreen() == SCREENS.mobile) {
    return (
      <ul className="flex flex-col gap-5 rounded-2xl border border-stroke-gray p-4 dark:border-dark-gray">
        {nftTradHistory.map((trade) => {
          const { id, imgSrc, from, date, price, currency, priceUsd } = trade;
          return (
            <li key={id} className="flex justify-between">
              <div className="flex gap-2">
                <div>
                  <ImageComponent
                    src={imgSrc}
                    className="h-10 w-10 rounded-xl"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">{from}</p>
                  <p className="text-xs text-txt-gray">{date}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">{`${price} ${currency}`}</p>
                <p className="text-end text-xs text-txt-gray">{`$${priceUsd}`}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  if (getCurrentScreen() == SCREENS.tablet) {
    return (
      <div>
        <TableComponent
          columnsData={columns}
          tableData={nftTradHistory}
          pagination={false}
        />
      </div>
    );
  }

  if (getCurrentScreen() == SCREENS.desktop) {
    return (
      <div>
        <TableComponent
          columnsData={columns}
          tableData={nftTradHistory}
          pagination={true}
        />
      </div>
    );
  }
};

export default TradingHistory;
