'use client';

import React, { useEffect, useMemo, useRef, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LinksList } from './ui/LinksList';
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
import CollectionFabricContract from 'archisinal/dist/typechain-generated/contracts/collection_fabric';
import ArchNFTAbi from 'archisinal/dist/artifacts/arch_nft.json';
import ApiSingleton from 'archisinal/dist/test/shared/api_singleton';
import { CollectionInfo } from 'archisinal/dist/typechain-generated/types-arguments/collection_fabric';
import { Signers } from 'archisinal/dist/test/shared/signers';

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

  const menuOptions = [
    {
      label: 'Explore',
      onClick: () => router.push('/explore'),
    },
    {
      label: 'Create',
      onClick: () =>
        publicAddress
          ? router.push('/explore/nft/createNft')
          : showWalletModal(true),
    },
    { label: 'Sell', onClick: () => router.push('/') },
  ];

  const mobileMenuOptions = [
    ...menuOptions,
    { label: 'Connect wallet', onClick: () => showWalletModal(true) },
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

  const createCollection = async () => {
    console.log('create collection');
    console.log(walletContext?.selectedAccount?.[0]);

    const signer = walletContext?.selectedAccount?.[0]?.signer;
    const api = await ApiSingleton.getInstance();
    console.log('api');
    console.log(api.isConnected);
    await api.isReady;

    const CODE_HASH = ArchNFTAbi.source.hash;

    const collectionFabric = new CollectionFabricContract(
      '5E4TaE46iDC55dJiBtmotoTcmx6fQyG1Sc7Xf7aP45aUQhua',
      Signers.defaultSigner,
      api,
    );

    const args: [CollectionInfo, string] = [
      {
        name: 'Crypto Punks',
        uri: 'ipfs://crypto-punks/',
        additionalInfo: JSON.stringify({
          tags: ['punks', 'legacy', 'top-charts'],
        }),
        royalty: 100,
      } as CollectionInfo,
      CODE_HASH,
    ];

    try {
      const [_, address] = (
        await api.query['collectionFabric::instantiateCollection'](...args)
      ).value
        .unwrap()
        .unwrap();

      console.log('collection address');
      console.log(address);
    } catch (e) {
      console.log(e);
    }
  };

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
          <button onClick={createCollection}>Create Collection</button>
          <Basket />
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
          <Basket />
          <Menu options={mobileMenuOptions} />
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
