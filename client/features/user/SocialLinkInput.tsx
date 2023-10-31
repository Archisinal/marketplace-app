import React, { ChangeEvent } from "react";
import { Icon } from "@/components";
import { TIconNames } from "@/icons/Icons.types";

type TSocialLinkInput = {
  iconName: TIconNames;
  placeholder?: string;
  label?: string;
  onChange?: (v: string) => void;
};

const SocialLinkInput = ({
  iconName,
  placeholder = "",
  onChange,
  label = "",
}: TSocialLinkInput) => {
  const onChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(target.value);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <label className="font-bold">{label}</label>
      <div className="flex items-center gap-2.5 p-2.5 rounded-2xl border border-stroke-gray dark:border-none  dark:bg-black-font">
        <span className="border-r border-stroke-gray pr-2.5">
          <Icon name={iconName} />
        </span>
        <input
          className="w-full outline-none dark:bg-inherit"
          placeholder={placeholder}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default SocialLinkInput;
