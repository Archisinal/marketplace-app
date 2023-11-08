import React from 'react';
import { SearchListItem } from '@/features/nft';

type TSearchResult = {
  results: {
    name: string;
    price: { value: number; currency: string };
    itemImg: string;
  }[];
  onSearchResultClick: (id: string) => void;
};

type TSearchResultMobile = TSearchResult & { showInput: (v: boolean) => void };

export const SearchResultMobile = ({
  results,
  onSearchResultClick,
  showInput,
}: TSearchResultMobile) => {
  return (
    <div className="absolute left-0 top-16 w-full p-2">
      <div className="z-10 max-h-96 w-full overflow-auto rounded-2xl border bg-white   py-2 dark:border-none dark:bg-dark-gray">
        {results.length === 0 && <p className="mx-auto p-4"> No items found</p>}
        {results.length > 0 && (
          <ul className="flex flex-col gap-2 py-4">
            {results.map((item, i) => (
              <li key={i}>
                <SearchListItem
                  {...item}
                  onClick={() => {
                    onSearchResultClick('item_id');
                    showInput(false);
                  }}
                />
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
}: TSearchResult) => {
  return (
    <div className="absolute top-full z-10 mt-1 max-h-96 w-full overflow-auto rounded-2xl border bg-white dark:border-none dark:bg-dark-gray">
      {results.length === 0 && <p className="mx-auto p-4"> No items found</p>}
      {results.length > 0 && (
        <ul className="flex flex-col gap-2 py-4">
          {results.map((item, i) => (
            <li key={i}>
              <SearchListItem
                {...item}
                onClick={() => onSearchResultClick('item_id')}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
