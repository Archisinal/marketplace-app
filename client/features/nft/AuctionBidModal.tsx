import React from "react";
import { InputSearch, Button, Icon, Modal } from "@/components";

type TAuctionBidModal = { onClose: () => void };

const AuctionBidModal = ({ onClose }: TAuctionBidModal) => {
  return (
    <Modal
      onClose={() => onClose()}
      title={<p className="text-xl font-bold">Bid on auction</p>}
      containerClass="p-4 rounded-xl fixed sm:relative bottom-0 sm:bottom-auto top-auto sm:top-1/2 translate-y-0 sm:-translate-y-2/4 sm:w-2/4"
    >
      <div className="border-t border-stroke-gray mt-4">
        <div className="flex flex-col gap-3.5 pt-4 mb-10">
          <p className="text-lg text-txt-gray">Bid price</p>
          <InputSearch
            suffix={<span className="text-xl text-txt-gray">ASTR</span>}
            type="number"
            initValue="0.1"
            className="text-xl font-semibold text-txt-gray"
          />
          <p className="text-txt-gray">The minimum bid price is 0.1 ASTR</p>
        </div>
        <Button
          onClick={() => onClose()}
          color="black"
          title={
            <span className="flex items-center justify-center gap-1">
              <Icon name="hummer" /> Bid
            </span>
          }
          className="rounded-2xl w-full"
        />
      </div>
    </Modal>
  );
};

export default AuctionBidModal;
