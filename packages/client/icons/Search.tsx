import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const Search: FC<TIconProps> = ({ width = '30', height = '30', ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.75 6.125C9.53883 6.125 6.125 9.53883 6.125 13.75C6.125 17.9612 9.53883 21.375 13.75 21.375C17.9612 21.375 21.375 17.9612 21.375 13.75C21.375 9.53883 17.9612 6.125 13.75 6.125ZM3.875 13.75C3.875 8.29619 8.29619 3.875 13.75 3.875C19.2038 3.875 23.625 8.29619 23.625 13.75C23.625 16.0716 22.8239 18.206 21.483 19.892L25.7955 24.2045C26.2348 24.6438 26.2348 25.3562 25.7955 25.7955C25.3562 26.2348 24.6438 26.2348 24.2045 25.7955L19.892 21.483C18.206 22.8239 16.0716 23.625 13.75 23.625C8.29619 23.625 3.875 19.2038 3.875 13.75Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Search;
