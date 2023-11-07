import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ImageComponent, Icon } from "@/components";

type TNftListItem = {
  name: string;
  price: { value: number; currency: string };
  itemImg: string;
  company: string;
  owner: {
    name: string;
    imgSrc: string;
  };
};

const NftListItem: FC<TNftListItem> = ({
  name,
  price,
  itemImg,
  company,
  owner,
}) => {
  const router = useRouter();
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "1px 4px 8px silver" }}
      onClick={() => router.push("/explore/nft/item")}
      className="flex flex-col max-w-sm cursor-pointer rounded-2xl "
    >
      <div className="h-34 sm:h-44 translate-y-2.5 rounded-2xl">
        <ImageComponent
          src={itemImg}
          style={{ height: "100%", width: "100%" }} //aligning images
          className="rounded-2xl"
        />
      </div>
      <motion.div
        // whileHover={{ boxShadow: "1px 2px 5px black" }}
        className="border dark:!border-vulcan rounded-b-20 pt-4"
      >
        <div className="hidden md:block">
          <div className="px-5">
            <p className="text-xl font-extrabold truncate">{name}</p>
            <p className="text-txt-gray">{company}</p>
          </div>
          <div className=" px-5 mt-4 mb-4">
            <p className="border-t dark:border-dark-gray"></p>
            <div className="flex mt-4 items-center">
              <div className="mr-2.5">
                <ImageComponent width={46} height={46} src={owner.imgSrc} />
              </div>
              <div className="flex justify-between w-full">
                <div>
                  <p className="text-txt-gray ">By owner</p>
                  <p className="text-lg lg:text-base font-semibold">
                    {owner.name}
                  </p>
                </div>
                <div className="lg:text-base">
                  <p className="text-txt-gray text-end">Price</p>
                  <p className="text-lg flex gap-1.5 font-semibold">
                    <span>{price.value}</span>
                    <span className="text-davys-gray">{price.currency}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <div className="px-5">
            <p className="font-bold text-sm sm:text-lg truncate">{name}</p>
            <p className="hidden sm:block border-t dark:!border-davys-gray mt-2"></p>
          </div>
          <div className="px-5 mt-2 mb-2 flex gap-2 text-sm sm:text-base items-center">
            <span className="text-txt-gray">Price:</span>
            <span className="dark:text-white sm:font-semibold text-black sm:text-lg">
              {price.value}
            </span>
            <span className="text-davys-gray sm:font-semibold sm:text-lg">
              {price.currency}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NftListItem;
