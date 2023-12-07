import React, { FC } from 'react';
import { useTheme } from 'next-themes';

import { Icon, ImageComponent, MultiButton } from '../../components';

type TUserListItem = {
  itemImg: string;
  owner: { name: string; followers: string | number };
};

const UserListItem: FC<TUserListItem> = ({
  itemImg,
  owner: { name, followers },
}) => {
  const { theme } = useTheme();

  return (
    <div className="flex cursor-pointer  flex-col">
      <div className="relative h-44 translate-y-2.5">
        <ImageComponent
          src={itemImg}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: '20px',
            objectFit: 'cover',
          }} //aligning images
        />
        <span className="relative bottom-14 left-5 flex h-16 w-16 items-center justify-center rounded-full bg-light-silver">
          <Icon name="user" />
        </span>
      </div>
      <div className="flex justify-between rounded-b-20 border pt-4 dark:!border-dark-gray">
        <div className="flex flex-col gap-2 self-center px-5">
          <p className="truncate text-xl font-extrabold sm:text-lg">{name}</p>
          <p className="truncate text-txt-gray">{`${followers} Followers`}</p>
        </div>
        <div className="mb-2 mt-2 flex gap-2 px-5 pb-4 text-sm sm:text-base">
          <MultiButton
            title="Follow"
            suffix={
              <Icon
                name="follow"
                color={theme === 'light' ? '#909090' : 'white'}
              />
            }
            styles="py-3 px-6 text-lg rounded-xl font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
