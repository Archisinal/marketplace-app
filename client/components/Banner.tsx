import React, { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "./Button";
import { RESOLUTION_QUERY } from "../utils/resolutionScreens";

type TBanner = {};

const Banner: FC<TBanner> = ({}) => {
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);
  return (
    <div className="px-4">
      <div className="flex justify-center sm:justify-normal">
        <p className="dark:text-dark-silver sm:dark:text-white text-center text-dark-silver text-lg sm:text-54px md:text-90px sm:text-black sm:text-left sm:font-semibold sm:p-2">
          Discover & Collect:
        </p>
        {isDesktop && (
          <span className="text-18px uppercase pl-24">
            5068+ Architectural art
          </span>
        )}{" "}
      </div>
      <p className="dark:text-white text-4xl sm:text-54px md:text-90px text-center sm:text-right font-semibold sm:my-8 md:pr-16 lg:pr-52">
        The Future of Engineering
      </p>
      <div className="mt-8 mx-auto text-center sm:text-lg sm:max-w-[80%] md:max-w-[50%] sm:pt-5">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text
      </div>
      <div className="mt-12 pb-24 sm:pb-32 text-center">
        <Button title="Explore now" onClick={() => {}} styles="rounded-lg" />
      </div>
    </div>
  );
};
export default Banner;
