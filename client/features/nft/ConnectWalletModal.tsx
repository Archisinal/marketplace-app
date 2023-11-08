import React from 'react';
import { Button, Icon, ImageComponent, Modal } from '@/components';

type TConectWallet = { onClose: () => void };

const ConnectWallet = ({ onClose }: TConectWallet) => {
  return (
    <Modal
      onClose={() => onClose()}
      title={<p className="text-xl font-bold">Connect a wallet</p>}
      containerClass="p-4 rounded-xl fixed sm:relative bottom-0 sm:bottom-auto top-auto sm:top-1/2 translate-y-0 sm:-translate-y-2/4 sm:w-2/4"
    >
      <div className="mt-4 border-t border-stroke-gray dark:border-dark-gray">
        <div className="mb-10 flex flex-col gap-3.5 pt-4">
          <div className="flex gap-2 rounded-2xl border border-stroke-gray p-3.5 text-lg font-bold dark:border-dark-gray">
            <ImageComponent src="/wallet/metamask.png" width={34} height={34} />
            <span>MetaMask</span>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl bg-button-gray p-3.5 dark:bg-dark">
            <p className="flex justify-between">
              <span className="font-semibold">
                Why don&apos;t I see my wallet?
              </span>
              <span>
                <Icon name="circleInfo" />
              </span>
            </p>
            <p className="cursor-pointer text-txt-gray decoration-1">
              Click here to learn more
            </p>
          </div>
        </div>
        <Button
          onClick={() => onClose()}
          color="white"
          title="Cancel"
          className="w-full rounded-2xl border border-stroke-gray dark:border-txt-gray"
        />
      </div>
    </Modal>
  );
};

export default ConnectWallet;
