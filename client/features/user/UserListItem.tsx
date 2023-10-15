import React from "react";
import { useTheme } from "next-themes";

import { ImageComponent, MultiButton, Icon } from "../../components";

const UserListItem = ({ itemImg = "/mockAssets/1.png", name, followers }) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col max-w-sm cursor-pointer">
      <div className="h-[174px] sm:h-[178px] translate-y-2.5">
        <ImageComponent
          src={itemImg}
          style={{ height: "100%", width: "100%" }} //aligning images
        />
      </div>
      <div className="border dark:!border-davys-gray rounded-b-20 pt-4 flex justify-between">
        <div className="px-5 self-center flex flex-col gap-2">
          <p className="font-extrabold text-xl sm:text-lg truncate">Alex4849</p>
          <p className="text-txt-gray truncate">{`${2.2}K Followers`}</p>
        </div>
        <div className="px-5 mt-2 mb-2 flex gap-2 text-sm sm:text-base">
          <MultiButton
            title="Follow"
            suffix={
              <Icon
                name="follow"
                color={theme === "light" ? "#909090" : "white"}
              />
            }
            styles="py-3 px-6 text-lg rounded-xl font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
