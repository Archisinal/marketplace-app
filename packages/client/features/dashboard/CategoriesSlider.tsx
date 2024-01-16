import React, { Suspense } from 'react';
import { twMerge } from 'tailwind-merge';
import { CategoryCard, SliderComponent } from '@/components';
import { getCategories } from '@/services';

const CategoryCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        'flex max-w-[138px]  flex-col rounded-2xl sm:w-[225px] sm:max-w-[245px] md:max-w-[229px] lg:w-56 xlg:w-60',
        className,
      )}
    >
      <div className="h-28 rounded-2xl bg-davys-gray sm:h-36"></div>
      <div className="my-5 h-6 rounded bg-davys-gray text-center font-semibold"></div>
    </div>
  );
};

function LoadingSliderSkeleton() {
  const classes = {
    xs: 'border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4 grid grid-cols-2 gap-3',
    sm: 'sm:gap-8 sm:flex',
    lg: 'lg:pl-12',
    xlg: '',
  };
  return (
    <div
      className={`${classes.xs} ${classes.sm} ${classes.lg} ${classes.xlg} animate-pulse`}
    >
      <CategoryCardSkeleton />
      <CategoryCardSkeleton />
      <CategoryCardSkeleton className="hidden sm:block" />
      <CategoryCardSkeleton className="hidden md:block" />
      <CategoryCardSkeleton className="hidden md:block" />
      <CategoryCardSkeleton className="hidden xlg:block" />
      <CategoryCardSkeleton className="hidden xlg:block" />
    </div>
  );
}
const responsive = {
  fullDesktop: {
    breakpoint: { max: 4000, min: 1440 },
    items: 7,
    slidesToSlide: 1, // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 1440, min: 1280 },
    items: 5,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

async function CategoriesList() {
  const { data } = await getCategories();

  return (
    <div>
      <SliderComponent
        data={data}
        Component={CategoryCard}
        sliderContainerClass="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4"
        options={{
          arrows: true,
          containerClass: 'md:justify-center p-1',
          responsive: responsive,
        }}
        showDots={false}
      />
    </div>
  );
}

export default function CategoriesSlider() {
  return (
    <Suspense fallback={<LoadingSliderSkeleton />}>
      <CategoriesList />
    </Suspense>
  );
}
