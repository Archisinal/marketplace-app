import React, { FC } from "react";

type TListConfig = {
  config: { label: string; onClick?: () => void }[];
};

export const defaultConfig = [
  { label: "Explore", onClick: () => {} },
  { label: "Create" },
  { label: "Sell" },
  { label: "About us" },
];
export const List: FC<TListConfig> = ({ config = defaultConfig }) => {
  return (
    <div>
      <ul className="flex gap-10 font-semibold items-center h-full">
        {config.map(({ label, onClick }, i) => (
          <li key={i} onClick={onClick}>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};
