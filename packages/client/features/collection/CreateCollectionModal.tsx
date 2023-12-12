import React, {
  ChangeEvent,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { useFormik } from 'formik';
import { Button, Modal, MultiSelect } from '@/components';
import { FieldNames } from '@/features/nft/constants';
import { instantiateCollection } from '@/services/tx';
import { WalletContext } from '@/features/wallet-connect/context';
import { CATEGORIES } from '@/features/collection/constants';

type TCreateCollectionModal = {
  onClose: () => void;
};
export default function CreateCollectionModal({
  onClose,
}: TCreateCollectionModal) {
  const [selectedImageFile, setSelectedImageFile] = useState<
    null | Blob | string
  >(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [collectionError, setCollectionError] = useState(null);

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

  const onUpload = () => {
    if (inputRef) {
      inputRef.current?.click();
    }
  };
  const formik = useFormik({
    initialValues: {
      displayName: '',
      royalty: '',
      description: '',
      categories: [],
    },
    onSubmit: async (values) => {
      const { wallet } = walletContext;
      setCollectionError(null);
      if (wallet?.signer) {
        try {
          await instantiateCollection(
            publicAddress,
            wallet?.signer,
            values?.displayName,
            'uri/path',
            ['collection'],
            100,
          );
        } catch (error: any) {
          setCollectionError(error?.error?.message);
        }
      }
    },
  });

  useEffect(() => {
    setCollectionError(null);
  }, [formik.values]);

  return (
    <Modal
      onClose={() => {
        document.documentElement.style.overflow = 'visible';
        onClose();
      }}
      containerClass="max-w-4xl p-3 rounded-xl overflow-auto"
    >
      <div className="pt-3.5">
        <div className=" rounded-2xl border border-stroke-gray p-2.5 dark:border-dark-gray md:mx-auto md:max-w-4xl md:p-8">
          <div className="pb-6 pt-5 text-2xl font-semibold md:hidden">
            CREATE COLLECTIONS
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid-cols-2 md:grid md:gap-5">
              <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-stroke-gray py-6 dark:border-dark-gray sm:h-56 md:order-2  md:h-5/6 ">
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
                      onChange={onImageChangeHandler}
                    />
                    <Button
                      title="Explore now"
                      onClick={onUpload}
                      className="rounded-2xl bg-button-gray text-black dark:bg-dark-gray dark:text-white"
                    />
                  </div>
                </div>
              </div>{' '}
              <div className="flex flex-col gap-6 pt-5 md:order-1 md:pt-0">
                <div className=" hidden text-2xl font-semibold md:block">
                  CREATE COLLECTIONS
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor={FieldNames.displayName} className="font-bold">
                    Display name
                  </label>
                  <input
                    className="rounded-2xl border border-stroke-gray p-3 outline-none focus:border-silver dark:border-dark-gray dark:bg-dark-gray dark:focus:border-vulcan"
                    placeholder="Enter collections name"
                    id={FieldNames.displayName}
                    name={FieldNames.displayName}
                    type="text"
                    onChange={formik.handleChange}
                    value={formik?.values?.displayName}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor={FieldNames.description} className="font-bold">
                    Description
                  </label>
                  <textarea
                    className="rounded-2xl border border-stroke-gray p-3 outline-none focus:border-silver dark:border-dark-gray dark:bg-dark-gray dark:focus:border-vulcan"
                    placeholder="A description of your collection that will be visible to all users"
                    id={FieldNames.description}
                    name={FieldNames.description}
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
                <div className="flex flex-col gap-3">
                  <label htmlFor={FieldNames.royalty} className="font-bold">
                    Royalty
                  </label>
                  <input
                    className="rounded-2xl border border-stroke-gray p-3 outline-none focus:border-silver dark:border-dark-gray dark:bg-dark-gray dark:focus:border-vulcan"
                    placeholder="Enter royalty value"
                    id={FieldNames.royalty}
                    name={FieldNames.royalty}
                    type="number"
                    onChange={formik.handleChange}
                    value={formik?.values?.royalty}
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
        <p
          className={twMerge(
            `mt-2 h-6 rounded-lg bg-bandyRose px-3.5 text-white `,
            collectionError ? 'visible' : 'invisible',
          )}
        >
          {collectionError}
        </p>
      </div>
    </Modal>
  );
}
