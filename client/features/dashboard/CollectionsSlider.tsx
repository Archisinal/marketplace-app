import React, { Suspense } from "react";
import { SliderComponent, ItemCard } from "@/components";
import { getCollections } from "@/services";

function LoadingSliderSkeleton() {
  return (
    <div className="px-8 pb-24 container xlg:max-w-none animate-pulse">
      <div className="h-80 border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4 overflow-hidden grid mx-auto gap-6 sm:grid-cols-2 md:grid-cols-4 xlg:grid-cols-5">
        <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto "></div>
        <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto"></div>
        <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto"></div>
        <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto"></div>
        <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto"></div>
      </div>
    </div>
  );
}

async function CollectionList() {
  const { data } = await getCollections({});

  return (
    <div className="px-8 container xlg:max-w-none">
      <SliderComponent
        data={data}
        Component={ItemCard}
        sliderContainerClass="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4"
        showDots={false}
      />
    </div>
  );
}

export default function CollectionSlider() {
  return (
    <Suspense fallback={<LoadingSliderSkeleton />}>
      <CollectionList />
    </Suspense>
  );
}
