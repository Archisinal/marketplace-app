import React, {
  ChangeEvent,
  useContext,
  useRef,
  useState,
  useEffect,
  RefObject,
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
  const [selectedProjectFile, setSelectedProjectFile] = useState<
    null | Blob | string
  >(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const projectInputRef = useRef<HTMLInputElement>(null);
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

  const onProjectFileChangeHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (target?.files) {
      return setSelectedProjectFile(URL.createObjectURL(target.files[0]));
    }
    return null;
  };

  const onUpload = (inputRef: RefObject<HTMLInputElement>) => () => {
    if (inputRef) {
      inputRef.current?.click();
    }
  };
  const formik = useFormik({
    initialValues: {
      displayName: '',
      royalty: '',
      description: '',
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
              <div className="flex items-center justify-center  sm:h-44 md:order-2  md:h-full ">
                <div className="grid grid-rows-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor={FieldNames.displayName}
                      className="font-bold"
                    >
                      Project File
                    </label>
                    <div className=" flex flex-col rounded-2xl border-2 border-dashed border-stroke-gray  py-6 text-center   dark:border-dark-gray">
                      <div className="flex justify-center text-lg text-txt-gray">
                        <p className="w-full  sm:px-1 md:px-14">
                          PNG, GIF, WEBP, MP4 or MP3. Max 100mb
                        </p>
                        {/* <p> or MP3. Max 100mb</p> */}
                      </div>
                      <div>
                        <input
                          type="file"
                          className="hidden"
                          ref={projectInputRef}
                          onChange={onProjectFileChangeHandler}
                        />
                        <Button
                          title="Explore now"
                          onClick={onUpload(projectInputRef)}
                          className="rounded-2xl bg-button-gray text-black dark:bg-dark-gray dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label
                      htmlFor={FieldNames.displayName}
                      className="font-bold"
                    >
                      Collection Image
                    </label>
                    <div className="  flex flex-col rounded-2xl  border-2 border-dashed border-stroke-gray  py-6  text-center  dark:border-dark-gray">
                      <div className="flex justify-center text-lg text-txt-gray">
                        <p className="w-full  sm:px-1 md:px-14">
                          PNG, GIF, WEBP, MP4 or MP3. Max 100mb
                        </p>
                        {/* <p> or MP3. Max 100mb</p> */}
                      </div>
                      <div>
                        <input
                          type="file"
                          className="hidden"
                          ref={imageInputRef}
                          onChange={onImageChangeHandler}
                        />
                        <Button
                          title="Explore now"
                          onClick={onUpload(imageInputRef)}
                          className="rounded-2xl bg-button-gray text-black dark:bg-dark-gray dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                  <label htmlFor={FieldNames.royalty} className="font-bold">
                    Royalty
                  </label>
                  <input
                    className="rounded-2xl border border-stroke-gray p-3 outline-none focus:border-silver dark:border-dark-gray dark:bg-dark-gray dark:focus:border-vulcan"
                    placeholder="Enter symbol token"
                    id={FieldNames.royalty}
                    name={FieldNames.royalty}
                    type="number"
                    onChange={formik.handleChange}
                    value={formik?.values?.royalty}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor={FieldNames.royalty} className="font-bold">
                    Tags
                  </label>
                  <MultiSelect
                    label="Tags"
                    placeholder="Please select tags"
                    options={CATEGORIES}
                    onSelect={() => {}}
                    onChange={(list) => {
                      //console.log(list)
                    }}
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
