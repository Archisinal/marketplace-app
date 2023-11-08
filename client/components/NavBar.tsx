"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LinksList, defaultConfig } from "./ui/LinksList";
import { Button } from "./ui/Button";
import { InputSearch } from "./ui/InputSearch";
import { Menu, MobileSearch, Basket, Logo } from "@/components";
import { ConnectWalletModal } from "@/features/nft";
import { cardData } from "@/data/cardItems";
import {
  SearchListItem,
  SearchResultMobile,
  SearchResultDesktop,
} from "@/features/nft";

const NavBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isFocus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // For Mobile Search
  const [isShown, showInput] = useState(false);
  const [walletModal, showWalletModal] = useState(false);

  const onKeyUp = (e: any) => {
    if (e.key == "/") {
      if (inputRef.current) {
        inputRef.current.focus();
        setFocus(true);
      }
    }
    if (e.key == "Escape") {
      if (inputRef.current) {
        inputRef.current.blur();
        setInputValue("");
        setFocus(false);
      }
    }
  };

  const onChangeInputVallue = (v: string) => {
    setInputValue(v);
  };

  // TODO: id for request particular nft data
  const onSearchResultClick = (id) => {
    router.push("/explore/nft/item");
    setInputValue("");
  };

  useEffect(() => {
    document.addEventListener("keyup", onKeyUp);
    return () => document.removeEventListener("keyup", onKeyUp);
  }, []);

  const results = useMemo(() => {
    return cardData.filter((item) =>
      item.name.toLocaleLowerCase().includes(inputValue)
    );
  }, [inputValue]);

  const Suffix = () => {
    const styles =
      "flex items-center justify-center h-6 rounded-md bg-white-smoke dark:bg-vulcan dark:text-light-silver";
    if (isFocus) {
      return <div className={`${styles} w-10`}>Esc</div>;
    }
    return <div className={`${styles} w-6`}>/</div>;
  };

  return (
    <div className="py-5 px-3.5  sm:px-6 sticky top-0 bg-white dark:bg-black-rus z-10">
      <div className=" flex justify-between xlg:justify-normal border-b dark:border-dark-gray border-light-silver pb-5 items-center gap-10">
        <div className="flex items-center gap-2 text-lg font-semibold ">
          <Logo />
          <Link href="/">Archisinal</Link>
        </div>

        {/* Desktop screen */}
        <div className="relative max-w-sm lg:max-w-lg hidden md:flex w-full">
          <InputSearch
            suffix={<Suffix />}
            placeholder="Search NFT, collections and users"
            ref={inputRef}
            noCleaarIcon={true}
            initValue={inputValue}
            onChange={onChangeInputVallue}
          />
          {inputValue && (
            <SearchResultDesktop
              results={results}
              onSearchResultClick={onSearchResultClick}
            />
          )}
        </div>
        <LinksList config={defaultConfig} className="hidden md:flex" />
        <div className="flex items-center gap-10 xlg:ml-auto hidden md:flex">
          <Button
            onClick={() => showWalletModal(true)}
            title="Connect wallet"
            color="transparent-white"
            className="rounded-2xl py-3 px-6 sm:text-base"
          />
          <Basket />
        </div>

        {/* Mobile screen */}
        <div className="flex gap-5 md:hidden">
          <div>
            <MobileSearch
              onSearch={onChangeInputVallue}
              isShown={isShown}
              showInput={showInput}
            />
            {inputValue && (
              <SearchResultMobile
                results={results}
                onSearchResultClick={onSearchResultClick}
                showInput={showInput}
              />
            )}
          </div>
          <Basket />
          <Menu />
        </div>
      </div>
      {walletModal && (
        <ConnectWalletModal
          onClose={() => {
            showWalletModal(false);
          }}
        />
      )}{" "}
    </div>
  );
};

export default NavBar;
