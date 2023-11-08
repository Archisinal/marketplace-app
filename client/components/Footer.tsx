import React from "react";
import { useTheme } from "next-themes";
import { MultiButton } from "../components";
import Icon from "../icons";

export const Footer = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex flex-col items-center gap-2.5 sm:gap-6 mt-11 mx-4 sm:mx-0 border-t dark:border-dark-gray sm:flex-row justify-center py-4">
        <p className="dark:text-dolphin sm:text-xs">©Archisinal, Inc.</p>
        <div className="flex gap-7 text-xs dark:text-dolphin">
          <span className="cursor-pointer">Community guidelines</span>
          <span className="cursor-pointer">Terms</span>
          <span className="cursor-pointer">Privacy policy</span>
        </div>
        <MultiButton
          title={
            <span className="text-sm">
              {theme === "light" ? "Light" : "Dark"}
            </span>
          }
          prefix={<Icon name="sun" />}
          suffix={<Icon name="chevronDown" />}
          styles="py-1 px-2.5  rounded-lg bg-white-smoke"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
      </div>
    </>
  );
};
