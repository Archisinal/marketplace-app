import React, { Suspense } from 'react';
import { SliderComponent } from '@/components';
import { getNFTsOnSale } from '@/services';
import NftListItem from '@/features/nft/NftListItem';

async function NftsFeaturedList() {
  const nfts = await getNFTsOnSale({ last_n: 10 });

  return (
    <div className="px-4 md:px-8 xlg:max-w-none">
      <SliderComponent
        data={nfts.map((nft) => ({ nft }))}
        Component={NftListItem}
        sliderContainerClass="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4"
        showDots={false}
        options={{
          partialVisible: false,
        }}
      />
    </div>
  );
}

export default function NftsFeaturedSlider() {
  return (
    <Suspense>
      <NftsFeaturedList />
    </Suspense>
  );
}
