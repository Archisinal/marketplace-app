import Image from 'next/image';
import { Button } from '@/components';
import React, { ChangeEvent, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const ImageUpload = ({
  onChange,
  errorMessage,
}: {
  onChange: (file: File) => void;
  errorMessage?: string | boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imgPreview, setImgPreview] = useState<Blob | null | string>(null);
  const onUpload = () => {
    if (inputRef) {
      inputRef.current?.click();
    }
  };

  const onImageChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const file = target.files[0];
      setImgPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const errorClasses = 'border-danger dark:border-danger-light';
  const normalClasses = 'border-stroke-gray dark:border-dark-gray';

  return (
    <>
      <div
        className={twMerge(
          'relative flex items-center justify-center rounded-2xl border-2 border-dashed py-6 sm:h-56  md:h-5/6 ',
          errorMessage ? errorClasses : normalClasses,
        )}
      >
        {imgPreview && (
          <>
            <Image
              src={imgPreview as string}
              fill={true}
              alt="uploaded image"
              objectFit="cover"
              className="rounded-2xl"
              onClick={onUpload}
            />
            <input
              type="file"
              className="hidden"
              ref={inputRef}
              onChange={onImageChange}
            />
          </>
        )}

        {!imgPreview && (
          <div className="flex flex-col gap-4 text-center">
            <div className="flex justify-center text-lg text-txt-gray">
              <p className="w-48 sm:w-72 sm:px-1">
                PNG, GIF, WEBP, MP4 or MP3. Max 100mb
              </p>
            </div>
            <div>
              <input
                type="file"
                className="hidden"
                ref={inputRef}
                required
                onChange={onImageChange}
              />
              <Button
                title="Upload image"
                onClick={onUpload}
                className="rounded-2xl bg-button-gray text-black dark:bg-dark-gray dark:text-white"
              />
            </div>
          </div>
        )}
      </div>
      {errorMessage && <p className="text-danger-light mt-1">{errorMessage}</p>}
    </>
  );
};

export default ImageUpload;
