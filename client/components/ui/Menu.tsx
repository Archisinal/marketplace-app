"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Icon } from "@/components";
import { useOutsideClick } from "@/features/hooks/useOutsudeClick";

const defaultOptions = [
  { label: "Explore", path: "/explore" },
  { label: "Create", path: "/explore/nft/createNft" },
  { label: "Sell", path: "/" },
  { label: "About us", path: "/" },
];

const Menu = ({ options = defaultOptions }) => {
  const [isShown, showMenu] = useState(false);
  const ref = useRef(null);

  const onMenuClick = () => showMenu(!isShown);

  useOutsideClick(ref, () => showMenu(false));

  return (
    <div className="relative self-center p-5px cursor-pointer" ref={ref}>
      <span onClick={onMenuClick}>
        <Icon name="menu" />
      </span>
      {isShown && (
        <ul className="absolute flex flex-col gap-2.5 right-0 top-9 rounded-xl bg-white border dark:border-none dark:bg-dark-gray py-4">
          {options.map(({ label, path }, i) => (
            <Link
              key={i}
              href={path}
              className="whitespace-nowrap hover:text-raven dark:hover:text-white cursor-pointer px-4 font-semibold dark:text-txt-gray"
              onClick={() => showMenu(false)}
            >
              {label}
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Menu;
