import React, { Suspense } from 'react';
import { SliderComponent } from '@/components';
import { getCollections } from '@/services';
import CollectionCardItem from '@/features/dashboard/CollectionCardItem';

async function CollectionList() {
  const collections = await getCollections({ last_n: 10 });

  return (
    <div className="xlg:max-w-none">
      <SliderComponent
        data={collections.map((collection) => ({ collection }))}
        Component={CollectionCardItem}
        sliderContainerClass="border dark:bg-dark dark:border-none border-stroke-grey rounded-20 p-4"
        showDots={false}
        options={{
          partialVisible: false,
        }}
      />
    </div>
  );
}

export default function CollectionsSlider() {
  return (
    <Suspense>
      <CollectionList />
    </Suspense>
  );
}
