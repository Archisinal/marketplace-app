"use client";
import React from "react";
import { useMediaQuery } from "react-responsive";
import Icon from "../icons";
import { RESOLUTION_QUERY } from "../utils/resolutionScreens";
import { List, defaultConfig } from "./List";
import { Button } from "../components/Button";
import { InputSearch } from "../components/InputSearch";

const NavBar = () => {
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);

  const logoProps = isTablet ? { width: "42", height: "42" } : {};
  const searchAndBasket = isTablet ? { width: "30", height: "30" } : {};

  return (
    <div className="py-18px px-15px sticky top-0 bg-white dark:bg-black-rus z-10">
      <div className="flex justify-between border-b border-light-silver pb-18px items-center gap-8">
        <div className="flex items-center gap-2 text-18px font-semibold ">
          <Icon name="logo" {...logoProps} />
          <span>Archisinal</span>
        </div>
        {isDesktop && (
          <>
            <InputSearch
              suffix={<Icon name="search" width="24" height="24" />}
              placeholder="Search NFT, colletcions and users"
            />
            <List config={defaultConfig} />
            <Button
              title="Connect wallet"
              color="transparent-white"
              styles="rounded-2xl !py-3 !px-6"
            />
            <Icon name="basket" width="32" height="32" color="white" />
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
