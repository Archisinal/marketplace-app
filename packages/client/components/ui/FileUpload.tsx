import Image from 'next/image';
import { Button } from '@/components';
import React, { ChangeEvent, ReactNode, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import toast from 'react-hot-toast';
import Icon from '@/icons';

const FILE_TYPE_NAMES = {
  'image/png': 'PNG',
  'image/jpeg': 'JPEG',
  'image/webp': 'WEBP',
  'application/zip': 'ZIP',
  'application/gzip': 'GZIP',
};

export enum MimeTypes {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  WEBP = 'image/webp',
  ZIP = 'application/zip',
  GZIP = 'application/gzip',
}

const FileUpload = ({
  types = [MimeTypes.PNG, MimeTypes.JPEG, MimeTypes.WEBP],
  title = 'Upload image',
  maxFileSize = 50,
  onChange,
  errorMessage,
}: {
  title?: string;
  types?: MimeTypes[];
  maxFileSize?: number;
  onChange: (file: File) => void;
  errorMessage?: string | boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const onUpload = () => {
    if (inputRef) {
      inputRef.current?.click();
    }
  };

  const onImageChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const file = target.files[0];

      if (file.size > maxFileSize * 1024 * 1024) {
        toast.error(`File size should be less than ${maxFileSize}MB`);
      } else {
        setFile(file);
        onChange(file);
      }
    }
  };

  const errorClasses = 'border-danger dark:border-danger-light';
  const normalClasses = 'border-stroke-gray dark:border-dark-gray';

  return (
    <>
      <div
        className={twMerge(
          'relative flex h-[200px] items-center justify-center rounded-2xl border-2 border-dashed py-6 sm:h-[250px] md:h-[400px] ',
          errorMessage ? errorClasses : normalClasses,
        )}
      >
        {file && (
          <div className="group absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
            {types.includes(MimeTypes.PNG) ||
            types.includes(MimeTypes.JPEG) ||
            types.includes(MimeTypes.WEBP) ? (
              <Image
                src={URL.createObjectURL(file) as string}
                fill={true}
                alt="uploaded image"
                objectFit="cover"
                className="cursor-pointer rounded-2xl transition group-hover:brightness-50"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Icon
                  name="archive"
                  width="120"
                  height="120"
                  className="cursor-pointer rounded-2xl fill-dark stroke-white transition group-hover:brightness-50"
                />
                <p className="mt-3 line-clamp-1 max-w-[300px] text-center text-txt-gray sm:line-clamp-2">
                  {file.name}
                </p>
              </div>
            )}
            <Button
              title="Change file"
              onClick={onUpload}
              className="absolute rounded-2xl bg-button-gray text-black opacity-0 group-hover:opacity-100 dark:bg-dark-gray dark:text-white"
            />
            <input
              type="file"
              className="hidden"
              ref={inputRef}
              onChange={onImageChange}
              accept={types.join(',')}
            />
          </div>
        )}

        {!file && (
          <div className="flex flex-col gap-4 text-center">
            <div className="flex justify-center text-lg text-txt-gray">
              <p className="w-48 sm:w-72 sm:px-1">
                {types
                  .map((type) => FILE_TYPE_NAMES[type])
                  .join(', ')
                  .replace(/,([^,]*)$/, ' or$1')}
                . <br /> Max {maxFileSize}MB
              </p>
            </div>
            <div>
              <input
                type="file"
                accept={types.join(',')}
                className="hidden"
                ref={inputRef}
                required
                onChange={onImageChange}
              />
              <Button
                title={title}
                onClick={onUpload}
                className="rounded-2xl bg-button-gray text-black dark:bg-dark-gray dark:text-white"
              />
            </div>
          </div>
        )}
      </div>
      {errorMessage && <p className="mt-1 text-danger-light">{errorMessage}</p>}
    </>
  );
};

export default FileUpload;
