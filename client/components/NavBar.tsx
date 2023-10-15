"use client";

import React, { useEffect, useRef, useState, KeyboardEvent } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import Icon from "../icons";
import { RESOLUTION_QUERY } from "../utils/resolutionScreens";
import { LinksList, defaultConfig } from "./ui/LinksList";
import { Button } from "./ui/Button";
import { InputSearch } from "./ui/InputSearch";

const NavBar = () => {
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setFocus] = useState(false);

  const logoProps = isTablet
    ? { width: "42", height: "42" }
    : { width: "35", height: "35" };
  const searchAndBasket = isTablet
    ? { width: "30", height: "30" }
    : { width: "24", height: "24" };

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
          <Icon name="logo" {...logoProps} />
          <Link href="/">Archisinal</Link>
        </div>
        {isDesktop && (
          <>
            <InputSearch
              suffix={<Suffix />}
              placeholder="Search NFT, colletcions and users"
              styles="max-w-xl"
              ref={inputRef}
            />
            <LinksList config={defaultConfig} />
            <div className="flex items-center gap-10 xlg:ml-auto">
              <Button
                title="Connect wallet"
                color="transparent-white"
                styles="rounded-2xl py-3 px-6 sm:text-base"
              />
              <span className="cursor-pointer">
                <Icon
                  name="basket"
                  width="32"
                  height="32"
                  color="white"
                  alt="Basket"
                />
              </span>
            </div>
          </>
        )}
        {!isDesktop && (
          <div className="flex gap-5">
            <span className="dark:border-dark-gray border border-stroke-gray rounded-lg p-1">
              <Icon name="search" {...searchAndBasket} />
            </span>
            <span className="dark:border-dark-gray border border-stroke-gray rounded-lg p-1">
              <Icon name="basket" {...searchAndBasket} />
            </span>
            <span className="self-center p-5px">
              <Icon name="menu" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
