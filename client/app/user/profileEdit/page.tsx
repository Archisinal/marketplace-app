"use client";

import React from "react";
import { useFormik } from "formik";

import { ImageComponent, Icon, Button } from "@/components";
import { FieldNames } from "@/features/user/constants";
import { SocialLinkInput } from "@/features/user";

export default function EditUserProfile() {
  const formik = useFormik({
    initialValues: {
      userName: "",
      shortBio: "",
      profession: "",
      email: "",
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
    <div className="px-4 md:w-9/12 mx-auto">
      <p className="text-2xl font-bold py-3">Profile settings</p>
      <div className="relative sm:w-full pt-6">
        <ImageComponent
          src={"/mockAssets/1.png"}
          className="sm:w-full h-52 md:h-72 object-cover rounded-2xl"
        />
        <span className="flex bg-white dark:bg-black-rus p-2.5 md:p-3 absolute top-40 md:top-56 rounded-2xl -left-1.5">
          <ImageComponent
            src={"/mockCategories/Rectangle 45.png"}
            width={66}
            height={67}
            style={{ height: "67px" }}
          />
        </span>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex flex-col gap-3 md:grid md:grid-cols-2fr-1.5fr md:gap-7">
            <div className="flex flex-col gap-3">
              <label htmlFor={FieldNames.userName} className="font-bold">
                Username
              </label>
              <input
                className="py-2 px-4 rounded-2xl border border-stroke-gray dark:border-dark-gray focus:border-silver dark:focus:border-vulcan outline-none dark:bg-dark-gray"
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
                className="py-2 px-4 h-11 rounded-2xl border border-stroke-gray dark:border-dark-gray focus:border-silver dark:focus:border-vulcan outline-none dark:bg-dark-gray"
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
              <div className="flex flex-col gap-3 sm:flex-row sm:grid sm:grid-cols-2fr-150">
                <input
                  className="py-2 px-4 rounded-2xl border border-stroke-gray dark:border-dark-gray focus:border-silver dark:focus:border-vulcan outline-none dark:bg-dark-gray"
                  placeholder="Architect"
                  id={FieldNames.profession}
                  name={FieldNames.profession}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik?.values?.profession}
                />
                <Button
                  className="w-2/4 sm:w-full font-semibold bg-button-gray dark:bg-dark-gray rounded-2xl text-base p-2 items-center text-black dark:text-white mb-2"
                  title={
                    <p className="flex gap-2 items-center">
                      Add portfolio{" "}
                      <span>
                        <Icon name="circleAdd" />
                      </span>{" "}
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
                className="py-2 px-4 rounded-2xl border border-stroke-gray dark:border-dark-gray focus:border-silver dark:focus:border-vulcan outline-none dark:bg-dark-gray"
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
            <p className="text-xl font-bold py-3">Add social links</p>
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
              className="rounded-2xl w-full mt-3 py-3.5 md:w-42"
              onClick={formik.handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
