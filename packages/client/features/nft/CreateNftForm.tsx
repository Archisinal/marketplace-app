'use client';

import { Button, InputSearch, MultiSelect } from '@/components';
import { FieldNames } from '@/features/nft/constants';
import { CATEGORIES } from '@/features/collection/constants';
import { ChooseCollection, PriceAuctionToggle } from '@/features/nft/index';
import React, { ChangeEvent, RefObject, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { AnimatePresence } from 'framer-motion';
import CreateCollectionModal from '@/features/collection/CreateCollectionModal';
import TextField from '@/components/ui/TextField';

const CreateNftForm = ({ ownerCollections }: { ownerCollections: any }) => {
  const [selectedImageFile, setSelectedImageFile] = useState<
    null | Blob | string
  >(null);
  const [selectedProjectFile, setSelectedProjectFile] = useState<
    null | Blob | string
  >(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const projectInputRef = useRef<HTMLInputElement>(null);
  const [createCollectionModal, showCreateCollectionModal] = useState(false);

  const onImageChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target?.files) {
      return setSelectedImageFile(URL.createObjectURL(target.files[0]));
    }
    return null;
  };

  const onProjectChangeHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (target?.files) {
      return setSelectedProjectFile(URL.createObjectURL(target.files[0]));
    }
    return null;
  };

  const onUpload = (ref: RefObject<HTMLInputElement>) => () => {
    if (ref.current) {
      ref.current?.click();
    }
  };
  const formik = useFormik({
    initialValues: {
      projectName: '',
      description: '',
      revisionNumber: '',
      priceType: 'fixedPrice',
      price: undefined,
      royalties: 10,
      selectedCollectionId: '',
      nftImage: null,
      nftProject: null,
    },
    onSubmit: async (values) => {
      console.log(values);
      console.log('page-wallet');
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid-cols-2 md:grid md:gap-7">
          <div className="flex flex-col gap-7 md:sticky md:order-2 md:pt-14">
            <div className="flex flex-col gap-3 sm:h-56 md:h-2/6">
              <div className="flex h-full w-full items-center justify-center rounded-2xl border-2 border-dashed border-stroke-gray py-6 dark:border-dark-gray">
                <div className="flex flex-col gap-4 text-center">
                  <div className="flex justify-center text-lg text-txt-gray">
                    <p className="w-48 sm:w-72 sm:px-1">
                      PNG, GIF, WEBP, MP4 or MP3.
                      <br /> Max 100mb
                    </p>
                  </div>
                  <div>
                    <input
                      type="file"
                      className="hidden"
                      ref={imageInputRef}
                      onChange={onImageChangeHandler}
                    />
                    <Button
                      title="Upload image"
                      onClick={onUpload(imageInputRef)}
                      className="rounded-2xl bg-button-gray text-black dark:bg-dark-gray dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:h-56 md:h-2/6">
              <div className="flex h-full w-full items-center justify-center rounded-2xl border-2 border-dashed border-stroke-gray py-6 dark:border-dark-gray ">
                <div className="flex flex-col gap-4 text-center">
                  <div className="flex flex-col justify-center text-lg text-txt-gray">
                    <p className="w-48 sm:w-72 sm:px-1">
                      ZIP, RAR. <br /> Max 100mb
                    </p>
                  </div>
                  <div>
                    <input
                      type="file"
                      className="hidden"
                      ref={projectInputRef}
                      onChange={onProjectChangeHandler}
                    />
                    <Button
                      title="Upload project zip"
                      onClick={onUpload(projectInputRef)}
                      className="rounded-2xl bg-button-gray text-black dark:bg-dark-gray dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 pt-5 md:order-1 md:pt-0">
            <div className="hidden text-2xl font-semibold md:block">
              CREATE NEW NFT
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor={FieldNames.projectName} className="font-bold">
                Project name
              </label>
              <input
                className="rounded-2xl border border-stroke-gray px-4 py-2 outline-none focus:border-silver dark:border-dark-gray dark:bg-dark-gray dark:focus:border-vulcan "
                placeholder="e. g. “Architecture Home”"
                id={FieldNames.projectName}
                name={FieldNames.projectName}
                type="text"
                onChange={formik.handleChange}
                value={formik?.values?.projectName}
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
              <label htmlFor={FieldNames.categories} className="font-bold">
                Categories
              </label>
              <MultiSelect
                label="Tags"
                placeholder="Please select categories"
                options={CATEGORIES}
                onChange={(categories) => {
                  formik.setFieldValue(FieldNames.categories, categories);
                }}
              />
            </div>
            <PriceAuctionToggle
              initValue="fixedPrice"
              onClick={(priceType) =>
                formik.setFieldValue(FieldNames.priceType, priceType)
              }
            />
            <div className="flex flex-col gap-3">
              <p className="text-lg font-bold">Price</p>
              <TextField
                endowment="ASTR"
                placeholder="0,00"
                type="number"
                value={formik?.values?.price}
              />
            </div>
            <ChooseCollection
              collections={ownerCollections}
              onCollectionSelect={(collectionId: string) =>
                formik.setFieldValue(
                  FieldNames.selectedCollectionId,
                  collectionId,
                )
              }
              selectedCollectionId={formik?.values?.selectedCollectionId}
              onCreateCollection={showCreateCollectionModal}
            />
            <div className="flex flex-col gap-3">
              <p className="text-lg ">Royalty</p>
              <TextField
                endowment="%"
                type="number"
                value={formik?.values?.royalties}
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
      <AnimatePresence>
        {createCollectionModal && (
          <CreateCollectionModal
            onClose={() => showCreateCollectionModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateNftForm;
