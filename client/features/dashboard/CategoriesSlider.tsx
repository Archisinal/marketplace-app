import React, { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import { SliderComponent, CategoryCard } from "@/components";
import { getCategories } from "@/services";

const CategoryCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col  rounded-2xl max-w-[138px] sm:w-[225px] sm:max-w-[245px] md:max-w-[229px] lg:w-56 xlg:w-60",
        className
      )}
    >
      <div className="h-36 sm:h-36 bg-davys-gray rounded-2xl"></div>
      <div className="font-semibold my-4 text-center h-6 bg-davys-gray"></div>
    </div>
  );
};

function LoadingSliderSkeleton() {
  const classes = {
    xs: "border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4 grid gap-3.5 grid-cols-2 overflow-hidden",
    sm: "sm:grid-cols-3 sm:h-52 sm:gap-8",
    md: "md:grid-cols-5",
    lg: "lg:pl-12",
    xlg: "xlg:grid-cols-7",
  };
  return (
    <div
      className={`${classes.xs} ${classes.sm} ${classes.md} ${classes.lg} ${classes.xlg} animate-pulse`}
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

async function CategoriesList() {
  const { data } = await getCategories();

  return (
    <div>
      <SliderComponent
        data={data}
        Component={CategoryCard}
        sliderContainerClass="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4"
        options={{
          itemClass: "!w-36 sm:!w-60 lg:!w-64 xlg:!w-64",
          arrows: false,
          centerMode: true,
          containerClass: "md:justify-center p-1",
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
