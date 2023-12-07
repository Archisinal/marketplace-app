import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const User: FC<TIconProps> = ({ width = '30', height = '38' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 30 38"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.1038 0.0178682C13.0771 0.163456 12.7019 0.241975 12.1001 0.43738C9.7843 1.18919 7.842 2.88047 6.78199 5.06822C6.05118 6.57667 5.79186 7.83052 5.85358 9.55764C5.92775 11.634 6.55831 13.3487 7.85213 14.9923C10.597 18.4793 15.6338 19.4102 19.3794 17.123C21.6412 15.7418 23.1808 13.5095 23.6935 10.8679C23.8557 10.0326 23.8203 8.05433 23.6281 7.20348C22.8168 3.61324 20.0229 0.838527 16.5403 0.164348C15.9354 0.0472385 14.5037 -0.0387905 14.1038 0.0178682ZM9.44061 20.726C6.94331 20.7954 5.15541 20.9135 4.50904 21.052C2.50437 21.4813 0.84019 23.0901 0.299039 25.1219C-0.117153 26.6845 -0.094201 30.9945 0.338458 32.518C0.892287 34.4685 2.31041 36.1083 4.09161 36.8578C5.62683 37.5038 10.4631 38.0013 15.1968 38C18.3468 37.9991 21.4323 37.7752 23.9396 37.3656C25.9152 37.0428 26.9685 36.508 28.1356 35.2349C28.9642 34.3312 29.5373 33.2243 29.7606 32.0963C30.0251 30.7605 30.0808 27.8719 29.8755 26.1339C29.7009 24.6554 29.2109 23.5994 28.2426 22.6152C27.6972 22.0607 27.4639 21.884 26.8912 21.5914C25.9973 21.1346 25.3649 20.9793 23.9767 20.8753C21.1137 20.6609 14.3035 20.5909 9.44061 20.726Z"
        fill="#A8A8A8"
      />
    </svg>
  );
};

export default User;
