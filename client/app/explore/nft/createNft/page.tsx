"use client";
import React, { ChangeEvent, useState, useRef } from "react";
import { useFormik } from "formik";
import { Button } from "@/components";
import { ConstructionType } from "@/features/nft";
import { FieldNames } from "@/features/nft/constants";

export default function CreateNft() {
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
      drawingName: "",
      description: "",
      revisionNumber: "",
      construction: "issue",
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="p-3.5">
      <div className=" rounded-2xl border border-stroke-gray dark:border-dark-gray p-2.5">
        <div className="text-2xl font-semibold">CREATE NEW NFT</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="rounded-2xl border-dashed border-2 border-stroke-gray py-6">
            <div className="text-center flex flex-col gap-4">
              <div className="text-lg text-txt-gray">
                <p>PNG, GIF, WEBP, MP4</p>
                <p> or MP3. Max 100mb</p>
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
                  className="rounded-2xl bg-button-gray text-black"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label htmlFor={FieldNames.drawingName}>Draving name</label>
              <input
                className="p-2 rounded-2xl border border-stroke-gray outline-none"
                placeholder="e. g. “Architecture Home”"
                id={FieldNames.drawingName}
                name={FieldNames.drawingName}
                type="text"
                onChange={formik.handleChange}
                value={formik?.values?.drawingName}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor={FieldNames.description}>Description</label>
              <input
                className="p-2 rounded-2xl border border-stroke-gray outline-none"
                placeholder="e. g. “A blueprint for a new minimalist ...”"
                id={FieldNames.description}
                name={FieldNames.description}
                type="text"
                onChange={formik.handleChange}
                value={formik?.values?.description}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor={FieldNames.revisionNumber}>Revision number</label>
              <input
                className="p-2 rounded-2xl border border-stroke-gray outline-none"
                placeholder="e. g. “1245738”"
                id={FieldNames.revisionNumber}
                name={FieldNames.revisionNumber}
                type="number"
                onChange={formik.handleChange}
                value={formik?.values?.revisionNumber}
              />
            </div>
            <ConstructionType
              value={formik?.values?.construction}
              clickHandler={(type: string) =>
                formik.setFieldValue(FieldNames.construction, type)
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
