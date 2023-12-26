'use client';

import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { Button } from '@/components/ui/Button';

type TBanner = {};

const Banner: FC<TBanner> = ({}) => {
  const router = useRouter();

  return (
    <div>
      <div className="container-sm flex justify-center sm:mb-8 sm:justify-normal  md:mb-20 ">
        <p className="text-center text-lg text-dark-silver sm:p-2 sm:text-left sm:text-54px sm:font-semibold sm:text-black md:text-90px dark:text-dark-silver sm:dark:text-white">
          Discover & Collect:
        </p>
        <span className="hidden pl-24 uppercase md:flex">
          5068+ Architectural art
        </span>
      </div>
      <p className="text-center text-4xl font-semibold sm:mb-8 sm:text-right sm:text-54px md:pr-16 md:text-90px lg:pr-52 dark:text-white">
        The Future of Engineering
      </p>
      <div className="container mx-auto mt-7 max-w-xl text-center sm:w-4/5 sm:pt-5 sm:text-lg md:w-2/4">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
      </div>
      <div className="mt-12 pb-24 text-center sm:pb-28 md:pb-14">
        <Button
          title="Explore now"
          onClick={() => router.push('/explore/collections')}
          className="rounded-2xl"
        />
      </div>
    </div>
  );
};
export default Banner;
