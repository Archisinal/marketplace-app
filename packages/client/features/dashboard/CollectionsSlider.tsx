import React, { Suspense } from 'react';
import { ItemCard, SliderComponent } from '@/components';
import { getCollections } from '@/services';
import { twMerge, twJoin } from 'tailwind-merge';

const CardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge('flex flex-col rounded-2xl', className)}>
      <div className="h-48 translate-y-2.5 rounded-2xl  bg-davys-gray md:h-56 lg:h-72"></div>
      <div className="rounded-b-20 border pt-6 dark:border-dark-gray">
        <div className="flex flex-col gap-2 px-[18px] sm:px-[39px] md:px-[23px] lg:px-[31px]">
          <p className="h-7 w-60 truncate rounded bg-davys-gray text-xl font-extrabold lg:w-64"></p>
          <p className="h-5 w-60 truncate rounded bg-davys-gray text-txt-gray lg:w-64"></p>
        </div>
        <div className=" mb-4 mt-4 px-5">
          <p className="border-t dark:border-dark-gray"></p>
          <div className="mt-4 flex items-center">
            <div className="mr-2.5 ">
              <div className="h-9 w-9 rounded-xl bg-davys-gray sm:h-12 sm:w-12"></div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex flex-col gap-2">
                <p className="h-4 w-20 rounded bg-davys-gray "></p>
                <p className="h-4 w-20 rounded bg-davys-gray "></p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="h-4 w-16 bg-davys-gray"></p>
                <p className="h-5 w-16 rounded bg-davys-gray"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function LoadingSliderSkeleton() {
  const classes = {
    sm: 'sm:h-[405px] sm:w-[720px] sm:justify-start',
    md: 'md:w-[1232px] md:h-[437px]  md:gap-3',
    lg: 'lg:w-[1392px] lg:h-[501px] lg:gap-5',
    xlg: 'xlg:w-[1855px] xlg:gap-11',
  };

  return (
    <div className="container animate-pulse px-6 xlg:max-w-none">
      <div
        className={twJoin(
          'mx-auto flex h-[401px] w-[312px] justify-evenly gap-[23px] rounded-20 border border-stroke-gray p-4 dark:border-none dark:bg-dark',
          classes.sm,
          classes.md,
          classes.lg,
          classes.xlg,
        )}
      >
        <CardSkeleton />
        <CardSkeleton className="hidden sm:flex" />
        <CardSkeleton className="hidden md:flex" />
        <CardSkeleton className="hidden md:flex" />
        <CardSkeleton className="hidden xlg:flex" />
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
