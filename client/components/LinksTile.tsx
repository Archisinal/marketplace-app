import React, { FC } from "react";

type TLinksTile = {
  title: string;
  linksConfig: { linkName: string }[];
};

export const LinksTile: FC<TLinksTile> = ({ title, linksConfig = [] }) => {
  return (
    <div>
      <p className="text-xl pb-4 font-bold md:text-2xl whitespace-nowrap">
        {title}
      </p>
      <div>
        <ul className="flex flex-col gap-2.5">
          {linksConfig.map(({ linkName }, index) => (
            <li
              className="dark:text-dolphin text-dim-gray whitespace-nowrap cursor-pointer"
              key={index}
            >
              {linkName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
