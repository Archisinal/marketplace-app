import React, { FC } from 'react';
import { TIconProps } from './Icons.types';

const CircleAddFilled: FC<TIconProps> = ({ width = '39', height = '39' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 39 39"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.4996 3.4126C10.6147 3.4126 3.41211 10.6152 3.41211 19.5001C3.41211 28.385 10.6147 35.5876 19.4996 35.5876C28.3845 35.5876 35.5871 28.385 35.5871 19.5001C35.5871 10.6152 28.3845 3.4126 19.4996 3.4126ZM6.33711 19.5001C6.33711 12.2306 12.2302 6.3376 19.4996 6.3376C26.7691 6.3376 32.6621 12.2306 32.6621 19.5001C32.6621 26.7695 26.7691 32.6626 19.4996 32.6626C12.2302 32.6626 6.33711 26.7695 6.33711 19.5001Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.4996 6.3376C12.2302 6.3376 6.33711 12.2306 6.33711 19.5001C6.33711 26.7695 12.2302 32.6626 19.4996 32.6626C26.7691 32.6626 32.6621 26.7695 32.6621 19.5001C32.6621 12.2306 26.7691 6.3376 19.4996 6.3376ZM20.962 13.0001C20.962 12.1924 20.3072 11.5376 19.4995 11.5376C18.6918 11.5376 18.037 12.1924 18.037 13.0001V18.0376H12.9995C12.1918 18.0376 11.537 18.6924 11.537 19.5001C11.537 20.3079 12.1918 20.9626 12.9995 20.9626H18.037V26.0001C18.037 26.8079 18.6918 27.4626 19.4995 27.4626C20.3072 27.4626 20.962 26.8079 20.962 26.0001V20.9626H25.9995C26.8072 20.9626 27.462 20.3079 27.462 19.5001C27.462 18.6924 26.8072 18.0376 25.9995 18.0376H20.962V13.0001Z"
      fill="currentColor"
    />
  </svg>
);

export default CircleAddFilled;
