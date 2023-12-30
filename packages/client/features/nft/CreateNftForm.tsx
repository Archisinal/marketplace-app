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
import TextArea from '@/components/ui/TextArea';
import * as Yup from 'yup';
import ImageUpload from '@/components/ui/ImageUpload';
import ChevronDown from '@/icons/ChevronDown';

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required('Project name is required.'),
  description: Yup.string().required('Description is required.'),
  price: Yup.number().required('Price is required.'),
  projectImage: Yup.string().required('Image is required.'),
  projectArchive: Yup.string().required('Project archive is required.'),
  selectedCollectionId: Yup.string().required('Collection is required.'),
  royalty: Yup.number().required('Royalty is required.'),
  categories: Yup.array().required('Categories is required.'),
});

const CreateNftForm = ({ ownerCollections }: { ownerCollections: any }) => {
  const [createCollectionModal, showCreateCollectionModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      projectName: '',
      description: '',
      revisionNumber: '',
      priceType: 'fixedPrice',
      price: undefined,
      royalty: 10,
      selectedCollectionId: '',
      projectImage: null,
      projectArchive: null,
      categories: undefined,
    },
    validationSchema,
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
            <ImageUpload
              onChange={(file) => formik.setFieldValue('image', file)}
              errorMessage={
                formik?.touched?.projectImage && formik?.errors?.projectImage
              }
            />
            <ImageUpload
              onChange={(file) => formik.setFieldValue('projectArchive', file)}
              errorMessage={
                formik?.touched?.projectArchive &&
                formik?.errors?.projectArchive
              }
            />
          </div>
          <div className="flex flex-col gap-6 pt-5 md:order-1 md:pt-0">
            <div className="hidden text-2xl font-semibold md:block">
              CREATE NEW NFT
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor={FieldNames.projectName} className="font-bold">
                Project name
              </label>
              <TextField
                placeholder="e. g. “Architecture Home”"
                id={FieldNames.projectName}
                name={FieldNames.projectName}
                type="text"
                onChange={formik.handleChange}
                value={formik?.values?.projectName}
                errorMessage={
                  formik?.touched?.projectName && formik?.errors?.projectName
                }
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor={FieldNames.description} className="font-bold">
                Description
              </label>
              <TextArea
                placeholder="e. g. “A blueprint for a new minimalistic ...”"
                id={FieldNames.description}
                name={FieldNames.description}
                type="text"
                onChange={formik.handleChange}
                value={formik?.values?.description}
                errorMessage={
                  formik?.touched?.description && formik?.errors?.description
                }
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
                errorMessage={
                  formik?.touched?.categories && formik?.errors?.categories
                }
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
              <p className="font-bold">Price</p>
              <TextField
                endowment="ASTR"
                placeholder="0,00"
                type="number"
                value={formik?.values?.price}
                onChange={formik.handleChange}
                errorMessage={formik?.touched?.price && formik?.errors?.price}
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
              <p className="font-bold">Royalty</p>
              <TextField
                placeholder="0.00"
                id={FieldNames.nftRoyalty}
                name={FieldNames.nftRoyalty}
                endowment="%"
                type="number"
                onChange={formik.handleChange}
                value={formik?.values?.royalty}
                errorMessage={
                  formik?.touched?.royalty && formik?.errors?.royalty
                }
              />
            </div>
            <Button
              title="Create"
              color="black"
              className="rounded-2xl"
              onClick={formik.handleSubmit}
              loading={formik.isSubmitting}
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
