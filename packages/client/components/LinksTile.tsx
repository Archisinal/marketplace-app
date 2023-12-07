import React, { FC } from 'react';

type TLinksTile = {
  title: string;
  linksConfig: { linkName: string }[];
};

export const LinksTile: FC<TLinksTile> = ({ title, linksConfig = [] }) => {
  return (
    <div>
      <p className="whitespace-nowrap pb-4 text-xl font-bold md:text-2xl">
        {title}
      </p>
      <div>
        <ul className="flex flex-col gap-2.5">
          {linksConfig.map(({ linkName }, index) => (
            <li
              className="cursor-pointer whitespace-nowrap text-dim-gray dark:text-dolphin"
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
