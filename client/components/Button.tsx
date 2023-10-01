import React, { FC } from "react";

type TButton = {
  title: string;
  color?: "black" | "white" | "transparent" | "transparent-white";
  onClick?: () => void;
  styles?: string;
};

export const Button: FC<TButton> = ({
  title,
  onClick = () => {},
  color = "black",
  styles,
}) => {
  const classes: { [key: string]: string } = {
    black: "dark:bg-white dark:text-black bg-black text-white",
    white: "dark:bg-black dark:text-white bg-white text-black",
    transparent:
      "dark:text-white bg-transparent text-black border border-stroke-gray",
    "transparent-white":
      "dark:bg-white dark:text-black bg-transparent text-black border border-stroke-gray",
  };

  return (
    <div
      className={`${classes[color]} justify-center sm:text-xl inline-flex py-3.5 px-7 font-bold ${styles} `}
    >
      {title}
    </div>
  );
};
