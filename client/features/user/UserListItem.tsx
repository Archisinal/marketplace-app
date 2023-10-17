import React, { FC } from "react";
import { useTheme } from "next-themes";

import { ImageComponent, MultiButton, Icon } from "../../components";

type TUserListItem = {
  itemImg: string;
  owner: { name: string; followers: string | number };
};

const UserListItem: FC<TUserListItem> = ({
  itemImg,
  owner: { name, followers },
}) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col  cursor-pointer">
      <div className="h-44 translate-y-2.5 relative">
        <ImageComponent
          src={itemImg}
          style={{ height: "100%", width: "100%", borderRadius: "20px" }} //aligning images
        />
        <span className="flex h-16 w-16 rounded-full bg-light-silver items-center justify-center relative bottom-14 left-5">
          <Icon name="user" />
        </span>
      </div>
      <div className="border dark:!border-dark-gray rounded-b-20 pt-4 flex justify-between">
        <div className="px-5 self-center flex flex-col gap-2">
          <p className="font-extrabold text-xl sm:text-lg truncate">{name}</p>
          <p className="text-txt-gray truncate">{`${followers} Followers`}</p>
        </div>
        <div className="px-5 mt-2 mb-2 flex gap-2 text-sm sm:text-base pb-4">
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
