import React from 'react';

type TProperties = { data: { [key: string]: any } };

const Properties = ({ data }: TProperties) => {
  return (
    <ul className="text-lg md:w-2/4">
      {Object.keys(data).map((item, i) => {
        return (
          <li
            key={i}
            className="grid grid-cols-2 border-b border-stroke-gray py-3.5 dark:border-dark-gray"
          >
            <div className=" text-txt-gray">{item}</div>
            <div className="pl-4">{data[item]}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default Properties;
