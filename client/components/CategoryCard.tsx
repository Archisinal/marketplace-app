import React, { FC } from "react";
import ImageComponent from "./ImageComponent";

type TCategoryCard = {
  itemImg: string;
  category: string;
};

const CategoryCard: FC<TCategoryCard> = ({ itemImg, category }) => {
  return (
    <div className="flex  flex-col border rounded-2xl max-w-sm ">
      <div className="min-h-[115px]">
        <ImageComponent
          src={itemImg}
          style={{ height: "100%", width: "100%" }} //aligning images
        />
      </div>
      <div className="font-semibold my-4 text-center">{category}</div>
    </div>
  );
};

export default CategoryCard;
