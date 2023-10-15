"use client";

import { useRouter } from "next/navigation";
import React, { FC } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { Button } from "../../components/ui/Button";
import { RESOLUTION_QUERY } from "../../utils/resolutionScreens";
import { redirect } from "next/navigation";

type TBanner = {};

const Banner: FC<TBanner> = ({}) => {
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-center sm:justify-normal container-sm sm:mb-8  md:mb-20 ">
        <p className="dark:text-dark-silver sm:dark:text-white text-center text-dark-silver text-lg sm:text-54px md:text-90px sm:text-black sm:text-left sm:font-semibold sm:p-2">
          Discover & Collect:
        </p>
        {isDesktop && (
          <span className="uppercase pl-24">5068+ Architectural art</span>
        )}{" "}
      </div>
      <p className="dark:text-white text-4xl sm:text-54px md:text-90px text-center sm:text-right font-semibold sm:mb-8 md:pr-16 lg:pr-52">
        The Future of Engineering
      </p>
      <div className="container mt-7 mx-auto text-center sm:text-lg sm:w-4/5 md:w-2/4 max-w-xl sm:pt-5">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text
      </div>
      <div className="mt-12 pb-24 sm:pb-28 md:pb-14 text-center">
        <Button
          title="Explore now"
          onClick={() => router.push("/explore")}
          styles="rounded-2xl"
        />
      </div>
    </div>
  );
};
export default Banner;
