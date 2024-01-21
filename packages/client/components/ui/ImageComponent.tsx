import React, { useState } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type TImageComponent = {
  width?: number;
  height?: number;
  src: string;
  alt?: string;
  style?: object;
  className?: string;
  fill?: boolean;
};

export default function ImageComponent({
  width,
  height,
  src = '',
  alt = '',
  className = '',
  fill = false,
}: TImageComponent): React.ReactNode {
  const [loading, setLoading] = useState(true);

  const onImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div
          className={twMerge('animate-pulse bg-gray-600', className)}
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        ></div>
      )}
      <Image
        onLoad={onImageLoad}
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={twMerge('object-cover', className)}
        fill={fill}
        style={{ opacity: loading ? 0 : 100 }}
      />
    </>
  );
}
