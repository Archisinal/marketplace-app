import React, { Suspense } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import { SliderComponent, AuctionCard } from "@/components";
import { getAuctions } from "@/services";

const AuctionCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "cursor-pointer flex flex-col w-56 sm:w-82 rounded-2xl w-60 animate-pulse",
        className
      )}
    >
      <div className="h-[178px] sm:h-[228px] translate-y-2.5 bg-davys-gray rounded-2xl"></div>
      <div className="border dark:!border-dark-gray rounded-b-20 pt-4">
        <div className="px-5 flex flex-col gap-2">
          <p className="font-extrabold w-44 sm:w-72 h-4 sm:h-5 bg-davys-gray"></p>
          <p className="text-txt-gray hidden sm:block w-32 sm:w-52 h-4 sm:h-5 bg-davys-gray"></p>
        </div>
        <div className=" px-5 mt-4 mb-4">
          <p className="border-t dark:!border-dark-gray"></p>
          <div className="flex mt-4 items-center">
            <div className="flex justify-between w-full">
              <div>
                <p className="text-xs text-txt-gray ">Ends in</p>
                <p className="text-sm font-semibold w-14 h-4 sm:h-5 bg-davys-gray"></p>
              </div>
              <div>
                <p className="text-xs text-txt-gray">Highest Bid</p>
                <p className="text-sm flex gap-1 font-semibold w-28 h-4 sm:h-5 bg-davys-gray"></p>
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
    <div className=" container xlg:max-w-none">
      <div className="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4 overflow-hidden flex mx-auto gap-6">
        <AuctionCardSkeleton />
        <AuctionCardSkeleton />
        <AuctionCardSkeleton className="hidden md:block" />
        <AuctionCardSkeleton className="hidden lg:block" />
        <AuctionCardSkeleton className="hidden xlg:block" />
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
