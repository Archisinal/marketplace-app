'use client';
import React, { ChangeEvent, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, DropDownSelect, InputSearch, Toggle } from '@/components';
import {
  ChooseCollection,
  ConstructionType,
  PriceAuctionToggle,
} from '@/features/nft';
import { FieldNames } from '@/features/nft/constants';

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
      drawingName: '',
      description: '',
      revisionNumber: '',
      construction: 'issue',
      showContact: false,
      showPortfolio: true,
      priceType: 'fixedPrice',
      price: 0.1,
      royalties: 10,
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="p-3.5">
      <div className=" rounded-2xl border border-stroke-gray p-2.5 dark:border-dark-gray md:mx-auto md:max-w-4xl md:p-8">
        <div className="pb-6 pt-5 text-2xl font-semibold md:hidden">
          CREATE NEW NFT
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid-cols-2 md:grid md:gap-5">
            <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-stroke-gray py-6 dark:border-dark-gray sm:h-56 md:order-2  md:h-2/6 ">
              <div className="flex flex-col gap-4 text-center">
                <div className="flex justify-center text-lg text-txt-gray">
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
                CREATE NEW NFT
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor={FieldNames.drawingName} className="font-bold">
                  Draving name
                </label>
                <input
                  className="rounded-2xl border border-stroke-gray px-4 py-2 outline-none focus:border-silver dark:border-dark-gray dark:bg-dark-gray dark:focus:border-vulcan "
                  placeholder="e. g. “Architecture Home”"
                  id={FieldNames.drawingName}
                  name={FieldNames.drawingName}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik?.values?.drawingName}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor={FieldNames.description} className="font-bold">
                  Description
                </label>
                <input
                  className="rounded-2xl border border-stroke-gray px-4 py-2 outline-none focus:border-silver dark:border-dark-gray dark:bg-dark-gray dark:focus:border-vulcan"
                  placeholder="e. g. “A blueprint for a new minimalist ...”"
                  id={FieldNames.description}
                  name={FieldNames.description}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik?.values?.description}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor={FieldNames.revisionNumber}
                  className="font-bold"
                >
                  Revision number
                </label>
                <input
                  className="rounded-2xl border border-stroke-gray px-4 py-2 outline-none focus:border-silver dark:border-dark-gray dark:bg-dark-gray dark:focus:border-vulcan"
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
              <DropDownSelect
                label="Select a category"
                containerClass="font-bold"
                options={[
                  { label: 'Interior', value: 'interior' },
                  { label: 'Exterior', value: 'exterior' },
                ]}
                onSelect={(category) =>
                  formik.setFieldValue(FieldNames.category, category)
                }
              />
              <div>
                <div className="flex justify-between">
                  <p className="font-bold">Show contact info upon sale?</p>
                  <Toggle
                    initValue={formik.values.showContact}
                    onChange={(show) =>
                      formik.setFieldValue(FieldNames.showContact, show)
                    }
                  />
                </div>
                <p className="text-sm text-txt-gray">
                  Lorem Ipsum is simply dummy text
                </p>
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="font-bold">Show portfolio?</p>
                  <Toggle
                    initValue={formik.values.showPortfolio}
                    onChange={(show) =>
                      formik.setFieldValue(FieldNames.showPortfolio, show)
                    }
                  />
                </div>
                <p className="text-sm text-txt-gray">
                  Lorem Ipsum is simply dummy text
                </p>
              </div>
              <PriceAuctionToggle
                initValue="fixedPrice"
                onClick={(priceType) =>
                  formik.setFieldValue(FieldNames.priceType, priceType)
                }
              />
              <div className="flex flex-col gap-3">
                <p className="text-lg font-bold">Price</p>
                <InputSearch
                  suffix={<span className="text-lg text-txt-gray">ASTR</span>}
                  type="number"
                  initValue={formik?.values?.price}
                  className="px-4  text-lg text-txt-gray"
                  noCleaarIcon={true}
                />
              </div>
              {/* TODO: functionality need to be clarified */}
              <ChooseCollection />
              <div className="flex flex-col gap-3">
                <p className="text-lg ">Royalties</p>
                <InputSearch
                  suffix={<span className="text-lg  text-txt-gray">%</span>}
                  type="number"
                  initValue={formik?.values?.royalties}
                  className="px-4  text-lg text-txt-gray"
                  noCleaarIcon={true}
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
