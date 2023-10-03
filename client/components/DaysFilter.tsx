import React, { FC, useState } from "react";

type TDaysFilter = {
  config: { label: string; onClick?: () => void }[];
  initFilter: string;
};

const DaysFilter: FC<TDaysFilter> = ({ config, initFilter }) => {
  const [activeFilter, setActive] = useState(initFilter);

  const onClickHandler = (label: string) => () => setActive(label);

  return (
    <div className="dark:bg-dark-gray rounded-2xl bg-white-smoke flex p-px">
      {config.map(({ label, onClick }) => {
        const isActive = label === activeFilter;
        return (
          <div
            className={`rounded-2xl p-2.5
            ${
              isActive ? "dark:bg-ebony bg-white" : "bg-transparent text-silver"
            }`}
            onClick={onClickHandler(label)}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default DaysFilter;
