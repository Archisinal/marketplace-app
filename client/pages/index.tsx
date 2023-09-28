"use client";
import React, { useEffect } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import { useMediaQuery } from "react-responsive";
import Banner from "@/components/Banner";
import ItemCard from "../components/ItemCard";
import { SliderComponent } from "../components/SliderComponent";
import { ActionTile } from "../components/ActionTile";
import CategoryCard from "../components/CategoryCard";
import AuctionCard from "../components/AuctionCard";
import CollectionCard from "../components/CollectionCard";
import { Button } from "../components/Button";

// Mock Data
import { cardData } from "../mockData/cardItems";
import { actions } from "../mockData/actions";
import { categories } from "../mockData/categoryItems";
import { auctionData } from "../mockData/auctionItems";

export default function Home() {
  const { theme, setTheme } = useTheme();

  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "DARK" : "LIGHT"}
      </button>

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
          <Banner isDesktop={false} />
        </div>
      </div>
      {/* Items carousel */}
      <div className="px-6">
        <SliderComponent
          data={cardData}
          Component={ItemCard}
          sliderContainerClass="border border-stroke-grey rounded-20 p-2.5"
        />
      </div>
      {/* Create and Sell block */}
      <div className="px-6 mt-24">
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
      <div className="pl-6 sm:pr-6 mt-24">
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
                "max-w-[138px] sm:max-w-[227px] md:max-w=[229px] lg:max-w-[260px]",
              arrows: isTablet,
              centerMode: true,
              containerClass: "md: justify-center",
            }}
          />
        </div>
      </div>
      {/* Auctions block */}
      <div className="pl-6 sm:pr-6 mt-24">
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
      <div className="pl-6 sm:pr-6 mt-24">
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
      <div className="mt-6">FFFFF</div>
    </>
  );
}
