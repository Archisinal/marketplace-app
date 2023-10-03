import React, { FC } from "react";
import Icon from "../icons";
import { TIconNames } from "../icons/Icons.types";

type TActionTile = {
  iconName: string;
  title: string;
  description: string;
};

export const ActionTile: FC<TActionTile> = ({
  iconName,
  title,
  description,
}) => {
  const bgClass: { [key: string]: string } = {
    wallet: "bg-neon-blue",
    store: "bg-chateau-green",
    mountains: "bg-blue-violet",
    sale: "bg-cinnabar",
  };

  return (
    <div className="dark:bg-dark p-5 bg-button-gray flex flex-col gap-2.5 rounded-[15px] cursor-pointer">
      <div
        className={`w-[52px] h-[52px] rounded-10 flex justify-center items-center ${bgClass[iconName]}`}
      >
        <Icon name={iconName as TIconNames} />
      </div>
      <div className="text-xl font-bold ">{title}</div>
      <div className="text-dim-gray">{description}</div>
    </div>
  );
};
