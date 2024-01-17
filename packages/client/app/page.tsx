import React from 'react';
import Head from 'next/head';
import {
  ActionTile,
  Banner,
  Button,
  CollectionCard,
  InputSearch,
  LinksTile,
  SliderComponent,
} from '../components';
import Icon from '../icons';
import { CategoriesSlider, CollectionsSlider } from '@/features/dashboard';

// Mock Data
import { actions } from '@/data/actions';
import { auctionData } from '@/data/auctionItems';
import { joinUs, links, marketPlace } from '@/data/linksData';

export default function Home() {
  return (
    <>
      <div className="flex min-h-[calc(60vh-76px)] items-center justify-center bg-tablet-dark bg-120 bg-50-100 bg-no-repeat py-12 dark:bg-tablet-dark sm:min-h-[calc(70vh-76px)] md:min-h-[calc(100vh-76px)] md:bg-desktop-light md:dark:bg-desktop-dark">
        <Head>
          <title>marketplace-app.com</title>
          <meta
            name="description"
            content="NFT Market - Market where you can buy and sell new NFTs."
          />
        </Head>
        {/* Top Banner  */}
        <div className=" minmd:w-4/5 container mx-auto w-full px-6">
          <Banner />
        </div>
      </div>

      {/* Listings slider */}
      <CollectionsSlider />

      {/* Create and Sell block */}
      <div className="mt-12 px-4 sm:mt-24 md:px-8 lg:mx-auto">
        <p className="mb-12 text-2xl font-bold sm:text-3xl md:text-40">
          Create & Sell Digital Inscriptions
        </p>
        <div className=" grid grid-cols-1  gap-6 sm:grid-cols-2 md:grid-cols-4">
          {actions.map((action, index) => (
            <ActionTile {...action} key={index} />
          ))}
        </div>
      </div>

      {/* Category slider  block */}
      <div className="mt-12  select-none px-4 sm:mt-24 md:px-8">
        <p className="mb-12 text-2xl font-bold sm:text-3xl md:text-4xl">
          Browse by Category
        </p>
        <CategoriesSlider />
      </div>

      {/* Collections block */}
      <div className="sm:24 mt-12 px-4 sm:pr-6 md:px-8">
        <p className="mb-12 text-2xl font-bold sm:text-3xl md:text-40">
          Top collections
        </p>
        <div>
          <SliderComponent
            data={auctionData}
            Component={CollectionCard}
            sliderContainerClass="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4"
            arrowClass="hidden sm:block"
            options={{
              showDots: false,
            }}
          />
        </div>
        <div className="mt-5 text-center">
          <Button
            title="View all collections"
            color="transparent"
            className="sm:font-18px w-full rounded-2xl font-semibold sm:w-fit"
          />
        </div>
      </div>
      {/* Footer block */}
      <div className="mt-20 flex flex-col justify-center gap-2 sm:mx-7 sm:gap-10 md:flex-row-reverse">
        {/* Stay in the loop */}
        <div className="sm:24 mr-4 border-white-smoke pl-4 dark:border-none sm:pl-0 sm:pr-6 md:max-w-md md:border-l md:pl-4">
          <p className="mb-7 text-2xl font-bold md:mb-2">Stay in the loop</p>
          <div className="mb-7 hidden text-dim-gray md:block">
            Join our mailing list to stay in the loop with our newest feature
            releases, NFT drops, and tips and tricks for navigating OpenSea.
          </div>
          <InputSearch
            placeholder="Your email"
            suffix={<Icon name="arrowRight" />}
            className="rounded-lg"
          />
        </div>
        {/* -- Fotter Links */}
        <div className="mx-4 mt-4 grid shrink grid-cols-2 gap-8 pl-1.5 sm:mx-0 sm:mt-0 sm:grid-cols-footer-links md:flex">
          <div className=" border-white-smoke dark:border-none md:border-l md:pl-4">
            <LinksTile title="Marketplace" linksConfig={marketPlace} />
          </div>
          <div className="border-white-smoke dark:border-none sm:border-l sm:pl-4">
            <LinksTile title="Links" linksConfig={links} />
          </div>
          <div className="border-white-smoke dark:border-none sm:border-l sm:pl-4">
            <LinksTile title="Join us" linksConfig={joinUs} />
          </div>
        </div>
        {/* -- Footer Logo */}
        <div className="hidden flex-col gap-7 md:flex ">
          <div className="font-semi-bold flex items-center gap-5 text-2xl">
            <Icon name="logo" width="47" height="47" />
            <span>Archisinal</span>
          </div>
          <div className="text-txt-gray md:w-64 md:text-sm lg:w-82 lg:text-base">
            The world&apos;s largest digital trading platform for collectible
            cryptocurrencies and non-functioning tokens (NFTs). Buy, sell and
            discover exclusive digital items.
          </div>
        </div>
      </div>
    </>
  );
}
