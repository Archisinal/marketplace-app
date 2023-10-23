import React from "react";
import { InputSearch, Button, Icon, Modal, ImageComponent } from "@/components";

type TConectWallet = { onClose: () => void };

const ConectWallet = ({ onClose }: TConectWallet) => {
  return (
    <Modal
      onClose={() => onClose()}
      title={<p className="text-xl font-bold">Connect a wallet</p>}
      containerClass="p-4 rounded-xl fixed sm:relative bottom-0 sm:bottom-auto top-auto sm:top-1/2 translate-y-0 sm:-translate-y-2/4 sm:w-2/4"
    >
      <div className="border-t border-stroke-gray dark:border-dark-gray mt-4">
        <div className="flex flex-col gap-3.5 pt-4 mb-10">
          <div className="text-lg font-bold flex gap-2 border rounded-2xl border-stroke-gray dark:border-dark-gray p-3.5">
            <ImageComponent src="/wallet/metamask.png" width={34} height={34} />
            <span>MetaMask</span>
          </div>
          <div className="bg-button-gray dark:bg-dark flex flex-col gap-2 rounded-2xl p-3.5">
            <p className="flex justify-between">
              <span className="font-semibold">Why don't I see my wallet?</span>
              <span>
                <Icon name="circleInfo" />
              </span>
            </p>
            <p className="text-txt-gray decoration-1 cursor-pointer">
              Click here to learn more
            </p>
          </div>
        </div>
        <Button
          onClick={() => onClose()}
          color="white"
          title="Cancel"
          className="rounded-2xl w-full border border-stroke-gray dark:border-txt-gray"
        />
      </div>
    </Modal>
  );
};

export default ConectWallet;
