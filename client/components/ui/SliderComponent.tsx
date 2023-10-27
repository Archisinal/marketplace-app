import React, { FC } from "react";
import { twMerge } from "tailwind-merge";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Icon from "../../icons";

type TSliderComponent = {
  data: any[];
  Component: React.ElementType;
  options?: { [key: string]: any };
  sliderContainerClass?: string;
  arrowClass?: string;
  showDots?: boolean;
};

type TArrowComponent = {
  onClick?: () => void;
  arrowClass?: string;
};

type TCustomeDot = {
  onClick?: () => void;
  active?: boolean;
};

const responsive = {
  fullDesktop: {
    breakpoint: { max: 4000, min: 1440 },
    items: 5,
    slidesToSlide: 1, // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 1440, min: 1280 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CustomLeftArrow: FC<TArrowComponent> = ({ onClick, arrowClass }) => {
  return (
    <span
      onClick={onClick}
      className={twMerge(
        "md:cursor-pointer shadow-chevron absolute left-0 p-1.5 rounded-full bg-white dark:border dark:border-white dark:bg-black-rus",
        arrowClass
      )}
    >
      <Icon name="nextLeft" width="24" height="24" />
    </span>
  );
};

const CustomRightArrow: FC<TArrowComponent> = ({ onClick, arrowClass }) => {
  return (
    <span
      onClick={onClick}
      className={twMerge(
        "md:cursor-pointer shadow-chevron absolute right-0 p-1.5 rounded-full bg-white dark:border dark:border-white dark:bg-black-rus",
        arrowClass
      )}
    >
      <Icon name="nextRight" width="24" height="24" />
    </span>
  );
};

const CustomDot: FC<TCustomeDot> = ({ onClick, active }) => {
  if (active) {
    return (
      <li
        onClick={onClick}
        className="dark:bg-white h-0.5 w-full bg-black"
      ></li>
    );
  } else {
    return <li onClick={onClick} className="h-0.5 w-full"></li>;
  }
};

export const SliderComponent: FC<TSliderComponent> = ({
  data,
  Component,
  options,
  sliderContainerClass,
  arrowClass,
  showDots = true,
}) => {
  return (
    <div className={sliderContainerClass}>
      <Carousel
        dotListClass="hidden"
        responsive={responsive}
        showDots={showDots}
        renderDotsOutside={true}
        customDot={<CustomDot />}
        slidesToSlide={1}
        customLeftArrow={<CustomLeftArrow arrowClass={arrowClass} />}
        customRightArrow={<CustomRightArrow arrowClass={arrowClass} />}
        {...options}
      >
        {data.map((val, index) => {
          return (
            <div key={index}>
              <Component {...val} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
