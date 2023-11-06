"use client";
import React, { useState, FC } from "react";
import { motion } from "framer-motion";
import { Filter, TabNav, UserListItem } from "@/components";
import { cardData } from "@/data/cardItems";

const UsersCollectionComponent = () => {
  const [isFilterOpen, setFilterOpen] = useState(false);

  const variants = {
    open: { width: "100%" },
    closed: { x: 0, width: "100%" },
  };

  return (
    <>
      {/* Mobile - Tablet screen */}
      <div className="md:hidden">
        {isFilterOpen && <Filter onClose={() => setFilterOpen(false)} />}
        {!isFilterOpen && (
          <>
            <TabNav onFilterClick={setFilterOpen} />
            <div>
              <motion.ul
                animate={isFilterOpen ? "open" : "closed"}
                variants={variants}
                className="grid grid-cols-1 gap-3"
              >
                {cardData.map((card) => (
                  <UserListItem {...card} />
                ))}
              </motion.ul>
            </div>
          </>
        )}
      </div>

      {/* Desktop screen  */}
      <div className="hidden md:block">
        <TabNav onFilterClick={setFilterOpen} isFilterOpen={isFilterOpen} />
        <div
          className={isFilterOpen ? "grid grid-cols-with-filter gap-5" : "grid"}
        >
          {isFilterOpen && (
            <Filter
              onClose={() => setFilterOpen(false)}
              styles="border rounded-lg dark:border-dark-gray border-stroke-gray mt-2"
            />
          )}
          <motion.ul
            animate={isFilterOpen ? "open" : "closed"}
            variants={variants}
            className={
              isFilterOpen
                ? "grid grid-cols-3 xlg:grid-cols-4 auto-rows-min gap-5"
                : "grid grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5 gap-6 auto-rows-min"
            }
          >
            {cardData.map((card) => (
              <UserListItem {...card} />
            ))}
          </motion.ul>
        </div>
      </div>
    </>
  );
};

export default UsersCollectionComponent;
