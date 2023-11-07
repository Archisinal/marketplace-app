"use client";
import React, { ChangeEvent, useState, useRef } from "react";
import { useFormik } from "formik";
import { Button } from "@/components";
import { FieldNames } from "@/features/nft/constants";

export default function CreateCollection() {
  const [selectedFile, setSelectedFile] = useState<null | Blob | string>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target?.files) {
      return setSelectedFile(URL.createObjectURL(target.files[0]));
    }
    return null;
  };

  const onUpload = () => {
    if (inputRef) {
      inputRef.current?.click();
    }
  };
  const formik = useFormik({
    initialValues: {
      displayName: "",
      symbol: "",
      description: "",
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="p-3.5">
      <div className=" rounded-2xl border border-stroke-gray dark:border-dark-gray p-2.5 md:max-w-4xl md:p-8 md:mx-auto">
        <div className="text-2xl font-semibold pt-5 pb-6 md:hidden">
          CREATE COLLECTIONS
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="md:grid grid-cols-2 md:gap-5">
            <div className="flex items-center justify-center rounded-2xl border-dashed border-2 border-stroke-gray dark:border-dark-gray py-6 sm:h-56 md:order-2  md:h-5/6 ">
              <div className="text-center flex flex-col gap-4">
                <div className="text-lg text-txt-gray flex justify-center">
                  <p className="w-48 sm:w-72 sm:px-1">
                    PNG, GIF, WEBP, MP4 or MP3. Max 100mb
                  </p>
                  {/* <p> or MP3. Max 100mb</p> */}
                </div>
                <div>
                  <input
                    type="file"
                    className="hidden"
                    ref={inputRef}
                    onChange={onChangeHandler}
                  />
                  <Button
                    title="Explore now"
                    onClick={onUpload}
                    className="rounded-2xl bg-button-gray text-black dark:bg-dark-gray dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 pt-5 md:order-1 md:pt-0">
              <div className=" hidden text-2xl font-semibold md:block">
                CREATE COLLECTIONS
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor={FieldNames.displayName} className="font-bold">
                  Display name
                </label>
                <input
                  className="p-2 rounded-2xl border border-stroke-gray dark:border-dark-gray focus:border-silver dark:focus:border-vulcan outline-none dark:bg-dark-gray"
                  placeholder="Enter collections name"
                  id={FieldNames.displayName}
                  name={FieldNames.displayName}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik?.values?.displayName}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor={FieldNames.symbol} className="font-bold">
                  Symbol
                </label>
                <input
                  className="p-2 rounded-2xl border border-stroke-gray dark:border-dark-gray focus:border-silver dark:focus:border-vulcan outline-none dark:bg-dark-gray"
                  placeholder="Enter symbol token"
                  id={FieldNames.symbol}
                  name={FieldNames.symbol}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik?.values?.symbol}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor={FieldNames.description} className="font-bold">
                  Description
                </label>
                <textarea
                  className="p-2 rounded-2xl border border-stroke-gray dark:border-dark-gray focus:border-silver dark:focus:border-vulcan outline-none dark:bg-dark-gray"
                  placeholder="A description of your collection that will be visible to all users"
                  id={FieldNames.description}
                  name={FieldNames.description}
                  onChange={formik.handleChange}
                  value={formik?.values?.description}
                />
              </div>
              <Button
                title="Create"
                color="black"
                className="rounded-2xl"
                onClick={formik.handleSubmit}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
