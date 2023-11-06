import React from "react";
import { SearchListItem } from "@/features/nft";

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
    <div className="absolute top-16 left-0 p-2 w-full">
      <div className="bg-white dark:bg-dark-gray border dark:border-none rounded-2xl overflow-auto py-2   w-full max-h-96 z-10">
        {results.length === 0 && <p className="mx-auto p-4"> No items found</p>}
        {results.length > 0 && (
          <ul className="py-4 flex flex-col gap-2">
            {results.map((item, i) => (
              <li key={i}>
                <SearchListItem
                  {...item}
                  onClick={() => {
                    onSearchResultClick("item_id");
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
    <div className="absolute top-full mt-1 bg-white dark:bg-dark-gray border dark:border-none rounded-2xl w-full max-h-96 overflow-auto z-10">
      {results.length === 0 && <p className="mx-auto p-4"> No items found</p>}
      {results.length > 0 && (
        <ul className="py-4 flex flex-col gap-2">
          {results.map((item, i) => (
            <li key={i}>
              <SearchListItem
                {...item}
                onClick={() => onSearchResultClick("item_id")}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
