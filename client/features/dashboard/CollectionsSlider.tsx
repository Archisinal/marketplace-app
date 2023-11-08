import React, { Suspense } from 'react';
import { ItemCard, SliderComponent } from '@/components';
import { getCollections } from '@/services';
import { twMerge } from 'tailwind-merge';

const CardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        'flex cursor-pointer flex-col rounded-2xl sm:max-w-xs md:w-72',
        className,
      )}
    >
      <div className="h-48 translate-y-2.5 rounded-2xl bg-davys-gray sm:w-80 md:h-56 md:w-72 lg:h-72"></div>
      <div className="rounded-b-20 border pt-4 dark:border-dark-gray">
        <div className="flex flex-col gap-2 px-5">
          <p className="h-7 w-60 truncate rounded bg-davys-gray text-xl font-extrabold lg:w-64"></p>
          <p className="h-5 w-60 truncate rounded bg-davys-gray text-txt-gray lg:w-64"></p>
        </div>
        <div className=" mb-4 mt-4 px-5">
          <p className="border-t dark:border-dark-gray"></p>
          <div className="mt-4 flex items-center">
            <div className="mr-2.5 ">
              <div className="h-9 w-9 rounded-xl bg-davys-gray sm:h-12 sm:w-12"></div>
              {/* <ImageComponent width={46} height={46} src={owner.imgSrc} /> */}
            </div>
            <div className="flex w-full justify-between">
              <div>
                <p className="text-txt-gray ">By owner</p>
                <p className="h-4 w-20 rounded bg-davys-gray text-lg font-semibold"></p>
              </div>
              <div>
                <p className="text-end text-txt-gray">Price</p>
                <p className="flex h-5 w-16 gap-1 rounded bg-davys-gray text-lg font-semibold">
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
    <div className="container animate-pulse px-8 xlg:max-w-none">
      <div className=" mx-auto flex justify-evenly gap-6 overflow-hidden rounded-20 border border-stroke-gray p-4  dark:border-none dark:bg-dark">
        <CardSkeleton />
        <CardSkeleton className="hidden sm:block" />
        <CardSkeleton className="hidden md:block" />
        <CardSkeleton className="hidden md:block" />
        <CardSkeleton className="hidden xlg:block" />
      </div>
    </div>
  );
}

async function CollectionList() {
  const { data } = await getCollections({});

  return (
    <div className="container px-6 xlg:max-w-none">
      <SliderComponent
        data={data}
        Component={ItemCard}
        sliderContainerClass="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4"
        showDots={false}
        options={{
          itemClass: 'w-82',
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
