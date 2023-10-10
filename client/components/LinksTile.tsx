import React, { FC } from "react";

type TLinksTile = {
  title: string;
  linksConfig: { linkName: string }[];
};

export const LinksTile: FC<TLinksTile> = ({ title, linksConfig = [] }) => {
  return (
    <div>
      <p className="text-xl pb-4 font-bold">{title}</p>
      <div>
        <ul className="flex flex-col gap-2.5">
          {linksConfig.map(({ linkName }) => (
            <li className="dark:text-dolphin text-dim-gray whitespace-nowrap">
              {linkName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
