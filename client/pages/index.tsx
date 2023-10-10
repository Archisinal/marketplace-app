"use client";
import React from "react";
import Head from "next/head";
import { useMediaQuery } from "react-responsive";
import Banner from "@/components/Banner";
import ItemCard from "../components/ItemCard";
import { SliderComponent } from "../components/SliderComponent";
import { ActionTile } from "../components/ActionTile";
import CategoryCard from "../components/CategoryCard";
import AuctionCard from "../components/AuctionCard";
import CollectionCard from "../components/CollectionCard";
import { Button } from "../components/Button";
import { InputSearch } from "../components/InputSearch";
import { LinksTile } from "../components/LinksTile";
import Icon from "../icons";
import { RESOLUTION_QUERY } from "../utils/resolutionScreens";

// Mock Data
import { cardData } from "../mockData/cardItems";
import { actions } from "../mockData/actions";
import { categories } from "../mockData/categoryItems";
import { auctionData } from "../mockData/auctionItems";
import { marketPlace, links, joinUs } from "../mockData/linksData";

export default function Home() {
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);

  return (
    <>
      <div className="flex justify-center ">
        <Head>
          <title>marketplace-app.com</title>
          <meta
            name="description"
            content="NFT Market - Market where you can buy and sell new NFTs."
          />
        </Head>
        {/* Top Banner  */}
        <div className="dark:bg-none w-full minmd:w-4/5 bg-city bg-center px-6">
          <Banner />
        </div>
      </div>
      {/* Items carousel */}
      <div className="px-6">
        <SliderComponent
          data={cardData}
          Component={ItemCard}
          sliderContainerClass="border dark:!border-davys-gray border-stroke-grey rounded-20 p-2.5"
        />
      </div>
      {/* Create and Sell block */}
      <div className="px-6 mt-12 sm:mt-24">
        <p className="text-25px font-bold sm:text-3xl md:text-40px mb-[50px]">
          Create & Sell Digital Inscriptions
        </p>
        <div className=" grid grid-cols-1 gap-50px sm:grid-cols-2 md:grid-cols-4 gap-5">
          {actions.map((action) => (
            <ActionTile {...action} />
          ))}
        </div>
      </div>
      {/* Category block */}
      <div className="pl-6 sm:pr-6 mt-12 sm:mt-24">
        <p className="text-25px font-bold sm:text-3xl md:text-40px mb-[50px]">
          Browse by Category
        </p>
        <div>
          <SliderComponent
            data={categories}
            Component={CategoryCard}
            options={{
              showDots: false,
              itemClass:
                "max-w-[138px] sm:max-w-[227px] md:max-w=[229px] lg:max-w-[260px] pb-1",
              arrows: isTablet,
              centerMode: true,
              containerClass: "md:justify-center",
            }}
          />
        </div>
      </div>
      {/* Auctions block */}
      <div className="pl-6 sm:pr-6 mt-12 sm:mt-24">
        <p className="text-25px font-bold sm:text-3xl md:text-40px mb-[50px]">
          Hot auctions
        </p>
        <div>
          <SliderComponent
            data={auctionData}
            Component={AuctionCard}
            options={{
              showDots: isTablet,
              itemClass:
                "min-w-[226px] sm:min-w-[349px] md:max-w=[229px] lg:max-w-[260px]",
              arrows: isTablet,
              centerMode: true,
            }}
          />
        </div>
        <div className="pr-6 mt-5 text-center">
          <Button
            title="View auctions house"
            color="transparent"
            styles="w-full sm:w-fit sm:font-18px font-semibold rounded-2xl"
          />
        </div>
      </div>
      {/* Collections block */}
      <div className="pl-6 sm:pr-6 mt-12 sm:24">
        <p className="text-25px font-bold sm:text-3xl md:text-40px mb-[50px]">
          Top collections
        </p>
        <div>
          <SliderComponent
            data={auctionData}
            Component={CollectionCard}
            options={{
              showDots: isTablet,
              itemClass:
                "min-w-[226px] sm:min-w-[349px] md:max-w=[229px] lg:max-w-[260px]",
              arrows: isTablet,
              centerMode: true,
            }}
          />
        </div>
        <div className="pr-6 mt-5 text-center">
          <Button
            title="View all collections"
            color="transparent"
            styles="w-full sm:w-fit sm:font-18px font-semibold rounded-2xl"
          />
        </div>
      </div>
      {/* Footer block */}
      <div className="flex flex-col gap-2 sm:mx-7 md:flex-row-reverse md:gap-10 mt-10">
        {/* Stay in the loop */}
        <div className="pl-6 sm:pr-6 sm:24 mr-4 md:pl-4 md:border-l border-white-smoke dark:border-none">
          <p className="text-25px font-bold sm:text-3xl mb-7 md:mb-2">
            Stay in the loop
          </p>
          {isDesktop && (
            <div className="text-dim-gray mb-7">
              Join our mailing list to stay in the loop with our newest feature
              releases, NFT drops, and tips and tricks for navigating OpenSea.
            </div>
          )}
          <InputSearch
            placeholder="Your email"
            suffix={<Icon name="arrowRight" />}
          />
        </div>
        {/* -- Fotter Links */}
        <div className="grid grid-cols-2 sm:grid-cols-footer-links md:flex shrink gap-8 mx-4 sm:mx-0">
          <div className=" dark:border-none pl-4 md:border-l border-white-smoke">
            <LinksTile title="Marketplace" linksConfig={marketPlace} />
          </div>
          <div className="sm:border-l border-white-smoke dark:border-none pl-4">
            <LinksTile title="Links" linksConfig={links} />
          </div>
          <div className="sm:border-l border-white-smoke dark:border-none pl-4">
            <LinksTile title="Join us" linksConfig={joinUs} />
          </div>
        </div>
        {/* -- Footer Logo */}
        {isDesktop && (
          <div className="flex flex-col gap-7 max-w-[25%]">
            <div className="text-2xl flex gap-5 font-semi-bold">
              <Icon name="logo" width="47" height="47" />
              <span>Archisinal</span>
            </div>
            <div className="text-txt-gray">
              The world's largest digital trading platform for collectible
              cryptocurrencies and non-functioning tokens (NFTs). Buy, sell and
              discover exclusive digital items.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
