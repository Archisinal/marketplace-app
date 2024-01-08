import React from 'react';
import { twMerge } from 'tailwind-merge';

type TUserInfo = {
  data: { [key: string]: any };
};

const UserInfo = ({ data }: TUserInfo) => {
  const values = Object.keys(data);
  return (
    <ul className="rounded-2xl border border-stroke-gray px-4 dark:border-dark-gray">
      {values.map((val, i) => {
        return (
          <li
            key={i}
            className={twMerge(
              'flex items-center justify-between py-2.5',
              i === values.length - 2
                ? 'border-b border-stroke-gray dark:border-dark-gray'
                : 'border-none',
            )}
          >
            <span className="text-txt-gray dark:text-white">{val}</span>
            <span className="font-semibold text-black dark:text-txt-gray">
              {data[val]}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default UserInfo;
