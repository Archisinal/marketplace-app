'use client';

import React, { useState, useRef, useMemo } from 'react';
import {
  MultiButton,
  Icon,
  DaysFilter,
  InputSearch,
  DropDownSelect,
} from '@/components';
import { useOutsideClick } from '@/features/hooks/useOutsudeClick';

const daysFilterConfig = [
  { label: '1H' },
  { label: '1D' },
  { label: '7D' },
  { label: '30D' },
  { label: 'All' },
];

type TCollectionTabNav = {
  isFilterOpen: boolean;
  onFilterClick: (cb: (v: boolean) => boolean) => void;
  searchCb: (v: string) => any[];
  SearchResultItemComponent: React.ElementType;
  onResultItemClick: () => void;
};

const CollectionTabNav = ({
  isFilterOpen,
  onFilterClick,
  searchCb,
  onResultItemClick,
  SearchResultItemComponent,
}: TCollectionTabNav) => {
  const [searchValue, setSearchValue] = useState('');
  const searchResultContainerRef = useRef(null);

  const onChangeSearchVallue = (v: string) => {
    setSearchValue(v);
  };

  useOutsideClick(searchResultContainerRef, () =>
    setTimeout(() => setSearchValue(''), 0),
  );

  const searchResult = useMemo(() => {
    if (searchValue) {
      return searchCb(searchValue);
    }
    return [];
  }, [searchValue]);

  const onItemClick = () => {
    onResultItemClick && onResultItemClick();
    setSearchValue('');
  };

  return (
    <div className=" relative flex items-center gap-2.5 py-3.5 sm:gap-5">
      <MultiButton
        prefix={
          <Icon
            name={isFilterOpen ? 'nextLeft' : 'filter'}
            width="16"
            height="16"
          />
        }
        title={<span className="font-semibold">Filter</span>}
        styles="md:w-24 rounded-2xl p-2.5 "
        onClick={() => onFilterClick((prev) => !prev)}
      />
      <DaysFilter config={daysFilterConfig} initFilter="1H" />
      <div className="relative flex grow">
        <InputSearch
          prefix={<Icon name="search" width="16" height="16" />}
          placeholder="Search by collections"
          initValue={searchValue}
          onChange={onChangeSearchVallue}
          onClear={() => setSearchValue('')}
        />
        {searchValue && (
          <div
            ref={searchResultContainerRef}
            className="min-h-5 absolute top-14 z-10 w-full rounded-2xl  border bg-white p-1 dark:border-dark-gray dark:bg-dark-gray"
          >
            {searchResult?.length === 0 && (
              <p className="mx-auto p-4"> No items found</p>
            )}
            {searchResult && searchResult.length > 0 && (
              <ul className="flex max-h-96 flex-col gap-2 overflow-auto py-2">
                {searchResult.map((item, i) => (
                  <li className="cursor-pointer" key={i}>
                    <SearchResultItemComponent
                      {...item}
                      onClick={onItemClick}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
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
  );
};

export default CollectionTabNav;
