import React from "react";
import { Icon } from "@/components";

const Logo = () => {
  return (
    <>
      <span className="sm:hidden">
        <Icon name="logo" width="35" height="35" />
      </span>
      <span className="hidden sm:block">
        <Icon name="logo" width="42" height="42" />
      </span>
    </>
  );
};

export default Logo;
