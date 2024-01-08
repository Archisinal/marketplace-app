'use client';
import React, { ElementType, FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';

interface IConfig {
  label: string;
  component: ElementType;
  icon?: string;

  [key: string]: any;
}

type TTabs = {
  config: IConfig[];
  initialTab: string;
  className?: string;
  listContainerClass?: string;
  relativePath?: string;
};

const Tabs: FC<TTabs> = ({
  config,
  initialTab,
  className,
  listContainerClass,
  relativePath = '/explore',
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const router = useRouter();
  const { component: Component, props }: any =
    config.find(
      ({ label }: IConfig): boolean =>
        label.toLowerCase() === activeTab.toLowerCase(),
    ) || {};

  const onTabClickHandler = (label: string) => () =>
    router.push(`${relativePath}/${label.toLowerCase()}`, { scroll: false });

  return (
    <div className={twMerge('mx-4 sm:mx-6', className)}>
      <ul
        className={twMerge(
          'mb-3.5 flex gap-5 border-b dark:border-dark-gray',
          listContainerClass,
        )}
      >
        {config.map(({ label }, i) => {
          const isActiveTab = activeTab.toLowerCase() === label.toLowerCase();
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
