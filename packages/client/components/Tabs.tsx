'use client';
import React, { ElementType, FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';

interface IConfig {
  label: string;
  component: ElementType;
  icon?: string;
  count?: number;

  [key: string]: any;
}

type TTabs = {
  config: IConfig[];
  initialTab: string;
  className?: string;
  listContainerClass?: string;
  relativePath?: string;
  componentProps?: any;
};

const Tabs: FC<TTabs> = ({
  config,
  initialTab,
  className,
  listContainerClass,
  relativePath = '/explore',
  componentProps,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const router = useRouter();
  const { component: Component }: any =
    config.find(
      ({ label }: IConfig): boolean =>
        label.toLowerCase() === activeTab.toLowerCase(),
    ) || {};

  const onTabClickHandler = (label: string) => () =>
    router.push(`${relativePath}/${label.toLowerCase()}`, { scroll: false });

  return (
    <div
      className={twMerge(
        'min-h-[calc(100vh-260px)] sm:min-h-[calc(100vh-220px)]',
        className,
      )}
    >
      <ul
        className={twMerge(
          'mb-3.5 flex gap-5 border-b dark:border-dark-gray',
          listContainerClass,
        )}
      >
        {config.map(({ label, count }, i) => {
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
              {label} ({count})
            </li>
          );
        })}
      </ul>
      {Component && <Component {...componentProps} />}
    </div>
  );
};

export default Tabs;
