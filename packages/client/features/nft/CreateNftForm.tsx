'use client';

import { Button, DropdownSelect } from '@/components';
import { FieldNames } from '@/features/nft/constants';
import { CATEGORIES } from '@/features/collection/constants';
import { ChooseCollection, PriceAuctionToggle } from '@/features/nft/index';
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { AnimatePresence } from 'framer-motion';
import CreateCollectionModal from '@/features/collection/CreateCollectionModal';
import TextField from '@/components/ui/TextField';
import TextArea from '@/components/ui/TextArea';
import * as Yup from 'yup';
import FileUpload, { MimeTypes } from '@/components/ui/FileUpload';
import { Dayjs } from 'dayjs';
import toast from 'react-hot-toast';
import { uploadIpfs } from '@/utils/ipfs';
import { mintNft } from '@/services/tx';
import { WalletContext } from '@/features/wallet-connect/context';
import { useRouter } from 'next/navigation';
import { Collection } from '@archisinal/backend';
import { formatPercentage } from '@/utils/formaters';

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required('Project name is required.'),
  description: Yup.string().required('Description is required.'),
  // price: Yup.number().when('listingType', {
  //   is: (value: string) => value === 'fixedPrice',
  //   then: () => Yup.number().required('Price is required.'),
  // }),
  projectImage: Yup.string().required('Image is required.'),
  projectArchive: Yup.string().required('Project archive is required.'),
  selectedCollectionId: Yup.string().required('Collection is required.'),
  // nftRoyalty: Yup.number()
  //   .min(0, 'Royalty cannot be negative.')
  //   .max(100, 'Royalty cannot be greater than 100%.')
  //   .required('Royalty is required.'),
  categories: Yup.array().required('Categories is required.'),
  listingType: Yup.string().required('Listing type is required.'),
  // startPrice: Yup.number().when('listingType', {
  //   is: (value: string) => value === 'auction',
  //   then: () => Yup.number().required('Start price is required.'),
  // }),
  // minimumBid: Yup.number().when('listingType', {
  //   is: (value: string) => value === 'auction',
  //   then: () => Yup.number().required('Minimum bid is required.'),
  // }),
  // endDate: Yup.array().when('listingType', {
  //   is: (value: string) => value === 'auction',
  //   then: () => Yup.array().required('End date is required.'),
  // }),
});

interface CreateNftFormikValues {
  projectName?: string;
  description?: string;
  revisionNumber?: string;
  listingType?: 'fixedPrice' | 'auction';
  price?: number;
  // nftRoyalty?: number;
  selectedCollectionId?: string;
  projectImage?: File;
  projectArchive?: File;
  categories?: { value: string; label: string }[];
  startPrice?: number;
  minimumBid?: number;
  endDate?: { value: Dayjs; label: string }[];
}

const CreateNftForm = ({
  ownerCollections,
}: {
  ownerCollections: Collection[];
}) => {
  const router = useRouter();
  const walletContext = useContext(WalletContext);
  const [createCollectionModal, showCreateCollectionModal] = useState(false);

  const formik = useFormik<CreateNftFormikValues>({
    initialValues: {
      projectName: undefined,
      description: undefined,
      revisionNumber: undefined,
      listingType: 'fixedPrice',
      price: undefined,
      // nftRoyalty: undefined,
      selectedCollectionId: undefined,
      projectImage: undefined,
      projectArchive: undefined,
      categories: undefined,
      startPrice: undefined,
      minimumBid: undefined,
      endDate: undefined,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { wallet } = walletContext;
      if (walletContext?.selectedAccount?.[0]?.address === undefined) {
        toast.error('Please connect wallet to execute this transaction.');
        return;
      }

      try {
        toast.loading('Uploading project image to IPFS');
        const projectImageCid = await uploadIpfs(values.projectImage!);

        toast.loading('Uploading project archive to IPFS');
        const projectArchiveCid = await uploadIpfs(values.projectArchive!);

        const walletAddress = walletContext?.selectedAccount?.[0]?.address;

        await mintNft({
          signerAddress: walletAddress,
          signer: wallet?.signer!,
          collectionAddress: values.selectedCollectionId!,
          mintTo: walletAddress,
          categories: values.categories!.map((c) => c.value),
          name: values.projectName!,
          description: values.description!,
          image: projectImageCid.IpfsHash,
          externalUrl: projectArchiveCid.IpfsHash,
        });

        router.push('/user/sales/owned');
        toast.success(
          `NFT project "${values.projectName}" is successfully created!`,
        );
      } catch (error: any) {
        toast.error(error?.error ? error?.error?.message : error?.message);
      } finally {
        setSubmitting(false);
      }
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

            <div className="flex flex-col gap-3">
              <label className="font-bold">Listing type</label>
              <PriceAuctionToggle
                initValue="fixedPrice"
                onClick={(listingType) => {
                  formik.setFieldValue('listingType', listingType);
                }}
              />
            </div>

            {/*{formik?.values?.listingType === 'fixedPrice' ? (*/}
            {/*  <div className="flex flex-col gap-3">*/}
            {/*    <p className="font-bold">Price</p>*/}
            {/*    <TextField*/}
            {/*      endowment="ASTR"*/}
            {/*      placeholder="Price for instant purchase"*/}
            {/*      type="number"*/}
            {/*      id={FieldNames.price}*/}
            {/*      name={FieldNames.price}*/}
            {/*      value={formik?.values?.price}*/}
            {/*      onChange={formik.handleChange}*/}
            {/*      errorMessage={formik?.touched?.price && formik?.errors?.price}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*) : (*/}
            {/*  <>*/}
            {/*    <div className="flex flex-col gap-3">*/}
            {/*      <p className="font-bold">Start price</p>*/}
            {/*      <TextField*/}
            {/*        endowment="ASTR"*/}
            {/*        placeholder="Start price for auction"*/}
            {/*        type="number"*/}
            {/*        id={FieldNames.startPrice}*/}
            {/*        name={FieldNames.startPrice}*/}
            {/*        value={formik?.values?.startPrice}*/}
            {/*        onChange={formik.handleChange}*/}
            {/*        errorMessage={*/}
            {/*          formik?.touched?.startPrice && formik?.errors?.startPrice*/}
            {/*        }*/}
            {/*      />*/}
            {/*    </div>*/}

            {/*    <div className="flex flex-col gap-3">*/}
            {/*      <p className="font-bold">Minimum bid</p>*/}
            {/*      <TextField*/}
            {/*        endowment="ASTR"*/}
            {/*        placeholder="Minimum bid for auction"*/}
            {/*        type="number"*/}
            {/*        id={FieldNames.minimumBid}*/}
            {/*        name={FieldNames.minimumBid}*/}
            {/*        value={formik?.values?.minimumBid}*/}
            {/*        onChange={formik.handleChange}*/}
            {/*        errorMessage={*/}
            {/*          formik?.touched?.minimumBid && formik?.errors?.minimumBid*/}
            {/*        }*/}
            {/*      />*/}
            {/*    </div>*/}

            {/*    <div className="flex flex-col gap-3">*/}
            {/*      <label htmlFor={FieldNames.endDate} className="font-bold">*/}
            {/*        Auction ends in*/}
            {/*      </label>*/}
            {/*      <DropdownSelect*/}
            {/*        label="End date"*/}
            {/*        placeholder="Auction end date"*/}
            {/*        options={[*/}
            {/*          { label: '1 day', value: dayjs().add(1, 'day') },*/}
            {/*          { label: '7 days', value: dayjs().add(7, 'day') },*/}
            {/*          {*/}
            {/*            label: '1 month',*/}
            {/*            value: dayjs().add(1, 'month'),*/}
            {/*          },*/}
            {/*          {*/}
            {/*            label: '3 months',*/}
            {/*            value: dayjs().add(3, 'month'),*/}
            {/*          },*/}
            {/*        ]}*/}
            {/*        endowment={*/}
            {/*          formik?.values?.endDate?.length &&*/}
            {/*          formik?.values?.endDate[0]?.value.format(*/}
            {/*            'DD MMM YYYY HH:mm',*/}
            {/*          )*/}
            {/*        }*/}
            {/*        errorMessage={*/}
            {/*          formik?.touched?.endDate && formik?.errors?.endDate*/}
            {/*        }*/}
            {/*        value={formik?.values?.endDate}*/}
            {/*        onChange={(endDate) => {*/}
            {/*          formik.setFieldValue(FieldNames.endDate, endDate);*/}
            {/*        }}*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*  </>*/}
            {/*)}*/}
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
              errorMessage={
                formik?.touched?.selectedCollectionId &&
                formik?.errors?.selectedCollectionId
              }
            />

            {formik?.values?.selectedCollectionId && (
              <div className="flex flex-col gap-3">
                <p className="font-bold">Royalty</p>
                <TextField
                  disabled
                  placeholder="Royalty in %"
                  id={FieldNames.nftRoyalty}
                  name={FieldNames.nftRoyalty}
                  endowment="%"
                  type="number"
                  value={formatPercentage(
                    ownerCollections.find(
                      (collection) =>
                        collection.address ===
                        formik?.values?.selectedCollectionId,
                    )?.royalty,
                  )}
                />
              </div>
            )}

            <Button
              title="Create"
              color="black"
              className="mt-4 rounded-2xl"
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
