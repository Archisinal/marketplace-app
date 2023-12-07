import React from 'react';
import { Icon } from '@/components';

export default function LoadingExplorePage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white opacity-80 dark:bg-dark-gray">
      <div className="mx-auto animate-pulse ">
        <Icon name="logo" width="80" height="80" />
      </div>
    </div>
  );
}
