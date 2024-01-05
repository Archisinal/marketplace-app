'use client';

import { Button, DropdownSelect } from '@/components';
import { FieldNames } from '@/features/nft/constants';
import { CATEGORIES } from '@/features/collection/constants';
import { ChooseCollection, PriceAuctionToggle } from '@/features/nft/index';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { AnimatePresence } from 'framer-motion';
import CreateCollectionModal from '@/features/collection/CreateCollectionModal';
import TextField from '@/components/ui/TextField';
import TextArea from '@/components/ui/TextArea';
import * as Yup from 'yup';
import FileUpload, { MimeTypes } from '@/components/ui/FileUpload';
import dayjs, { Dayjs } from 'dayjs';

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required('Project name is required.'),
  description: Yup.string().required('Description is required.'),
  price: Yup.number().required('Price is required.'),
  projectImage: Yup.string().required('Image is required.'),
  projectArchive: Yup.string().required('Project archive is required.'),
  selectedCollectionId: Yup.string().required('Collection is required.'),
  royalty: Yup.number().required('Royalty is required.'),
  categories: Yup.array().required('Categories is required.'),
  listingType: Yup.string().required('Listing type is required.'),
  minimumBid: Yup.number()
    .nullable()
    .notRequired()
    .when('listingType', {
      is: (value: string) => value === 'auction',
      then: () => Yup.number().required('Minimum bid is required.'),
      otherwise: () => Yup.number(), // No validation required when listingType is not auction
    }),
});

interface CreateNftFormikValues {
  projectName?: string;
  description?: string;
  revisionNumber?: string;
  listingType?: 'fixedPrice' | 'auction';
  price?: number;
  royalty?: number;
  selectedCollectionId?: string;
  projectImage?: File;
  projectArchive?: File;
  categories?: { value: string; label: string }[];
  minimumBid?: number;
  endDate?: { value: Dayjs; label: string }[];
}

const CreateNftForm = ({ ownerCollections }: { ownerCollections: any }) => {
  const [createCollectionModal, showCreateCollectionModal] = useState(false);

  const formik = useFormik<CreateNftFormikValues>({
    initialValues: {
      projectName: undefined,
      description: undefined,
      revisionNumber: undefined,
      listingType: 'fixedPrice',
      price: undefined,
      royalty: 10,
      selectedCollectionId: undefined,
      projectImage: undefined,
      projectArchive: undefined,
      categories: undefined,
      minimumBid: 0.1,
      endDate: undefined,
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
            <FileUpload
              onChange={(file) => formik.setFieldValue('projectImage', file)}
              errorMessage={
                formik?.touched?.projectImage && formik?.errors?.projectImage
              }
            />
            <FileUpload
              title="Upload project archive"
              types={[MimeTypes.ZIP, MimeTypes.GZIP]}
              maxFileSize={100}
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
              <DropdownSelect
                multiple
                label="Tags"
                placeholder="Assign categories for your project"
                options={CATEGORIES}
                errorMessage={
                  formik?.touched?.categories && formik?.errors?.categories
                }
                value={formik?.values?.categories}
                onChange={(categories) => {
                  formik.setFieldValue(FieldNames.categories, categories);
                }}
              />
            </div>
            <PriceAuctionToggle
              initValue="fixedPrice"
              onClick={(listingType) => {
                formik.setFieldValue('listingType', listingType);
              }}
            />
            <div className="flex flex-col gap-3">
              <p className="font-bold">Price</p>
              <TextField
                endowment="ASTR"
                placeholder="Price for instant purchase"
                type="number"
                id={FieldNames.price}
                name={FieldNames.price}
                value={formik?.values?.price}
                onChange={formik.handleChange}
                errorMessage={formik?.touched?.price && formik?.errors?.price}
              />
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-bold">Minimum bid</p>
              <TextField
                endowment="ASTR"
                placeholder="Minimum bid for auction"
                type="number"
                id={FieldNames.minimumBid}
                name={FieldNames.minimumBid}
                value={formik?.values?.minimumBid}
                onChange={formik.handleChange}
                errorMessage={
                  formik?.touched?.minimumBid && formik?.errors?.minimumBid
                }
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor={FieldNames.endDate} className="font-bold">
                End auction in
              </label>
              <DropdownSelect
                label="End date"
                placeholder="Auction end date"
                options={[
                  { label: '1 day', value: dayjs().add(1, 'day') },
                  { label: '7 days', value: dayjs().add(7, 'day') },
                  {
                    label: '1 month',
                    value: dayjs().add(1, 'month'),
                  },
                  {
                    label: '3 months',
                    value: dayjs().add(3, 'month'),
                  },
                ]}
                endowment={
                  formik?.values?.endDate?.length &&
                  formik?.values?.endDate[0]?.value.format('DD MMM YYYY HH:mm')
                }
                errorMessage={
                  formik?.touched?.endDate && formik?.errors?.endDate
                }
                value={formik?.values?.endDate}
                onChange={(endDate) => {
                  formik.setFieldValue(FieldNames.endDate, endDate);
                }}
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
                placeholder="Royalty in %"
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
