'use client';
import React, { FC, useState } from 'react';

type TDaysFilter = {
  config: { label: string; onClick?: () => void }[];
  initFilter: string;
};

const DaysFilter: FC<TDaysFilter> = ({ config, initFilter }) => {
  const [activeFilter, setActive] = useState(initFilter);

  const onClickHandler = (label: string) => () => setActive(label);

  return (
    <div className="flex cursor-pointer rounded-2xl bg-white-smoke p-px dark:bg-dark-gray">
      {config.map(({ label, onClick }, i) => {
        const isActive = label === activeFilter;
        return (
          <div
            key={i}
            className={`rounded-2xl p-2.5 text-sm font-semibold
            ${
              isActive ? 'bg-white dark:bg-ebony' : 'bg-transparent text-silver'
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
