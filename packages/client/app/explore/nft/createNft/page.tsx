'use client';
import React, {
  ChangeEvent,
  RefObject,
  useContext,
  useRef,
  useState,
} from 'react';
import { useFormik } from 'formik';
import {
  Button,
  DropDownSelect,
  InputSearch,
  MultiSelect,
  Toggle,
} from '@/components';
import {
  ChooseCollection,
  ConstructionType,
  PriceAuctionToggle,
} from '@/features/nft';
import { FieldNames } from '@/features/nft/constants';
import CreateCollectionModal from '@/features/collection/CreateCollectionModal';
import { WalletContext } from '@/features/wallet-connect/context';
import { CATEGORIES } from '@/features/collection/constants';
import { AnimatePresence } from 'framer-motion';

export default function CreateNft() {
  const [selectedImageFile, setSelectedImageFile] = useState<
    null | Blob | string
  >(null);
  const [selectedProjectFile, setSelectedProjectFile] = useState<
    null | Blob | string
  >(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const projectInputRef = useRef<HTMLInputElement>(null);
  const [createCollectionModal, showCreateCollectionModal] = useState(false);

  const walletContext = useContext(WalletContext);
  const publicAddress =
    walletContext?.selectedAccount?.[0]?.address ||
    walletContext?.accounts[0]?.address;

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
      drawingName: '',
      description: '',
      revisionNumber: '',
      construction: 'issue',
      showContact: false,
      showPortfolio: true,
      priceType: 'fixedPrice',
      price: 0.1,
      royalties: 10,
      selectedCollectionId: '',
      nftImage: null,
      nftProject: null,
    },
    onSubmit: async (values) => {
      console.log(values);
      console.log('page-wallet');
      console.log(publicAddress);
    },
  });

  return (
    <div className="p-3.5">
      <div className=" rounded-2xl border border-stroke-gray p-2.5 dark:border-dark-gray md:mx-auto md:max-w-4xl md:p-8">
        <div className="pb-6 pt-5 text-2xl font-semibold md:hidden">
          CREATE NEW NFT
        </div>
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
                <InputSearch
                  suffix={<span className="text-lg text-txt-gray">ASTR</span>}
                  type="number"
                  initValue={formik?.values?.price}
                  className="px-4  text-lg text-txt-gray"
                  noCleaarIcon={true}
                />
              </div>
              {/* TODO: functionality need to be clarified */}
              <ChooseCollection
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
      <AnimatePresence>
        {createCollectionModal && (
          <CreateCollectionModal
            onClose={() => showCreateCollectionModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
