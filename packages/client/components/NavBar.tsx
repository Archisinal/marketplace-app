'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LinksList } from './ui/LinksList';
import { InputSearch } from './ui/InputSearch';
import { Basket, Logo, Menu, MobileSearch } from '@/components';
import { SearchResultDesktop, SearchResultMobile } from '@/features/nft';
import { cardData } from '@/data/cardItems';
import WalletConnect from '@/features/wallet-connect/components/WalletConnect';

export default function NavBarComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isFocus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');
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

  // TODO: id for request particular nft data
  const onSearchResultClick = () => {
    router.push('/explore/nft/item');
    setFocus(false);
    setInputValue('');
  };

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);
    return () => document.removeEventListener('keyup', onKeyUp);
  }, []);

  const results = useMemo(() => {
    if (inputValue) {
      return cardData.filter((item) =>
        item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()),
      );
    }
    return [];
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
    <div className="sticky top-0  z-10 bg-white px-3.5 py-5 pb-0 dark:bg-black-rus sm:px-6">
      <div className=" flex items-center justify-between gap-10 border-b border-light-silver pb-5 dark:border-dark-gray xlg:justify-normal">
        <div className="flex items-center gap-2 text-lg font-semibold ">
          <Logo />
          <Link href="/">Archisinal</Link>
        </div>

        {/* Desktop screen */}
        <div className="relative hidden w-full max-w-sm md:flex lg:max-w-lg">
          <InputSearch
            suffix={<Suffix />}
            placeholder="Search NFT"
            ref={inputRef}
            noCleaarIcon={true}
            initValue={inputValue}
            onChange={onChangeInputValue}
            onFocus={() => setFocus(true)}
          />
          {isFocus && (
            <SearchResultDesktop
              results={results}
              onSearchResultClick={onSearchResultClick}
              searchValue={inputValue}
            />
          )}
        </div>
        <LinksList config={menuOptions} className="hidden md:flex" />
        <div className="hidden items-center gap-10 md:flex xlg:ml-auto">
          <WalletConnect />
          {/*<Basket />*/}
        </div>

        {/* Mobile screen */}
        <div className="flex gap-5 md:hidden">
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
                results={results}
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
  );
}
