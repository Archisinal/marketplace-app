import { MouseEvent } from 'react'

export type TIconProps = {
    width?: string | number;
    height?: string | number;
    className?: string;
    background?: string;
    color?: string;
    iconTitle?: string;
    title?: string;
    hover?: boolean;
    active?: boolean;
    name?: string;
    onClick?: (e: MouseEvent<HTMLOrSVGElement>) => void;
    [key: string]: any;
  };
  
  export type TIconNames =
  | "sliderRight"
  | "sliderLeft"
  | "wallet"
  | "mountains"
  | "store"
  | "hummer"
  | "logo"
  | "search"
  | "basket"
  | "menu"
  | "arrowRight"
  | "arrowDown"
  | "arrowUp"
  | "sun"
  | "filter"
  | "sort"
  | "nextLeft"
  | "nextRight"
  | "arrowRight"
  | "close"
  | "chevronDown"
  | "chevronUp"
  | "follow"
  | "slash"
  | "user"
  | "globe"
  | "twitter"
  | "discord"
  | "facebook"
  | "sale";
