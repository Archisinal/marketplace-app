import React, { FC } from "react";
import { useMediaQuery } from "react-responsive";

type TTabsConfig = {
  config: { label: string; onClick?: () => void }[];
};

export const defaultConfig = [
  { label: "Explore", onClick: () => {} },
  { label: "Create" },
  { label: "Sell" },
  { label: "About us" },
];
export const Tabs: FC<TTabsConfig> = ({ config = defaultConfig }) => {
  return (
    <div>
      <ul className="flex gap-10 font-semibold items-center h-full">
        {config.map(({ label, onClick }) => (
          <li onClick={onClick}>{label}</li>
        ))}
      </ul>
    </div>
  );
};
