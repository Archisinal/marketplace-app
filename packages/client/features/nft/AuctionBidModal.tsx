import React from 'react';
import { Button, Icon, InputSearch, Modal } from '@/components';

type TAuctionBidModal = { onClose: () => void };

const AuctionBidModal = ({ onClose }: TAuctionBidModal) => {
  return (
    <Modal
      onClose={() => onClose()}
      title={<p className="text-xl font-bold">Bid on auction</p>}
      containerClass="p-4 rounded-xl fixed sm:relative bottom-0 sm:bottom-auto top-auto sm:top-1/2 translate-y-0 sm:-translate-y-2/4 sm:w-2/4"
    >
      <div className="mt-4 border-t border-stroke-gray">
        <div className="mb-10 flex flex-col gap-3.5 pt-4">
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
          className="w-full rounded-2xl"
        />
      </div>
    </Modal>
  );
};

export default AuctionBidModal;
