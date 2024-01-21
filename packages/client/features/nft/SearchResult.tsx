import React, { useEffect, useRef } from 'react';
import { SearchListItem } from '@/features/nft';
import BN from 'bn.js';

export type TSearchResult = {
  id: string;
  address: string;
  name?: string;
  price?: BN | string;
  itemImg: string;
};

type TSearchResultProps = {
  results: TSearchResult[];
  onSearchResultClick: (id: string) => void;
  searchValue: string;
};

type TSearchResultMobile = TSearchResultProps & {
  showInput: (v: boolean) => void;
};

export const SearchResultMobile = ({
  results,
  searchValue,
  onSearchResultClick,
}: TSearchResultMobile) => {
  return (
    <div className="absolute left-0 top-16 w-full p-2">
      <div className="z-10 max-h-96 w-full overflow-auto rounded-2xl border bg-white   py-2 dark:border-none dark:bg-dark-gray">
        {!searchValue && (
          <p className="mx-auto p-4 opacity-60"> Start typing ...</p>
        )}
        {searchValue && results.length === 0 && (
          <p className="mx-auto p-4 text-txt-gray">No items found :(</p>
        )}
        {searchValue && results.length > 0 && (
          <ul className="flex flex-col gap-2 py-4">
            {results.map((item, i) => (
              <li key={i} onClick={() => onSearchResultClick(item.id)}>
                <SearchListItem {...item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const SearchResultDesktop = ({
  results,
  onSearchResultClick,
  searchValue,
}: TSearchResultProps) => {
  const searchListRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    const search = document.getElementById('search');

    const items = searchListRef.current?.querySelectorAll('li');

    if (!items) return;
    if (document.activeElement !== search && !items?.length) return;

    let currentIndex = Array.from(items).findIndex(
      (item) => document.activeElement === item,
    );

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      items[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      items[prevIndex].focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentIndex !== -1) {
        items[currentIndex].click();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [results]);

  return (
    <div className="dark:border-da absolute top-full z-10 mt-1 max-h-96 w-full overflow-auto rounded-2xl border border-silver bg-white dark:border-vulcan dark:bg-dark-gray">
      {!searchValue && (
        <p className="mx-auto p-4 opacity-60"> Start typing...</p>
      )}
      {searchValue && results.length === 0 && (
        <p className="mx-auto p-4 text-txt-gray"> No items found :(</p>
      )}
      {searchValue && results.length > 0 && (
        <ul className="flex flex-col py-4" ref={searchListRef}>
          {results.map((item, i) => (
            <li
              className="hover:bg-white-smoke focus:bg-white-smoke focus:outline-0 active:outline-0 dark:hover:bg-vulcan dark:focus:bg-vulcan dark:active:bg-vulcan"
              key={i}
              tabIndex={0}
              onClick={() => onSearchResultClick(item.id)}
            >
              <SearchListItem {...item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
