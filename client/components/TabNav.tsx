'use client';

import React, { FC, useState, useMemo, useRef } from 'react';
import { useOutsideClick } from '@/features/hooks/useOutsudeClick';
import { DropDownSelect, InputSearch, MultiButton, Icon } from '@/components';

type TTabNav = {
  onFilterClick: (cb: (v: boolean) => boolean) => void;
  isFilterOpen?: boolean;
  items?: any[];
  searchCb: (v: string) => any[];
  SearchResultItemComponent: React.ElementType;
  onResultItemClick: () => void;
};

const TabNav: FC<TTabNav> = ({
  onFilterClick,
  isFilterOpen,
  searchCb,
  SearchResultItemComponent,
  onResultItemClick,
}) => {
  const searchResultContainerRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');

  useOutsideClick(searchResultContainerRef, () =>
    setTimeout(() => setSearchValue(''), 0),
  );

  const onChangeSearchVallue = (v: string) => {
    setSearchValue(v);
  };

  const onItemClick = () => {
    onResultItemClick && onResultItemClick();
    setSearchValue('');
  };

  const searchResult = useMemo(() => {
    if (searchValue) {
      return searchCb(searchValue);
    }
    return [];
  }, [searchValue]);

  return (
    <>
      {/* Mobile */}
      <div className="relative flex items-center gap-2.5 py-3.5 sm:hidden">
        <MultiButton
          title={<Icon name="filter" width={16} height={16} />}
          styles="md:w-24 p-3 rounded-xl bg-white-smoke mx-auto"
          onClick={() => onFilterClick((prev) => !prev)}
        />
        <div className="">
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
              className="min-h-5 absolute  -right-px top-16 z-10 mt-1 w-full rounded-2xl  border bg-white p-1 dark:border-dark-gray dark:bg-dark-gray"
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
        <MultiButton
          prefix={<Icon name="sort" width={16} height={16} />}
          title=""
          styles="p-3 rounded-xl bg-white-smoke"
        />
      </div>
      {/* Tablet */}
      <div className="relative flex hidden items-center gap-5 py-3.5 sm:flex md:hidden">
        <MultiButton
          title={<Icon name="filter" width={20} height={20} />}
          styles="md:w-24 p-3 rounded-xl bg-white-smoke mx-auto"
          onClick={() => onFilterClick((prev) => !prev)}
        />
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
              className="min-h-5 absolute top-full z-10 mt-1 w-full rounded-2xl border bg-white p-1 dark:border-dark-gray dark:bg-dark-gray"
            >
              {searchResult?.length === 0 && (
                <p className="mx-auto p-4"> No items found</p>
              )}
              {searchResult && searchResult.length > 0 && (
                <ul className="flex max-h-96 flex-col gap-3 overflow-auto py-2">
                  {searchResult.map((item, i) => (
                    <li className="cursor-pointer gap-2" key={i}>
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
          containerClass="bg-white-smoke dark:bg-dark-gray w-20 rounded-2xl flex justify-center px-0 font-semibold"
          listContainerClass="bg-white-smoke dark:bg-dark-gray"
          label=""
          options={[
            { label: '25h', value: '25h' },
            { label: '3h', value: '3h' },
          ]}
          initValue="25h"
          disableSearch={true}
        />
        <DropDownSelect
          onSelect={() => {}}
          containerClass="bg-white-smoke dark:bg-dark-gray w-37 rounded-2xl flex justify-center px-0 font-semibold"
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
      {/* Desktop */}

      <div className="relative flex hidden items-center gap-5 py-3.5 md:flex">
        <MultiButton
          prefix={
            <Icon
              name={isFilterOpen ? 'nextLeft' : 'filter'}
              width="16"
              height="16"
            />
          }
          title={<span className="font-semibold">Filter</span>}
          styles="md:w-24 p-3 rounded-xl bg-white-smoke mx-auto"
          onClick={() => onFilterClick((prev) => !prev)}
        />
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
            className="min-h-5 absolute right-32 top-16 z-10 w-4/5 rounded-2xl  border bg-white p-1 dark:border-dark-gray dark:bg-dark-gray lg:right-36 lg:p-2 xlg:right-48"
          >
            {searchResult?.length === 0 && (
              <p className="mx-auto p-4"> No items found</p>
            )}
            {searchResult && searchResult.length > 0 && (
              <ul className="flex max-h-96 flex-col gap-3 overflow-auto py-3">
                {searchResult.map((item, i) => (
                  <li className="cursor-pointer gap-2" key={i}>
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

        <MultiButton
          suffix={<Icon name="chevronDown" />}
          title="Newests"
          styles="rounded-2xl py-2.5 px-3 sm:font-semibold bg-white-smoke"
        />
      </div>
    </>
  );
};

export default TabNav;
