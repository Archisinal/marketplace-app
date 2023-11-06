"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon, InputSearch } from "@/components";

type TMobileSearch = {
  onSearch: (v: string) => void;
  isShown: boolean;
  showInput: (v: boolean) => void;
};

const MobileSearch = ({ onSearch, isShown, showInput }: TMobileSearch) => {
  const clickHandler = () => showInput(true);
  return (
    <div className="dark:border-dark-gray border border-stroke-gray rounded-lg p-1">
      <span className="sm:hidden" onClick={clickHandler}>
        <Icon name="search" width="24" height="24" />
      </span>
      <span className="hidden sm:block" onClick={clickHandler}>
        <Icon name="search" width="30" height="30" />
      </span>
      {isShown && (
        <motion.div
          initial={{ top: -10 }}
          animate={{ top: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute p-2 w-full top-0 right-0 z-10 "
        >
          <InputSearch
            onChange={onSearch}
            suffix={
              <span
                onClick={() => {
                  showInput(false);
                  onSearch("");
                }}
              >
                <Icon name="close" widh="16" height="16" />
              </span>
            }
            className="px-2 py-4 text-sm sm:text-base bg-white"
            noCleaarIcon={true}
          />
        </motion.div>
      )}
    </div>
  );
};

export default MobileSearch;
