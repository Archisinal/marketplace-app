"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LinksList, defaultConfig } from "./ui/LinksList";
import { Button } from "./ui/Button";
import { InputSearch } from "./ui/InputSearch";
import { Menu, MobileSearch, Basket, Logo } from "@/components";

const NavBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setFocus] = useState(false);

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
        setFocus(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", onKeyUp);
    return () => document.removeEventListener("keyup", onKeyUp);
  }, []);

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
      <div className="flex justify-between xlg:justify-normal border-b dark:border-dark-gray border-light-silver pb-5 items-center gap-10">
        <div className="flex items-center gap-2 text-18px font-semibold ">
          <Logo />
          <Link href="/">Archisinal</Link>
        </div>

        {/* Desktop screen */}
        <InputSearch
          suffix={<Suffix />}
          placeholder="Search NFT, colletcions and users"
          className="max-w-xl hidden md:flex"
          ref={inputRef}
        />
        <LinksList config={defaultConfig} className="hidden md:flex" />
        <div className="flex items-center gap-10 xlg:ml-auto hidden md:flex">
          <Button
            title="Connect wallet"
            color="transparent-white"
            className="rounded-2xl py-3 px-6 sm:text-base"
          />
          <Basket />
        </div>

        {/* Mobile screen */}
        <div className="flex gap-5 md:hidden">
          <MobileSearch onSearch={() => {}} />
          <Basket />
          <Menu />
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default NavBar;
