import React from "react";
import { useMediaQuery } from "react-responsive";
import Icon from "../icons";

const NavBar = () => {
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });

  const logoProps = isTablet ? { width: "42", height: "42" } : {};
  const searchAndBasket = isTablet ? { width: "30", height: "30" } : {};

  return (
    <div className="flex justify-between border-b border-light-silver pb-18px">
      <div className="flex items-center gap-2 text-18px font-semibold ">
        <Icon name="logo" {...logoProps} />
        <span>Archisinal</span>
      </div>
      <div className="flex gap-5">
        <span className="border border-stroke-gray rounded-lg p-1">
          <Icon name="search" {...searchAndBasket} />
        </span>
        <span className="border border-stroke-gray rounded-lg p-1">
          <Icon name="basket" {...searchAndBasket} />
        </span>
        <span className="self-center p-5px">
          <Icon name="menu" />
        </span>
      </div>
    </div>
  );
};

export default NavBar;
