'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LinksList } from './ui/LinksList';
import { InputSearch } from './ui/InputSearch';
import { Logo, Menu, MobileSearch } from '@/components';
import { SearchResultDesktop, SearchResultMobile } from '@/features/nft';
import WalletConnect from '@/features/wallet-connect/components/WalletConnect';
import { getNFTsOnSale } from '@/services';
import { TSearchResult } from '@/features/nft/SearchResult';

export default function NavBarComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isFocus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<TSearchResult[]>([]);
  // For Mobile Search
  const [isShown, showInput] = useState(false);

  const menuOptions = [
    {
      label: 'Explore',
      onClick: () => router.push('/explore/collections'),
    },
    {
      label: 'Create',
      onClick: () => router.push('/explore/nft/create'),
    },
    { label: 'Sell', onClick: () => router.push('/user/sales/owned') },
  ];

  const mobileMenuOptions = [...menuOptions];

  const onKeyUp = (e: any) => {
    if (e.key == '/') {
      if (inputRef.current) {
        inputRef.current.focus();
        setFocus(true);
      }
    }
    if (e.key == 'Escape') {
      if (inputRef.current) {
        inputRef.current.blur();
        setInputValue('');
        setFocus(false);
        showInput(false);
      }
    }
  };

  const onChangeInputValue = (v: string) => {
    setInputValue(v);
  };

  const onSearchResultClick = (id: string) => {
    router.push('/explore/nft/item/' + id);
    setFocus(false);
    setInputValue('');
  };

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);
    return () => document.removeEventListener('keyup', onKeyUp);
  }, []);

  const results = useMemo(async () => {
    const nfts = await getNFTsOnSale({ search: inputValue });
    const nftsMapped = nfts.map((nft) => ({
      id: nft.id,
      address: nft?.collection?.address || '',
      name: nft.name + ' #' + nft.id_in_collection,
      price: nft?.listings?.find((l) => l.status === 'active')?.price,
      itemImg: nft.img_url,
    }));
    setSearchResults(nftsMapped);
  }, [inputValue]);

  const Suffix = () => {
    const styles =
      'flex items-center justify-center h-6 rounded-md bg-white-smoke dark:bg-vulcan dark:text-light-silver';
    if (isFocus) {
      return <div className={`${styles} w-10`}>Esc</div>;
    }
    return <div className={`${styles} w-6`}>/</div>;
  };

  return (
    <div className="sticky top-0 z-10 border-b border-light-silver bg-white px-3.5 py-3 dark:border-dark-gray dark:bg-black-rus sm:px-6 md:py-4">
      <div className="flex w-full items-center justify-between gap-2 sm:gap-10">
        <div className="flex flex-1 items-center gap-10">
          <Link
            href="/"
            className="flex items-center gap-4 text-lg font-semibold"
          >
            <Logo /> Archisinal
          </Link>
          {/* Desktop screen */}
          <div className="relative hidden w-full max-w-sm md:flex lg:max-w-lg">
            <InputSearch
              suffix={<Suffix />}
              placeholder="Search NFT by Name or Address"
              ref={inputRef}
              noCleaarIcon={true}
              initValue={inputValue}
              onChange={onChangeInputValue}
              onFocus={() => setFocus(true)}
            />
            {isFocus && (
              <SearchResultDesktop
                results={searchResults}
                onSearchResultClick={onSearchResultClick}
                searchValue={inputValue}
              />
            )}
          </div>
          <LinksList config={menuOptions} className="hidden md:flex" />
        </div>

        <div className="flex items-center gap-2 sm:gap-5">
          <WalletConnect />

          {/* Mobile screen */}
          <div className="flex gap-2 md:hidden">
            <div>
              <MobileSearch
                onSearch={onChangeInputValue}
                isShown={isShown}
                showInput={showInput}
                onFocus={() => setFocus(true)}
                onClose={() => {
                  showInput(false);
                  setFocus(false);
                }}
              />
              {isFocus && isShown && (
                <SearchResultMobile
                  results={searchResults}
                  onSearchResultClick={onSearchResultClick}
                  showInput={showInput}
                  searchValue={inputValue}
                />
              )}
            </div>
            {/*<Basket />*/}
            <Menu options={mobileMenuOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
