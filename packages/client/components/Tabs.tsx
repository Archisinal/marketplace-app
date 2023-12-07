'use client';
import React, { ElementType, FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface IConfig {
  label: string;
  component: ElementType;
  icon?: string;

  [key: string]: any;
}

type TTabs = {
  config: IConfig[];
  initialTab: string;
  onChangeTab?: Function;
  className?: string;
  listContainerClass?: string;
};

const Tabs: FC<TTabs> = ({
  config,
  initialTab,
  onChangeTab,
  className,
  listContainerClass,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { component: Component, props }: any =
    config.find(({ label }: IConfig): boolean => label === activeTab) || {};

  const onTabClickHandler = (label: string) => () => setActiveTab(label);

  return (
    <div className={twMerge('mx-4 sm:mx-6', className)}>
      <ul
        className={twMerge(
          'mb-3.5 flex gap-5 border-b dark:border-dark-gray',
          listContainerClass,
        )}
      >
        {config.map(({ label }, i) => {
          const isActiveTab = activeTab === label;

          return (
            <li
              key={i}
              onClick={onTabClickHandler(label)}
              className={`-mb-[0.5px] cursor-pointer border-b pb-2.5 text-xl font-semibold sm:text-2xl
                      ${
                        isActiveTab
                          ? 'border-black text-black dark:border-white dark:text-white'
                          : 'border-none text-txt-gray dark:text-txt-gray'
                      }
                  `}
            >
              {label}
            </li>
          );
        })}
      </ul>
      {Component && <Component {...props} />}
    </div>
  );
};

export default Tabs;
