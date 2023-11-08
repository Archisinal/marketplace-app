import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const Eye: FC<TIconProps> = ({ width = '16', height = '17', className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.0001 4.58325C5.95039 4.58325 4.15005 6.00405 2.98102 8.20151C2.92109 8.31417 2.8939 8.36617 2.87577 8.40704C2.86452 8.4324 2.86213 8.44173 2.86043 8.45022C2.86027 8.45151 2.85983 8.45498 2.85937 8.46074C2.85851 8.47126 2.85791 8.48481 2.85791 8.49992C2.85791 8.51503 2.85851 8.52858 2.85937 8.53909C2.85983 8.54486 2.86027 8.54833 2.86043 8.54961C2.86213 8.5581 2.86452 8.56744 2.87577 8.5928C2.8939 8.63366 2.92109 8.68566 2.98102 8.79833C4.15005 10.9958 5.95039 12.4166 8.0001 12.4166C10.0498 12.4166 11.8501 10.9958 13.0192 8.79833C13.0791 8.68566 13.1063 8.63366 13.1244 8.5928C13.1357 8.56743 13.1381 8.5581 13.1398 8.54961C13.1399 8.54833 13.1404 8.54486 13.1408 8.53909C13.1417 8.52858 13.1423 8.51503 13.1423 8.49992C13.1423 8.48481 13.1417 8.47126 13.1408 8.46074C13.1404 8.45498 13.1399 8.45151 13.1398 8.45022C13.1381 8.44173 13.1357 8.4324 13.1244 8.40704C13.1063 8.36617 13.0791 8.31417 13.0192 8.20151C11.8501 6.00405 10.0498 4.58325 8.0001 4.58325ZM1.65675 7.49702C2.97191 5.02486 5.18875 3.08325 8.0001 3.08325C10.8114 3.08325 13.0283 5.02486 14.3434 7.49702C14.3496 7.50867 14.3559 7.52039 14.3622 7.53219C14.4575 7.71057 14.5627 7.90751 14.613 8.16826C14.652 8.37035 14.652 8.62949 14.613 8.83158C14.5627 9.09232 14.4575 9.28927 14.3622 9.46765C14.3559 9.47945 14.3496 9.49117 14.3434 9.50282C13.0283 11.975 10.8114 13.9166 8.0001 13.9166C5.18875 13.9166 2.97191 11.975 1.65676 9.50282C1.65056 9.49117 1.6443 9.47945 1.63799 9.46765C1.5427 9.28927 1.43749 9.09232 1.38717 8.83158C1.34816 8.62949 1.34816 8.37035 1.38717 8.16826C1.43749 7.90751 1.5427 7.71057 1.63799 7.53219C1.6443 7.52039 1.65056 7.50867 1.65675 7.49702ZM8.0001 7.24992C7.30974 7.24992 6.7501 7.80956 6.7501 8.49992C6.7501 9.19027 7.30974 9.74992 8.0001 9.74992C8.69045 9.74992 9.2501 9.19027 9.2501 8.49992C9.2501 7.80956 8.69045 7.24992 8.0001 7.24992ZM5.2501 8.49992C5.2501 6.98114 6.48131 5.74992 8.0001 5.74992C9.51888 5.74992 10.7501 6.98114 10.7501 8.49992C10.7501 10.0187 9.51888 11.2499 8.0001 11.2499C6.48131 11.2499 5.2501 10.0187 5.2501 8.49992Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Eye;
