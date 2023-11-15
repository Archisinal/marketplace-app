'use client';

import React, { useEffect, useMemo, useRef, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { defaultConfig, LinksList } from './ui/LinksList';
import { Button } from './ui/Button';
import { InputSearch } from './ui/InputSearch';
import { Basket, Logo, Menu, MobileSearch } from '@/components';
import {
  ConnectWalletModal,
  SearchResultDesktop,
  SearchResultMobile,
} from '@/features/nft';
import { cardData } from '@/data/cardItems';
import { WalletContextProvider } from '@/features/wallet-connect/providers';
import { WalletContext } from '@/features/wallet-connect/context';
import IdentIcon from '@/features/wallet-connect/components/Identicon';
import { truncate } from '@/utils/formaters';

const NavBarComponent = () => {
  const walletContext = useContext(WalletContext);
  const publicAddress =
    walletContext?.selectedAccount?.[0]?.address ||
    walletContext?.accounts[0]?.address;

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isFocus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  // For Mobile Search
  const [isShown, showInput] = useState(false);
  const [walletModal, showWalletModal] = useState(false);

  const menutOptions = [
    { label: 'Explore', path: '/explore' },
    { label: 'Create', path: '/explore/nft/createNft' },
    { label: 'Sell', path: '/' },
    { label: 'Connect wallet', path: '', onClick: () => showWalletModal(true) },
    { label: 'About us', path: '/' },
  ];

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

  const onChangeInputVallue = (v: string) => {
    setInputValue(v);
  };

  // TODO: id for request particular nft data
  const onSearchResultClick = () => {
    router.push('/explore/nft/item');
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
    <div className="sticky top-0  z-10 bg-white px-3.5 py-5 dark:bg-black-rus sm:px-6">
      <div className=" flex items-center justify-between gap-10 border-b border-light-silver pb-5 dark:border-dark-gray xlg:justify-normal">
        <div className="flex items-center gap-2 text-lg font-semibold ">
          <Logo />
          <Link href="/">Archisinal</Link>
        </div>

        {/* Desktop screen */}
        <div className="relative hidden w-full max-w-sm md:flex lg:max-w-lg">
          <InputSearch
            suffix={<Suffix />}
            placeholder="Search NFT, collections and users"
            ref={inputRef}
            noCleaarIcon={true}
            initValue={inputValue}
            onChange={onChangeInputVallue}
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
        <LinksList config={defaultConfig} className="hidden md:flex" />
        <div className="flex hidden items-center gap-10 md:flex xlg:ml-auto">
          {publicAddress && (
            <div
              className="flex items-center gap-3"
              onClick={() => showWalletModal(!walletModal)}
            >
              <IdentIcon address={publicAddress} />
              <span className="cursor-pointer">
                {truncate(publicAddress, 4, 4, 12)}
              </span>
            </div>
          )}
          {!publicAddress && (
            <Button
              onClick={() => showWalletModal(true)}
              title="Connect wallet"
              color="transparent-white"
              className="rounded-2xl px-6 py-3 sm:text-base"
            />
          )}
          <Basket />
        </div>

        {/* Mobile screen */}
        <div className="flex gap-5 md:hidden">
          <div>
            <MobileSearch
              onSearch={onChangeInputVallue}
              isShown={isShown}
              showInput={showInput}
              onFocus={() => setFocus(true)}
              onClose={() => {
                showInput(false);
                setFocus(false);
              }}
            />
            {isFocus && (
              <SearchResultMobile
                results={results}
                onSearchResultClick={onSearchResultClick}
                showInput={showInput}
                searchValue={inputValue}
              />
            )}
          </div>
          <Basket />
          <Menu options={menutOptions} />
        </div>
      </div>
      {walletModal && (
        <ConnectWalletModal
          onClose={() => {
            showWalletModal(false);
          }}
        />
      )}{' '}
    </div>
  );
};

export default function NavBarContext() {
  return (
    <WalletContextProvider>
      <NavBarComponent />
    </WalletContextProvider>
  );
}
