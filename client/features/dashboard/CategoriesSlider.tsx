import React, { Suspense } from "react";
import { SliderComponent, CategoryCard } from "@/components";
import { getCategories, getCollectionById } from "@/services";

function LoadingSliderSkeleton() {
  const classes = {
    xs: "border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4 h-48 grid gap-3.5 grid-cols-2 overflow-hidden",
    sm: "sm:grid-cols-3 sm:h-52 sm:gap-8",
    md: "md:grid-cols-5",
    xlg: "xlg:grid-cols-7",
  };
  return (
    <div className={`${classes.xs} ${classes.sm} ${classes.md} ${classes.xlg}`}>
      <div className="w-32 sm:w-56 h-40 mr-1.5 bg-button-gray dark:bg-dark-gray"></div>
      <div className="w-32 sm:w-56 h-40 mr-1.5 bg-button-gray dark:bg-dark-gray"></div>
      <div className="w-32 sm:w-56 h-40 mr-1.5 bg-button-gray dark:bg-dark-gray"></div>
      <div className="w-32 sm:w-56 h-40 mr-1.5 bg-button-gray dark:bg-dark-gray"></div>
      <div className="w-32 sm:w-56 h-40 mr-1.5 bg-button-gray dark:bg-dark-gray"></div>
      <div className="w-32 sm:w-56 h-40 mr-1.5 bg-button-gray dark:bg-dark-gray"></div>
      <div className="w-32 sm:w-56 h-40 mr-1.5 bg-button-gray dark:bg-dark-gray"></div>
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
          itemClass: "!w-36 sm:!w-60 xlg:!w-64",
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
