import React, { FC } from "react";
import dynamic from "next/dynamic";

const SlideLeftArrow = dynamic(() => import("./SlideLeftArrow"));
const SlideRightArrow = dynamic(() => import("./SlideRightArrow"));
const Wallet = dynamic(() => import("../icons/Wallet"));
const Mountains = dynamic(() => import("../icons/Mountains"));
const Store = dynamic(() => import("../icons/Store"));
const Sale = dynamic(() => import("../icons/Sale"));
const Hummer = dynamic(() => import("../icons/Hummer"));
const Logo = dynamic(() => import("../icons/Logo"));
const Search = dynamic(() => import("../icons/Search"));
const Basket = dynamic(() => import("../icons/Basket"));
const Menu = dynamic(() => import("../icons/Menu"));
const ArrowRight = dynamic(() => import("../icons/ArrowRight"));
const Sun = dynamic(() => import("../icons/Sun"));
const ArrowDown = dynamic(() => import("../icons/ArrowDown"));
const Filter = dynamic(() => import("../icons/Filter"));
const Sort = dynamic(() => import("../icons/Sort"));
const NextLeft = dynamic(() => import("./NextLeft"));
const NextRight = dynamic(() => import("./NextRight"));
import { TIconNames } from "./Icons.types";

type Props = {
  name: TIconNames;
  [key: string]: any;
};

const Icon: FC<Props> = ({ name, ...rest }) => {
  switch (name) {
    case "slideLeftArrow":
      return <SlideLeftArrow {...rest} />;
    case "slideRightArrow":
      return <SlideRightArrow {...rest} />;
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
    case "logo":
      return <Logo {...rest} />;
    case "search":
      return <Search {...rest} />;
    case "basket":
      return <Basket {...rest} />;
    case "menu":
      return <Menu {...rest} />;
    case "arrowRight":
      return <ArrowRight {...rest} />;
    case "sun":
      return <Sun {...rest} />;
    case "arrowDown":
      return <ArrowDown {...rest} />;
    case "filter":
      return <Filter {...rest} />;
    case "sort":
      return <Sort {...rest} />;
    case "nextLeft":
      return <NextLeft {...rest} />;
    case "nextRight":
      return <NextRight {...rest} />;
  }
};

export default Icon;
