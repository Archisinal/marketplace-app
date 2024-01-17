'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Description from '@/components/ui/Description';
import { Button, Icon } from '@/components';
import { NFT } from '@archisinal/backend';
import {
  formatAddress,
  formatPercentage,
  formatPrice,
  formatPriceWithDecimals,
} from '@/utils/formaters';
import { twMerge } from 'tailwind-merge';
import toast from 'react-hot-toast';
import { NodeContext } from '@/context';
import { WalletContext } from '@/features/wallet-connect/context';
import TextField from '@/components/ui/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { buyNft, cancelListing, listNft } from '@/services/tx';
import IdentIcon from '@/features/wallet-connect/components/Identicon';
import Link from 'next/link';
import BN from 'bn.js';
import { AnimatePresence, motion } from 'framer-motion';

type TNftItemAction = {
  onBackClick: () => void;
  onButtonClick: () => void;
  nft: NFT;
};

const validationSchema = Yup.object().shape({
  price: Yup.number()
    .integer('Price should be an integer.')
    .moreThan(0, 'Price should be positive.')
    .required('Price is required.'),
});

interface NFTFormValues {
  price?: number;
  isListingCreator: boolean;
}

const NftItemAction = ({ nft, onBackClick, onButtonClick }: TNftItemAction) => {
  const nodeContext = useContext(NodeContext);
  const chainDecimals = nodeContext.api?.registry.chainDecimals[0];
  const walletContext = useContext(WalletContext);
  const selectedAccountAddress = walletContext.selectedAccount?.[0]?.address;
  const { nativeCurrency } = useContext(NodeContext);
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const activeListing = nft.listings?.find(
    (listing) => listing.status === 'active',
  );
  const lastSale = nft.listings
    ?.filter((listing) => listing.status === 'sold')
    ?.sort((a, b) => a.created_at.valueOf() - b.created_at.valueOf())[0];

  const isOwner = nft?.owner === selectedAccountAddress;
  const isCreator = nft?.creator === selectedAccountAddress;
  const isListingCreator = activeListing?.creator === selectedAccountAddress;
  const getPriceEarned = (price: number) => {
    return formatPrice(
      formatPriceWithDecimals(price, chainDecimals || 0).sub(
        formatPriceWithDecimals(price, chainDecimals || 0)
          .mul(new BN(nft.collection?.royalty || 0))
          .div(new BN(10000)),
      ),
      nodeContext.api,
    );
  };

  const getPriceFormatted = (price: number) => {
    return formatPrice(
      formatPriceWithDecimals(price, chainDecimals || 0),
      nodeContext.api,
    );
  };

  const onShareClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };
  const onRefreshClick = () => {
    toast.loading('Refreshing NFT details...');
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    router.refresh();
  };

  const formik = useFormik<NFTFormValues>({
    enableReinitialize: true,
    initialValues: {
      price: undefined,
      isListingCreator,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        await listNft({
          price: formatPriceWithDecimals(values?.price, chainDecimals || 0),
          signerAddress: selectedAccountAddress!,
          signer: walletContext.wallet?.signer!,
          nft,
        });

        toast.success('NFT listed successfully!');
        router.refresh();
      } catch (error: any) {
        toast.error(error?.error ? error?.error?.message : error?.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const onCancelListing = async () => {
    setSubmitting(true);
    try {
      await cancelListing({
        signerAddress: selectedAccountAddress!,
        signer: walletContext.wallet?.signer!,
        listingId: activeListing?.id!,
      });

      toast.success('NFT listing cancelled successfully!');
      router.refresh();
    } catch (error: any) {
      toast.error(error?.error ? error?.error?.message : error?.message);
    } finally {
      setSubmitting(false);
    }
  };

  const onBuyNft = async () => {
    setSubmitting(true);
    try {
      await buyNft({
        signerAddress: selectedAccountAddress!,
        signer: walletContext.wallet?.signer!,
        listingId: activeListing?.id!,
        price: parseInt(activeListing?.price!),
      });

      toast.success('You bought NFT successfully!');
      router.refresh();
    } catch (error: any) {
      toast.error(error?.error ? error?.error?.message : error?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="md:sticky md:top-28 md:self-start">
      <div className="flex flex-col gap-3.5">
        <div className="flex cursor-pointer items-center gap-1.5">
          <span onClick={onBackClick}>
            <Icon name="arrowLeft" />
          </span>
          <p>{nft?.collection?.name}</p>
        </div>
        <div className="text-2xl font-bold">
          {nft.name} #{nft.id_in_collection}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="text-txt-gray">Owned by</span>
            <span className="font-bold">
              {nft.owner === process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS ? (
                <span className="flex gap-2">
                  <Link
                    href={`${nodeContext.subscanUrl}/account/${nft.owner}`}
                    className="flex items-center gap-1"
                  >
                    <Icon name="logo" width="20" height="20" className="mr-1" />{' '}
                    Archisinal Marketplace
                    <Icon name="arrowRightUp" />
                  </Link>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <IdentIcon address={nft.owner} /> {formatAddress(nft.owner)}
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-xl border border-stroke-gray px-2 py-px dark:border-dark-gray dark:bg-dark">
            <span>
              <Icon name="eye" />
            </span>
            <span className="font-semibold dark:text-light-silver">
              {nft.views}
            </span>
          </div>
        </div>
        <div>
          <Description value={nft.description || ''} className="leading-6" />
        </div>
      </div>

      <div className="border-t border-stroke-gray dark:border-dark-gray">
        <div className="flex justify-between py-6 text-sm dark:text-light-silver">
          <div className="flex gap-3.5 font-semibold">
            <div className="flex items-center justify-center gap-1 rounded-2xl border border-stroke-gray px-1.5 py-1 transition hover:shadow-button-shadow active:scale-95 dark:border-dark-gray dark:bg-dark md:cursor-pointer ">
              <Icon name="heart" />
              <span>0</span>
            </div>
            <div
              onClick={onRefreshClick}
              className="flex items-center justify-center gap-1 rounded-2xl border border-stroke-gray px-1.5 py-2 transition hover:shadow-button-shadow active:scale-95 dark:border-dark-gray dark:bg-dark md:cursor-pointer"
            >
              <Icon
                name="refresh"
                className={twMerge(refreshing && 'animate-spin')}
              />
              <span>Refresh</span>
            </div>
            <div
              onClick={onShareClick}
              className="flex items-center justify-center gap-1 rounded-2xl border border-stroke-gray px-1.5 py-2 transition hover:shadow-button-shadow active:scale-95 dark:border-dark-gray dark:bg-dark md:cursor-pointer"
            >
              <Icon name="share" />
              <span>Share</span>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-2xl border border-stroke-gray px-3 transition hover:shadow-button-shadow dark:border-dark-gray dark:bg-dark md:cursor-pointer">
            <Icon name="dots" />
          </div>
        </div>
        <div className="flex flex-col gap-6 rounded-xl border border-none border-stroke-gray dark:border-dark-gray">
          <div className="flex flex-col gap-3.5 rounded-xl border border-stroke-gray p-1.5 dark:border-dark-gray sm:flex-row">
            {!nodeContext.api && (
              <>
                <div className="flex h-[116px] animate-pulse flex-col gap-2 rounded-xl border  bg-gray-600 p-2.5 px-4  dark:border-none sm:w-full"></div>
                <div className="flex h-[116px] animate-pulse flex-col gap-2 rounded-xl border  bg-gray-600 p-2.5 px-4  dark:border-none sm:w-full"></div>
              </>
            )}

            {nodeContext.api && (
              <>
                <div className="flex flex-col gap-2 rounded-xl border bg-button-gray p-2.5 px-4 dark:border-none dark:bg-dark sm:w-full">
                  <p className="text-txt-gray">Fixed price</p>
                  <p className="text-2xl font-bold">
                    {activeListing && nodeContext.api
                      ? formatPrice(activeListing.price, nodeContext.api!)
                      : 'Not on sale'}
                  </p>
                  <p className="text-txt-gray">$0.00</p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl border bg-button-gray p-2.5 px-4 dark:border-none dark:bg-dark sm:w-full">
                  <p className="text-txt-gray">Last sale price</p>
                  <p className="text-2xl font-bold">
                    {lastSale && nodeContext.api
                      ? formatPrice(lastSale.price, nodeContext.api!)
                      : 'Never sold'}
                  </p>
                  <p className="text-txt-gray">$0.00</p>
                </div>
              </>
            )}
          </div>

          {isOwner && !activeListing && (
            <div className=" flex flex-col items-start gap-4 sm:flex-row">
              <div className="flex w-full flex-1 flex-col gap-3">
                <TextField
                  className="py-4"
                  endowment={nativeCurrency}
                  placeholder="0"
                  type="number"
                  id="price"
                  name="price"
                  value={formik?.values?.price}
                  onChange={formik.handleChange}
                  errorMessage={formik?.touched?.price && formik?.errors?.price}
                />
                <AnimatePresence>
                  {!isCreator && formik.values.price && (
                    <motion.div
                      className="flex justify-between px-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <span>You earn:</span>
                      <p className="text-txt-gray">
                        -{formatPercentage(nft.collection?.royalty)}% Royalty ={' '}
                        <span className="text-white">
                          {getPriceEarned(formik.values.price)}
                        </span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Button
                color="black"
                title={
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="sale" className="fill-black stroke-black" /> Put
                    on Sale
                  </span>
                }
                onClick={formik.handleSubmit}
                loading={formik.isSubmitting}
                className="w-full flex-1 rounded-2xl border border-stroke-gray px-0 dark:border-dark-gray"
              />
            </div>
          )}
          {isListingCreator && activeListing && (
            <div className="flex">
              <Button
                color="white"
                title={
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="sale" className="fill-black stroke-black" />
                    Cancel Listing
                  </span>
                }
                onClick={onCancelListing}
                loading={submitting}
                className="w-full flex-1 rounded-2xl border border-stroke-gray px-0 dark:border-dark-gray"
              />
              <div className="flex sm:flex-1"></div>
            </div>
          )}
          {!isOwner &&
            !isListingCreator &&
            activeListing &&
            nodeContext.api && (
              <div className="flex">
                <Button
                  color="black"
                  onClick={onBuyNft}
                  title={
                    <span className="flex items-center justify-center gap-2">
                      <Icon name="circleAdd" /> Buy now
                    </span>
                  }
                  className="w-full flex-1 rounded-2xl border border-stroke-gray px-0 dark:border-dark-gray"
                />
                <div className="flex sm:flex-1"></div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default NftItemAction;
