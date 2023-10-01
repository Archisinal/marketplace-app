import React from "react";
import Image from "next/image";

type TImageComponent = {
  width?: number;
  height?: number;
  src: string;
  alt?: string;
  style?: object;
};

export default function ({
  width = 320,
  height = 228,
  src = "",
  alt = "",
  style,
}: TImageComponent): React.ReactNode {
  return (
    <Image src={src} width={width} height={height} alt={alt} style={style} />
  );
}