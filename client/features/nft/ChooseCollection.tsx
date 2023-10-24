import React from "react";
import { ImageComponent, Icon } from "@/components";

const ChooseCollection = () => {
  return (
    <div>
      <p className="font-bold">Choose collection</p>
      <div className="grid grid-cols-3 sm:flex gap-2">
        <div className="rounded-2xl border p-4 flex flex-col gap-2 cursor-pointer sm:w-32">
          <ImageComponent
            src="/mockAssets/3.png"
            className="rounded-2xl w-14 h-14"
          />
          <p className="text-sm font-semibold">AlexByArc</p>
          <p className="text-xs text-txt-gray">AlexByArc</p>
        </div>
        <div className="rounded-2xl border p-4 flex flex-col gap-2 cursor-pointer sm:w-32">
          <ImageComponent
            src="/mockAssets/1.png"
            className="rounded-2xl w-14 h-14"
          />
          <p className="text-sm font-semibold">AlexByArc</p>
          <p className="text-xs text-txt-gray">AlexByArc</p>
        </div>
        <div className="rounded-2xl p-4 flex flex-col gap-2 items-center justify-center text-txt-gray dark:text-white font-semibold cursor-pointer sm:w-32">
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
