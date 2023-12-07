import React, { Suspense } from 'react';
import { twMerge } from 'tailwind-merge';
import { AuctionCard, SliderComponent } from '@/components';
import { getAuctions } from '@/services';

const AuctionCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        'flex w-56 w-60 animate-pulse cursor-pointer flex-col rounded-2xl sm:w-82',
        className,
      )}
    >
      <div className="h-[178px] translate-y-2.5 rounded-2xl bg-davys-gray sm:h-[228px]"></div>
      <div className="rounded-b-20 border pt-4 dark:!border-dark-gray">
        <div className="flex flex-col gap-2 px-5">
          <p className="h-6 w-44 rounded bg-davys-gray font-extrabold sm:h-7 sm:w-72"></p>
          <p className="hidden h-4 w-32 rounded bg-davys-gray text-txt-gray sm:block sm:h-5 sm:w-52"></p>
        </div>
        <div className=" mb-4 mt-4 px-5">
          <p className="border-t dark:!border-dark-gray"></p>
          <div className="mt-4 flex items-center">
            <div className="flex w-full justify-between">
              <div>
                <p className="text-xs text-txt-gray sm:text-base ">Ends in</p>
                <p className="h-5 w-14 rounded bg-davys-gray text-sm font-semibold sm:h-6 sm:text-base"></p>
              </div>
              <div>
                <p className="text-xs text-txt-gray">Highest Bid</p>
                <p className="flex h-5 w-28 gap-1 rounded bg-davys-gray text-sm font-semibold sm:h-6"></p>
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
      <div className="border-stroke-grey mx-auto flex gap-6 overflow-hidden rounded-20 border p-4 dark:border-none dark:bg-dark">
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
          itemClass: '!w-60 sm:!w-84',
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
