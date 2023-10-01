import React, { FC } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Icon from "../icons";

type TSliderComponent = {
  data: any[];
  Component: React.ElementType;
  options?: { [key: string]: any };
  sliderContainerClass?: string;
};

type TArrowComponent = {
  onClick?: () => void;
};

type TCustomeDot = {
  onClick?: () => void;
  active?: boolean;
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CustomLeftArrow: FC<TArrowComponent> = ({ onClick }) => {
  return (
    <span onClick={onClick} className="absolute left-0 top-[85px]">
      <Icon name="slideLeftArrow" />
    </span>
  );
};

const CustomRightArrow: FC<TArrowComponent> = ({ onClick }) => {
  return (
    <span onClick={onClick} className="absolute right-0 top-[85px]">
      <Icon name="slideRightArrow" />
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
}) => {
  return (
    <div className={sliderContainerClass}>
      <Carousel
        sliderClass="gap-4"
        dotListClass="dark:bg-ebony w-5/6 bg-light-silver !relative !mt-[15px] !mx-auto"
        responsive={responsive}
        showDots={true}
        renderDotsOutside={true}
        customDot={<CustomDot />}
        slidesToSlide={1}
        itemClass=" md:pl-[10px] lg:pl-[35px]"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
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
