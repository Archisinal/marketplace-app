'use client';
import React, { FC, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button, DropdownSelect, Icon } from '@/components';
import { twMerge } from 'tailwind-merge';
import { CATEGORIES } from '@/features/collection/constants';
import { FieldNames } from '@/features/nft/constants';
import TextField from '@/components/ui/TextField';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import { SCREENS, useScreenSize } from '@/utils/resolutionScreens';

export type NftFilterType = 'price' | 'category';

type TFilter = {
  onClose: () => void;
  styles?: string;
  filters?: NftFilterType[];
};

type TFilterParams = {
  categories?: string;
  priceFrom?: string;
  priceTo?: string;
};

const NftFilter: FC<TFilter> = ({ onClose, styles, filters }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const screen = useScreenSize();

  const formik = useFormik<TFilterParams>({
    initialValues: {
      categories: searchParams.get('categories') || undefined,
      priceFrom: searchParams.get('priceFrom') || undefined,
      priceTo: searchParams.get('priceTo') || undefined,
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const queryString = createQueryString(Object.entries(values));

        if (screen === SCREENS.mobile) {
          onClose();
        }
        router.push(pathname + '?' + queryString, { scroll: false });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const createQueryString = useCallback(
    (filterParams: [string, string?][]) => {
      const params = new URLSearchParams(searchParams.toString());

      filterParams.forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      return params.toString();
    },
    [searchParams],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: [-50, 0] }}
      exit={{ opacity: 0, x: -50 }}
      className={twMerge(
        styles,
        'fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen flex-col gap-12 self-start rounded-lg border border-stroke-gray bg-white p-8 dark:border-dark-gray dark:bg-black-rus md:sticky md:top-24 md:z-auto md:mt-1 md:h-auto',
      )}
    >
      <div className="flex justify-between text-2xl font-bold">
        <p>FILTER</p>
        <motion.span
          onClick={onClose}
          className="cursor-pointer"
          transition={{ duration: 0.2 }}
          whileHover={{ opacity: 0.5 }}
        >
          <Icon name="close" />
        </motion.span>
      </div>
      <div className="flex flex-1 flex-col gap-12">
        {filters?.includes('price') && (
          <div className="flex flex-col gap-3.5">
            <p className="text-xl font-semibold">Price</p>
            <div className="flex w-full items-center gap-2">
              <TextField
                placeholder="Min"
                className="flex-1"
                type="number"
                name="priceFrom"
                value={formik.values.priceFrom}
                onChange={formik.handleChange}
              />
              <span className="text-txt-gray">to</span>
              <TextField
                placeholder="Max"
                className="flex-1"
                type="number"
                name="priceTo"
                value={formik.values.priceTo}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        )}
        {filters?.includes('category') && (
          <div className="flex flex-col gap-3">
            <label
              htmlFor={FieldNames.categories}
              className="text-xl font-semibold"
            >
              Categories
            </label>
            <DropdownSelect
              multiple
              label="Tags"
              placeholder="Select categories"
              options={CATEGORIES}
              value={CATEGORIES.filter(({ value }) => {
                return formik.values.categories?.includes(value);
              })}
              onChange={(categories) => {
                formik.setFieldValue(
                  FieldNames.categories,
                  categories?.map(({ value }) => value).join(','),
                );
              }}
            />
          </div>
        )}
      </div>

      <Button
        title="Apply"
        color="black"
        className="w-full rounded-xl !text-lg"
        onClick={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </motion.div>
  );
};

export default NftFilter;
