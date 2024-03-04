'use client';

import { Collection } from '@archisinal/backend';
import React from 'react';
import { ImageComponent } from '@/components';
import { formatIpfsLink } from '@/utils/formaters';

function CollectionHeader({ collection }: { collection: Collection }) {
  return (
    <div className="relative flex aspect-video w-full sm:aspect-auto sm:h-52 md:h-72">
      <ImageComponent
        fill={true}
        src={formatIpfsLink(collection.uri || '')}
        className=" h-full w-full rounded-2xl object-cover  md:h-72"
        alt="profile-header"
      />
    </div>
  );
}

export default CollectionHeader;
