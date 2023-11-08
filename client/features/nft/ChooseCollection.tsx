import React from 'react';
import { Icon, ImageComponent } from '@/components';

const ChooseCollection = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-bold">Choose collection</p>
      <div className="grid grid-cols-3 gap-2 sm:flex">
        <div className="flex cursor-pointer flex-col gap-2 rounded-2xl border p-4 sm:w-32">
          <ImageComponent
            src="/mockAssets/3.png"
            className="h-14 w-14 rounded-2xl"
          />
          <p className="text-sm font-semibold">AlexByArc</p>
          <p className="text-xs text-txt-gray">AlexByArc</p>
        </div>
        <div className="flex cursor-pointer flex-col gap-2 rounded-2xl border p-4 sm:w-32">
          <ImageComponent
            src="/mockAssets/1.png"
            className="h-14 w-14 rounded-2xl"
          />
          <p className="text-sm font-semibold">AlexByArc</p>
          <p className="text-xs text-txt-gray">AlexByArc</p>
        </div>
        <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl p-4 font-semibold text-txt-gray dark:text-white sm:w-32">
          <span>
            <Icon name="circleAddFilled" />
          </span>
          <span>Create</span>
        </div>
      </div>
    </div>
  );
};

export default ChooseCollection;
