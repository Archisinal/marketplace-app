'use client';

import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { Button, Modal } from '@/components';
import { FieldNames } from '@/features/nft/constants';
import { instantiateCollection } from '@/services/tx';
import { WalletContext } from '@/features/wallet-connect/context';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import TextField from '@/components/ui/TextField';
import TextArea from '@/components/ui/TextArea';
import FileUpload from '@/components/ui/FileUpload';
import { uploadIpfs } from '@/utils/ipfs';

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required('Display name is required.'),
  collectionRoyalty: Yup.number()
    .min(0, 'Royalty cannot be negative.')
    .max(100, 'Royalty cannot be greater than 100%.')
    .test(
      'is-decimal',
      'Maximum 2 digits after comma, e.g. 12,45%',
      (val: any) => {
        if (val != undefined) {
          return /^\d+(\.\d{0,2})?$/.test(val);
        }
        return true;
      },
    )
    .required('Royalty is required.'),
  description: Yup.string().required('Description is required.'),
  image: Yup.string().required('Image is required.'),
});

type TCreateCollectionModal = {
  onClose: () => void;
};
export default function CreateCollectionModal({
  onClose,
}: TCreateCollectionModal) {
  const walletContext = useContext(WalletContext);
  const formik = useFormik({
    initialValues: {
      displayName: undefined,
      collectionRoyalty: undefined,
      description: undefined,
      ipfsHash: undefined,
      image: undefined,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { wallet } = walletContext;
      if (walletContext?.selectedAccount?.[0]?.address === undefined) {
        toast.error('Please connect wallet to execute this transaction.');
        return;
      }

      try {
        toast.loading('Uploading image to IPFS');
        const uploadResponse = await uploadIpfs(values.image!);

        await instantiateCollection(
          walletContext?.selectedAccount?.[0]?.address,
          wallet?.signer!,
          values?.displayName!,
          values?.description!,
          uploadResponse.IpfsHash,
          values.collectionRoyalty!,
        );

        onClose();
        toast.success(
          `Collection "${values.displayName}" is successfully created!`,
        );
      } catch (error: any) {
        toast.error(error?.error?.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal
      onClose={() => {
        onClose();
      }}
      containerClass="max-w-4xl rounded-xl overflow-auto"
    >
      <div className="flex flex-1 flex-col pt-3.5">
        <div className=" flex w-full flex-1 flex-col rounded-2xl border border-stroke-gray p-2.5 dark:border-dark-gray md:mx-auto md:max-w-4xl md:p-8">
          <div className="pb-6 pt-5 text-2xl font-semibold md:hidden">
            CREATE COLLECTION
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-1 flex-col">
            <div className="flex flex-1 grid-cols-2 flex-col md:grid md:gap-8">
              <div className="md:order-2">
                <FileUpload
                  onChange={(file) => formik.setFieldValue('image', file)}
                  errorMessage={formik?.touched?.image && formik?.errors?.image}
                />
              </div>
              <div className="flex flex-1 flex-col gap-6 pt-5 md:order-1 md:pt-0">
                <div className=" hidden text-2xl font-semibold md:block">
                  CREATE COLLECTION
                </div>
                <div className="flex flex-1 flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor={FieldNames.displayName}
                      className="font-bold"
                    >
                      Display name
                    </label>
                    <TextField
                      placeholder="Name for your collection"
                      id={FieldNames.displayName}
                      name={FieldNames.displayName}
                      type="text"
                      onChange={formik.handleChange}
                      value={formik?.values?.displayName}
                      errorMessage={
                        formik?.touched?.displayName &&
                        formik?.errors?.displayName
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor={FieldNames.description}
                      className="font-bold"
                    >
                      Description
                    </label>
                    <TextArea
                      placeholder="A description of your collection that will be visible to all users"
                      id={FieldNames.description}
                      name={FieldNames.description}
                      onChange={formik.handleChange}
                      value={formik?.values?.description}
                      errorMessage={
                        formik?.touched?.description &&
                        formik?.errors?.description
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor={FieldNames.collectionRoyalty}
                      className="font-bold"
                    >
                      Royalty
                    </label>
                    <TextField
                      placeholder="Royalty in %"
                      endowment="%"
                      id={FieldNames.collectionRoyalty}
                      name={FieldNames.collectionRoyalty}
                      type="number"
                      onChange={formik.handleChange}
                      value={formik?.values?.collectionRoyalty}
                      errorMessage={
                        formik?.touched?.collectionRoyalty &&
                        formik?.errors?.collectionRoyalty
                      }
                    />
                  </div>
                </div>
                <Button
                  title="Create Collection"
                  color="black"
                  className="rounded-2xl"
                  onClick={formik.handleSubmit}
                  loading={formik.isSubmitting}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
