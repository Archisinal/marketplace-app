import React, { Suspense } from "react";
import { twJoin } from "tailwind-merge";
import { SliderComponent, AuctionCard } from "@/components";
import { getAuctions } from "@/services";

function LoadingSliderSkeleton() {
  const classes = {
    xs: "h-80 border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4 overflow-hidden grid mx-auto gap-6",
    sm: "sm:grid-cols-2",
    md: "md:grid-cols-4",
    xlg: "xlg:grid-cols-5",
  };

  return (
    <div className="px-8 pb-24 container xlg:max-w-none">
      <div className={twJoin(classes.xs, classes.sm, classes.md, classes.xlg)}>
        <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto "></div>
        <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto"></div>
        <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto"></div>
        <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto"></div>
        <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto"></div>
      </div>
    </div>
  );
}

async function AuctionsList() {
  const { data } = await getAuctions({});

  return (
    <div>
      <SliderComponent
        data={data}
        Component={AuctionCard}
        sliderContainerClass="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4"
        arrowClass="hidden sm:block"
        options={{
          showDots: false,
          itemClass: "!w-60 sm:!w-84",
          centerMode: true,
        }}
      />
    </div>
  );
}

export default function AuctionsSlider() {
  return (
    <Suspense fallback={<LoadingSliderSkeleton />}>
      <AuctionsList />
    </Suspense>
  );
}
