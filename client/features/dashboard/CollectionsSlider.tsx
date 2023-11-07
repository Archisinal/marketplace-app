import React, { Suspense } from "react";
import { SliderComponent, ItemCard } from "@/components";
import { getCollections } from "@/services";
import { twMerge } from "tailwind-merge";

const CardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col sm:max-w-xs md:w-72 cursor-pointer rounded-2xl",
        className
      )}
    >
      <div className="h-48 md:h-56 lg:h-72 translate-y-2.5 bg-davys-gray rounded-2xl"></div>
      <div className="border dark:border-dark-gray rounded-b-20 pt-4">
        <div className="px-5 flex flex-col gap-2">
          <p className="text-xl font-extrabold truncate h-7 w-60 lg:w-64 bg-davys-gray"></p>
          <p className="text-txt-gray truncate h-6 w-60 lg:w-64 bg-davys-gray"></p>
        </div>
        <div className=" px-5 mt-4 mb-4">
          <p className="border-t dark:border-dark-gray"></p>
          <div className="flex mt-4 items-center">
            <div className="mr-2.5 ">
              <div className="h-12 w-12 bg-davys-gray rounded-xl"></div>
              {/* <ImageComponent width={46} height={46} src={owner.imgSrc} /> */}
            </div>
            <div className="flex justify-between w-full">
              <div>
                <p className="text-txt-gray ">By owner</p>
                <p className="text-lg font-semibold h-4 w-20 bg-davys-gray"></p>
              </div>
              <div>
                <p className="text-txt-gray text-end">Price</p>
                <p className="text-lg flex gap-1 font-semibold h-4 w-16 bg-davys-gray">
                  {/* <span>{abbriviateNumber(price.value)}</span>
                <span className="text-davys-gray">{price.currency}</span> */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function LoadingSliderSkeleton() {
  return (
    <div className="px-8 container xlg:max-w-none animate-pulse">
      <div className="border dark:bg-dark dark:border-none border-stroke-gray rounded-20 p-4 overflow-hidden grid mx-auto gap-6 sm:grid-cols-2 md:grid-cols-4 xlg:grid-cols-5">
        <CardSkeleton />
        <CardSkeleton className="hidden sm:block" />
        <CardSkeleton className="hidden md:block" />
        <CardSkeleton className="hidden md:block" />
        <CardSkeleton className="hidden xlg:block" />
        {/* <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto"></div>
        <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto"></div>
        <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto"></div>
        <div className="w-64 h-72  bg-gray-200 dark:bg-dark-gray rounded-2xl mx-auto"></div> */}
      </div>
    </div>
  );
}

async function CollectionList() {
  const { data } = await getCollections({});

  return (
    <div className="px-6 container xlg:max-w-none">
      <SliderComponent
        data={data}
        Component={ItemCard}
        sliderContainerClass="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4"
        showDots={false}
        options={{
          itemClass: "w-82",
        }}
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
