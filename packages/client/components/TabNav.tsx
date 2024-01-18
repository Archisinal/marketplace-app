'use client';

import React, { FC, useState, useMemo, useRef } from 'react';
import { useOutsideClick } from '@/features/hooks/useOutsudeClick';
import { InputSearch, MultiButton, Icon } from '@/components';
import { SearchResultDesktop } from '@/features/nft';
import { TSearchResult } from '@/features/nft/SearchResult';
import { getNFTsOnSale } from '@/services';
import { useRouter } from 'next/navigation';

type TTabNav = {
  onFilterClick: (cb: (v: boolean) => boolean) => void;
  isFilterOpen?: boolean;
  items?: any[];
  searchCb: (v: string) => any[];
  SearchResultItemComponent: React.ElementType;
  onResultItemClick: () => void;
  filter?: boolean;
  searchData?: TSearchResult[];
  searchNagivationPath?: string;
};

const TabNav: FC<TTabNav> = ({
  filter = true,
  searchData = [],
  onFilterClick,
  isFilterOpen,
  searchNagivationPath,
}) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<TSearchResult[]>([]);
  const [isFocus, setFocus] = useState(false);

  useMemo(async () => {
    setSearchResults(
      searchData.filter(
        (item) =>
          item?.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
          item?.address?.toLowerCase().includes(inputValue.toLowerCase()),
      ),
    );
  }, [inputValue]);

  const onChangeInputValue = (v: string) => {
    setInputValue(v);
  };

  const onSearchResultClick = (id: string) => {
    router.push(searchNagivationPath + '/' + id);
    setFocus(false);
    setInputValue('');
  };

  return (
    <>
      <div className="relative flex items-center gap-2 py-3.5 sm:gap-4">
        {filter && (
          <MultiButton
            prefix={
              <Icon
                name={isFilterOpen ? 'nextLeft' : 'filter'}
                width="16"
                height="16"
              />
            }
            title={
              <span className="hidden font-semibold sm:inline">Filter</span>
            }
            styles="flex cursor-pointer items-center justify-center gap-2 bg-white-smoke dark:bg-dark-gray  w-auto h-[46px] rounded-2xl p-2.5 px-4"
            onClick={() => onFilterClick((prev) => !prev)}
          />
        )}
        <div className="relative w-full">
          <InputSearch
            prefix={<Icon name="search" width="16" height="16" />}
            placeholder="Search by Name or Collection address"
            initValue={inputValue}
            onChange={onChangeInputValue}
            onFocus={() => setFocus(true)}
            onClear={() => {
              setInputValue('');
              setFocus(false);
            }}
          />
          {isFocus && (
            <SearchResultDesktop
              results={searchResults}
              onSearchResultClick={onSearchResultClick}
              searchValue={inputValue}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TabNav;
