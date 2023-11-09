import React, { FC } from 'react';
import { DropDownSelect, InputSearch, MultiButton } from '../components';
import Icon from '../icons';

type TTabNav = {
  onFilterClick: (cb: (v: boolean) => boolean) => void;
  isFilterOpen?: boolean;
};

const TabNav: FC<TTabNav> = ({ onFilterClick, isFilterOpen }) => {
  return (
    <>
      {/* Mobile */}
      <div className="flex items-center gap-2.5 py-3.5 sm:hidden ">
        <MultiButton
          title={<Icon name="filter" width={16} height={16} />}
          styles="md:w-24 p-3 rounded-xl bg-white-smoke mx-auto"
          onClick={() => onFilterClick((prev) => !prev)}
        />
        <InputSearch
          prefix={<Icon name="search" width="16" height="16" />}
          placeholder="Search by collections"
        />
        <MultiButton
          prefix={<Icon name="sort" width={16} height={16} />}
          title=""
          styles="p-3 rounded-xl bg-white-smoke"
        />
      </div>
      {/* Tablet */}
      <div className="flex hidden items-center gap-5 py-3.5 sm:flex md:hidden">
        <MultiButton
          title={<Icon name="filter" width={20} height={20} />}
          styles="md:w-24 p-3 rounded-xl bg-white-smoke mx-auto"
          onClick={() => onFilterClick((prev) => !prev)}
        />
        <InputSearch
          prefix={<Icon name="search" width="16" height="16" />}
          placeholder="Search by collections"
        />
        <DropDownSelect
          onSelect={() => {}}
          containerClass="bg-white-smoke dark:bg-dark-gray w-20 rounded-2xl flex justify-center px-0 font-semibold"
          inputClass="px-2 "
          listContainerClass="bg-white-smoke dark:bg-dark-gray"
          label=""
          options={[
            { label: '25h', value: '25h' },
            { label: '3h', value: '3h' },
          ]}
          initValue="25h"
          disableSearch={true}
        />
        <DropDownSelect
          onSelect={() => {}}
          containerClass="bg-white-smoke dark:bg-dark-gray w-37 rounded-2xl flex justify-center px-0 font-semibold"
          inputClass="px-2 "
          listContainerClass="bg-white-smoke dark:bg-dark-gray"
          label=""
          options={[
            { label: 'All categories', value: 'all' },
            { label: 'Catefory_1', value: 'category_1' },
          ]}
          initValue="All categories"
          disableSearch={true}
        />
      </div>
      {/* Desktop */}

      <div className="flex hidden items-center gap-5 py-3.5 md:flex">
        <MultiButton
          prefix={
            <Icon
              name={isFilterOpen ? 'nextLeft' : 'filter'}
              width="16"
              height="16"
            />
          }
          title={<span className="font-semibold">Filter</span>}
          styles="md:w-24 p-3 rounded-xl bg-white-smoke mx-auto"
          onClick={() => onFilterClick((prev) => !prev)}
        />
        <InputSearch
          prefix={<Icon name="search" width="16" height="16" />}
          placeholder="Search by collections"
        />
        <MultiButton
          suffix={<Icon name="chevronDown" />}
          title="Newests"
          styles="rounded-2xl py-2.5 px-3 sm:font-semibold bg-white-smoke"
        />
      </div>
    </>
  );
};

export default TabNav;
