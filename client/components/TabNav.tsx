import React, { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { RESOLUTION_QUERY } from '../utils/resolutionScreens';

import { DropDownSelect, InputSearch, MultiButton } from '../components';
import Icon from '../icons';

type TTabNav = {
  onFilterClick: (cb: (v: boolean) => boolean) => void;
  isFilterOpen?: boolean;
};

const ICON_SIZE = {
  small: '16',
  medium: '20',
};

const TabNav: FC<TTabNav> = ({ onFilterClick, isFilterOpen }) => {
  const isTablet = useMediaQuery(RESOLUTION_QUERY.TABLET);
  const isDesktop = useMediaQuery(RESOLUTION_QUERY.DESKTOP);

  const iconSize = isTablet ? ICON_SIZE.medium : ICON_SIZE.small;
  return (
    <div className="flex items-center gap-2.5 py-3.5 sm:gap-5">
      <MultiButton
        prefix={
          isDesktop ? (
            <Icon
              name={isFilterOpen ? 'nextLeft' : 'filter'}
              width="16"
              height="16"
            />
          ) : null
        }
        title={
          isDesktop ? (
            <span className="font-semibold">Filter</span>
          ) : (
            <Icon name="filter" width={iconSize} height={iconSize} />
          )
        }
        styles="md:w-24 p-3 rounded-xl bg-white-smoke mx-auto"
        onClick={() => onFilterClick((prev) => !prev)}
      />
      <InputSearch
        prefix={<Icon name="search" width="16" height="16" />}
        placeholder="Search by collections"
      />
      {!isTablet && (
        <MultiButton
          prefix={<Icon name="sort" width={iconSize} height={iconSize} />}
          title=""
          styles="p-3 rounded-xl bg-white-smoke"
        />
      )}
      {isTablet && !isDesktop && (
        <>
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
        </>
      )}
      {isDesktop && (
        <MultiButton
          suffix={<Icon name="chevronDown" />}
          title="Newests"
          styles="rounded-2xl p-2.5 sm:font-semibold bg-white-smoke"
        />
      )}
    </div>
  );
};

export default TabNav;
