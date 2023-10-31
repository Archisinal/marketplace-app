"use client";
import React, { ChangeEvent, useState, useRef } from "react";
import { useFormik } from "formik";
import { Button, Icon } from "@/components";
import {
  ConstructionType,
  PriceAuctionToggle,
  ChooseCollection,
} from "@/features/nft";
import { FieldNames } from "@/features/nft/constants";
import { DropDownSelect, Toggle, InputSearch } from "@/components";

export default function CreateNftAuction() {
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
      showContact: false,
      showPortfolio: true,
      priceType: "fixedPrice",
      minimumBid: 0.1,
      instantPurchase: 0.1,
      royalties: 10,
      startingDate: "07.20.2023 2:06 PM",
      endDate: "07.20.2023 2:06 PM",
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="p-3.5">
      <div className=" rounded-2xl border border-stroke-gray dark:border-dark-gray p-2.5 md:max-w-4xl md:p-8 md:mx-auto">
        <div className="text-2xl font-semibold pt-5 pb-6 md:hidden">
          CREATE NEW NFT
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="md:grid grid-cols-2 md:gap-5">
            <div className="flex items-center justify-center rounded-2xl border-dashed border-2 border-stroke-gray dark:border-dark-gray py-6 sm:h-56 md:order-2  md:h-2/6 ">
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
                CREATE NEW NFT
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor={FieldNames.drawingName} className="font-bold">
                  Draving name
                </label>
                <input
                  className="p-2 rounded-2xl border border-stroke-gray dark:border-none outline-none dark:bg-dark-gray"
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
                  className="p-2 rounded-2xl border border-stroke-gray dark:border-none outline-none dark:bg-dark-gray"
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
                  className="p-2 rounded-2xl border border-stroke-gray dark:border-none outline-none dark:bg-dark-gray"
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
                  { label: "Interior", value: "interior" },
                  { label: "Exterior", value: "exterior" },
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
                <p className="font-bold">Minimum bid</p>
                <InputSearch
                  suffix={
                    <span className="text-lg font-semibold text-txt-gray">
                      ASTR
                    </span>
                  }
                  type="number"
                  initValue={formik?.values?.minimumBid}
                  className="text-lg font-semibold text-txt-gray px-2"
                  noCleaarIcon={true}
                />
              </div>
              <div className="flex flex-col gap-3">
                <p className="font-bold flex gap-1 items-center">
                  Instant purchase
                  <span>
                    <Icon name="circleInfo" />
                  </span>
                </p>
                <InputSearch
                  suffix={
                    <span className="text-lg font-semibold text-txt-gray">
                      ASTR
                    </span>
                  }
                  type="number"
                  initValue={formik?.values?.instantPurchase}
                  className="text-lg font-semibold text-txt-gray px-2"
                  noCleaarIcon={true}
                />
              </div>
              <DropDownSelect
                label="Starting Date"
                containerClass="font-bold"
                inputContainerClass="font-medium text-mortar dark:text-txt-gray"
                initValue={formik?.values?.startingDate}
                disableSearch={true}
                options={[
                  { label: "07.20.2023 2:06 PM", value: "07.20.2023 2:06 PM" },
                  {
                    label: "09.18.2023 12:08 PM",
                    value: "09.18.2023 12:08 PM",
                  },
                ]}
                onSelect={(startingDate) =>
                  formik.setFieldValue(FieldNames.startingDate, startingDate)
                }
              />

              <DropDownSelect
                label="End Date"
                containerClass="font-bold"
                inputContainerClass="font-medium text-mortar "
                inputClass="w-3/5"
                suffix={
                  <div className="flex gap-1 text-base items-center">
                    {/* //TODO:  Diff of start - end date */}
                    <span>{"4 days"}</span>
                    <Icon name="chevronDown" width="20" height="20" />
                  </div>
                }
                initValue={formik?.values?.endDate}
                disableSearch={true}
                options={[
                  { label: "07.20.2023 2:06 PM", value: "07.20.2023 2:06 PM" },
                  {
                    label: "09.18.2023 12:08 PM",
                    value: "09.18.2023 12:08 PM",
                  },
                ]}
                onSelect={(startingDate) =>
                  formik.setFieldValue(FieldNames.startingDate, startingDate)
                }
              />

              {/* TODO: functionality need to be clarified */}
              <ChooseCollection />
              <div className="flex flex-col gap-3">
                <p className="text-lg font-bold">Royalties</p>
                <InputSearch
                  suffix={
                    <span className="text-lg font-semibold text-txt-gray">
                      %
                    </span>
                  }
                  type="number"
                  initValue={formik?.values?.royalties}
                  className="text-lg font-semibold text-txt-gray px-2"
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
