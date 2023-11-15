'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components';
import { useOutsideClick } from '@/features/hooks/useOutsudeClick';

type TMenu = {
  options: {
    label: string;
    path: string;
    onClick?: () => void;
  }[];
};

const Menu = ({ options }: TMenu) => {
  const [isShown, showMenu] = useState(false);
  const ref = useRef(null);

  const onMenuClick = () => showMenu(!isShown);

  useOutsideClick(ref, () => showMenu(false));

  return (
    <div className="relative cursor-pointer self-center p-5px" ref={ref}>
      <span onClick={onMenuClick}>
        <Icon name="menu" />
      </span>
      {isShown && (
        <ul className="absolute right-0 top-9 flex flex-col gap-2.5 rounded-xl border bg-white py-4 dark:border-none dark:bg-dark-gray">
          {options.map(({ label, path, onClick }, i) => (
            <Link
              key={i}
              href={path}
              className="cursor-pointer whitespace-nowrap px-4 font-semibold hover:text-raven dark:text-txt-gray dark:hover:text-white"
              onClick={() => {
                onClick && onClick();
                showMenu(false);
              }}
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
