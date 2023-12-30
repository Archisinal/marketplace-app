'use client';

import React from 'react';
import { useFormik } from 'formik';

import { Button, Icon, ImageComponent } from '@/components';
import { FieldNames } from '@/features/user/constants';
import { SocialLinkInput } from '@/features/user';

export default function EditUserProfile() {
  const formik = useFormik({
    initialValues: {
      userName: '',
      shortBio: '',
      profession: '',
      email: '',
      socialLinks: {},
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const onSocialLinkChange = (url: string) =>
    formik.setFieldValue(FieldNames.socialLinks, {
      ...formik?.values.socialLinks,
      webSite: url,
    });

  return (
    <div className="mx-auto px-4 md:w-9/12">
      <p className="py-3 text-2xl font-bold">Profile settings</p>
      <div className="relative pt-6 sm:w-full">
        <ImageComponent
          fill={true}
          src={'/mockAssets/1.png'}
          className="h-52 rounded-2xl object-cover sm:w-full md:h-72"
        />
        <span className="absolute -left-1.5 top-40 flex rounded-2xl bg-white p-2.5 md:top-56 md:p-3 dark:bg-black-rus">
          <ImageComponent
            src={'/mockCategories/Exterior.png'}
            width={66}
            height={67}
            style={{ height: '67px' }}
          />
        </span>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-3 md:grid md:grid-cols-2fr-1.5fr md:gap-7">
            <div className="flex flex-col gap-3">
              <label htmlFor={FieldNames.userName} className="font-bold">
                Username
              </label>
              <input
                className="rounded-2xl border border-stroke-gray px-4 py-2 outline-none focus:border-silver dark:border-dark-gray dark:bg-dark-gray dark:focus:border-vulcan"
                placeholder="4-60 characters and digits"
                id={FieldNames.userName}
                name={FieldNames.userName}
                type="text"
                onChange={formik.handleChange}
                value={formik?.values?.userName}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor={FieldNames.shortBio} className="font-bold">
                Short bio
              </label>
              <textarea
                className="h-11 rounded-2xl border border-stroke-gray px-4 py-2 outline-none focus:border-silver dark:border-dark-gray dark:bg-dark-gray dark:focus:border-vulcan"
                placeholder="4-200 characters and digits"
                id={FieldNames.shortBio}
                name={FieldNames.shortBio}
                maxLength={200}
                onChange={formik.handleChange}
                value={formik?.values?.shortBio}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor={FieldNames.profession} className="font-bold">
                Profession
              </label>
              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2fr-150 sm:flex-row">
                <input
                  className="rounded-2xl border border-stroke-gray px-4 py-2 outline-none focus:border-silver dark:border-dark-gray dark:bg-dark-gray dark:focus:border-vulcan"
                  placeholder="Architect"
                  id={FieldNames.profession}
                  name={FieldNames.profession}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik?.values?.profession}
                />
                <Button
                  className="mb-2 w-2/4 items-center rounded-2xl bg-button-gray p-2 text-base font-semibold text-black sm:w-full dark:bg-dark-gray dark:text-white"
                  title={
                    <p className="flex items-center gap-2">
                      Add portfolio{' '}
                      <span>
                        <Icon name="circleAdd" />
                      </span>{' '}
                    </p>
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor={FieldNames.email} className="font-bold">
                Your Email
              </label>
              <input
                className="rounded-2xl border border-stroke-gray px-4 py-2 outline-none focus:border-silver dark:border-dark-gray dark:bg-dark-gray dark:focus:border-vulcan"
                placeholder="Enter your email"
                id={FieldNames.email}
                name={FieldNames.email}
                type="text"
                onChange={formik.handleChange}
                value={formik?.values?.email}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="py-3 text-xl font-bold">Add social links</p>
            <div className="flex flex-col gap-3 md:grid md:grid-cols-2fr-1.5fr md:gap-7">
              <SocialLinkInput
                label="Website URL"
                iconName="globe"
                placeholder="Https://"
                onChange={onSocialLinkChange}
              />
              <SocialLinkInput
                label="Twitter"
                iconName="twitter"
                placeholder="Enter your Twitter link"
                onChange={onSocialLinkChange}
              />
              <SocialLinkInput
                label="Discord"
                iconName="discord"
                placeholder="Enter your discord link"
                onChange={onSocialLinkChange}
              />
              <SocialLinkInput
                label="linkedin"
                iconName="linkedin"
                placeholder="Enter your linkedin link"
                onChange={onSocialLinkChange}
              />
              <SocialLinkInput
                label="Facebook"
                iconName="facebook"
                placeholder="Enter your facebook link"
                onChange={onSocialLinkChange}
              />
            </div>
            <Button
              title="Save settings"
              color="black"
              className="mt-3 w-full rounded-2xl py-3.5 md:w-42"
              onClick={formik.handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
