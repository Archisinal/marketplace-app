import React, {
  ReactElement,
  useState,
  MouseEvent,
  FC,
  useCallback,
} from "react";

interface IConfig {
  label: string;
  component: ReactElement;
  icon?: string;
  [key: string]: any;
}

type TTabs = {
  config: IConfig[];
  initialTab: string;
  onChangeTab?: Function;
};

const Tabs: FC<TTabs> = ({ config, initialTab, onChangeTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const { component: Component, props }: any =
    config.find(({ label }: IConfig): boolean => label === activeTab) || {};

  const clickTabHanller = (label: string) => () => setActiveTab(label);

  return (
    <div className="mx-4">
      <ul className="flex border-b dark:border-dark-gray gap-5">
        {config.map(({ label }) => {
          const isActiveTab = activeTab === label;

          return (
            <li
              onClick={clickTabHanller(label)}
              className={`text-xl pb-2.5 border-b -mb-[0.5px]
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
