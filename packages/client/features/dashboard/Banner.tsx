'use client';

import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { Button } from '@/components/ui/Button';

type TBanner = {};

const Banner: FC<TBanner> = ({}) => {
  const router = useRouter();

  return (
    <div>
      <div className="container-sm flex justify-center sm:mb-8 sm:justify-normal md:mb-20 ">
        <p className="text-center text-lg text-dark-silver dark:text-dark-silver sm:p-2 sm:text-left sm:text-54px sm:font-semibold sm:text-black sm:dark:text-white md:text-90px">
          Discover & Collect:
        </p>
      </div>
      <p className="text-center text-4xl font-semibold dark:text-white sm:mb-8 sm:text-right sm:text-54px md:pr-16 md:text-90px lg:pr-52">
        The Future of Engineering
      </p>
      <div className="container mx-auto mt-7 max-w-xl text-center sm:w-4/5 sm:pt-5 sm:text-lg md:w-2/4">
        A marketplace for architects and engineers to tokenize and monetize
        their digital designs
      </div>
      <div className="mt-12 text-center">
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
