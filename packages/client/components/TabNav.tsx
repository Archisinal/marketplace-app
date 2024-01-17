'use client';

import React, { FC, useState, useMemo, useRef } from 'react';
import { useOutsideClick } from '@/features/hooks/useOutsudeClick';
import { InputSearch, MultiButton, Icon } from '@/components';

type TTabNav = {
  onFilterClick: (cb: (v: boolean) => boolean) => void;
  isFilterOpen?: boolean;
  items?: any[];
  searchCb: (v: string) => any[];
  SearchResultItemComponent: React.ElementType;
  onResultItemClick: () => void;
  filter?: boolean;
};

const TabNav: FC<TTabNav> = ({
  filter = true,
  onFilterClick,
  isFilterOpen,
  searchCb,
  SearchResultItemComponent,
  onResultItemClick,
}) => {
  const searchResultContainerRef = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [isFocus, setFocus] = useState(false);

  useOutsideClick(searchResultContainerRef, () =>
    setTimeout(() => {
      setSearchValue('');
      setFocus(false);
    }, 0),
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
      <div className="relative flex items-center justify-center gap-2.5 py-3.5 sm:hidden">
        {filter && (
          <MultiButton
            title={<Icon name="filter" width={16} height={16} />}
            styles="md:w-24 p-3 rounded-xl bg-white-smoke"
            onClick={() => onFilterClick((prev) => !prev)}
          />
        )}
        <div className="flex-1">
          <InputSearch
            prefix={<Icon name="search" width="16" height="16" />}
            placeholder="Search by collections"
            initValue={searchValue}
            onChange={onChangeSearchVallue}
            onFocus={() => setFocus(true)}
            onClear={() => {
              setSearchValue('');
              setFocus(false);
            }}
          />
          {isFocus && (
            <div
              ref={searchResultContainerRef}
              className="absolute -right-px  top-16 z-10 mt-1 min-h-5 w-full rounded-2xl  border bg-white p-1 dark:border-dark-gray dark:bg-dark-gray"
            >
              {!searchValue && (
                <p className="mx-auto p-4 opacity-60"> Start typing ...</p>
              )}
              {searchValue && searchResult?.length === 0 && (
                <p className="mx-auto p-4"> No items found</p>
              )}
              {searchValue && searchResult && searchResult.length > 0 && (
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
      </div>
      {/* Tablet */}
      <div className="relative hidden items-center gap-5 py-3.5 sm:flex md:hidden">
        {filter && (
          <MultiButton
            title={<Icon name="filter" width={20} height={20} />}
            styles="md:w-24 p-3 rounded-xl bg-white-smoke mx-auto"
            onClick={() => onFilterClick((prev) => !prev)}
          />
        )}
        <div className="relative flex grow">
          <InputSearch
            prefix={<Icon name="search" width="16" height="16" />}
            placeholder="Search by collections"
            initValue={searchValue}
            onChange={onChangeSearchVallue}
            onFocus={() => setFocus(true)}
            onClear={() => {
              setSearchValue('');
              setFocus(false);
            }}
          />
          {isFocus && (
            <div
              ref={searchResultContainerRef}
              className="absolute top-full z-10 mt-1 min-h-5 w-full rounded-2xl border bg-white p-1 dark:border-dark-gray dark:bg-dark-gray"
            >
              {!searchValue && (
                <p className="mx-auto p-4 opacity-60"> Start typing ...</p>
              )}
              {searchValue && searchResult?.length === 0 && (
                <p className="mx-auto p-4"> No items found</p>
              )}
              {searchValue && searchResult && searchResult.length > 0 && (
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
      </div>

      {/* Desktop */}
      <div className="relative hidden items-center gap-5 py-3.5 md:flex">
        {filter && (
          <MultiButton
            prefix={
              <Icon
                name={isFilterOpen ? 'nextLeft' : 'filter'}
                width="16"
                height="16"
              />
            }
            title={<span className="font-semibold">Filter</span>}
            styles="flex cursor-pointer items-center justify-center gap-2 bg-white-smoke dark:bg-dark-gray md:w-24 rounded-2xl p-2.5"
            onClick={() => onFilterClick((prev) => !prev)}
          />
        )}
        <div className="relative w-full">
          <InputSearch
            prefix={<Icon name="search" width="16" height="16" />}
            placeholder="Search by collections"
            initValue={searchValue}
            onChange={onChangeSearchVallue}
            onFocus={() => setFocus(true)}
            onClear={() => {
              setSearchValue('');
              setFocus(false);
            }}
          />
          {isFocus && (
            <div
              ref={searchResultContainerRef}
              className="absolute right-0 top-14 z-10 min-h-5 w-full rounded-2xl border bg-white p-1 dark:border-dark-gray dark:bg-dark-gray lg:p-2"
            >
              {!searchValue && (
                <p className="mx-auto p-4 opacity-60"> Start typing ...</p>
              )}
              {searchValue && searchResult?.length === 0 && (
                <p className="mx-auto p-4"> No items found</p>
              )}
              {searchValue && searchResult && searchResult.length > 0 && (
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
        </div>
      </div>
    </>
  );
};

export default TabNav;
