"use client";
import React, { ElementType, useState, FC } from "react";
import { twMerge } from "tailwind-merge";

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
    <div className={twMerge("mx-4 sm:mx-6", className)}>
      <ul
        className={twMerge(
          "flex border-b dark:border-dark-gray gap-5 mb-3.5",
          listContainerClass
        )}
      >
        {config.map(({ label }) => {
          const isActiveTab = activeTab === label;

          return (
            <li
              onClick={onTabClickHandler(label)}
              className={`cursor-pointer text-xl pb-2.5 border-b -mb-[0.5px] sm:text-2xl font-semibold
                      ${
                        isActiveTab
                          ? "text-black dark:text-white border-black dark:border-white"
                          : "text-txt-gray border-none dark:text-txt-gray"
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
