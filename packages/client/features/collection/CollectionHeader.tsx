'use client';

import { Collection } from '@archisinal/backend';
import React from 'react';
import { ImageComponent } from '@/components';
import { formatIpfsLink } from '@/utils/formaters';

function CollectionHeader({ collection }: { collection: Collection }) {
  return (
    <div className="relative flex h-28 sm:h-52 sm:w-full md:h-72">
      <ImageComponent
        fill={true}
        src={formatIpfsLink(collection.uri || '')}
        className="h-52 rounded-2xl object-cover sm:w-full md:h-72"
        alt="profile-header"
      />
    </div>
  );
}
export default CollectionHeader;
