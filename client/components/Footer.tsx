import React from "react";
import { useTheme } from "next-themes";
import { MultiButton } from "../components";
import Icon from "../icons";

export const Footer = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex flex-col items-center gap-2.5 sm:gap-6 mt-11 mx-4 sm:mx-0 border-t dark:border-dark-gray sm:flex-row justify-center pt-4">
        <p className="dark:text-dolphin sm:text-xs">©Archisinal, Inc.</p>
        <div className="flex gap-7 text-xs dark:text-dolphin">
          <span>Community guidelines</span>
          <span>Terms</span>
          <span>Privacy policy</span>
        </div>
        <MultiButton
          title={theme === "light" ? "Light" : "Dark"}
          prefix={<Icon name="sun" />}
          suffix={<Icon name="arrowDown" />}
          styles="p-1.5 rounded-lg"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
      </div>
      <div className="mt-6">FFFFF</div>
    </>
  );
};
