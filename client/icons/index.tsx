import React, { FC } from "react";
import dynamic from "next/dynamic";

const LeftArrov = dynamic(() => import("../icons/LeftArrow"));
const RightArrov = dynamic(() => import("../icons/RightArrow"));
const Wallet = dynamic(() => import("../icons/Wallet"));
const Mountains = dynamic(() => import("../icons/Mountains"));
const Store = dynamic(() => import("../icons/Store"));
const Sale = dynamic(() => import("../icons/Sale"));
const Hummer = dynamic(() => import("../icons/Hummer"));
import { TIconNames } from "./Icons.types";

type Props = {
  name: TIconNames;
  [key: string]: any;
};

const Icon: FC<Props> = ({ name, ...rest }) => {
  switch (name) {
    case "leftArrow":
      return <LeftArrov {...rest} />;
    case "rightArrow":
      return <RightArrov {...rest} />;
    case "wallet":
      return <Wallet {...rest} />;
    case "mountains":
      return <Mountains {...rest} />;
    case "sale":
      <Sale {...rest} />;
    case "store":
      return <Store {...rest} />;
    case "hummer":
      return <Hummer {...rest} />;
  }
};

export default Icon;
