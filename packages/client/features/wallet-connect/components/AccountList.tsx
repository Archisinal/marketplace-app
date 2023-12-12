'use client';

import React, { useCallback, useContext } from 'react';
import { Icon } from '@/components';
import { WalletContext } from '@/features/wallet-connect/context';
import { Button, message } from 'antd';

function AccountList(): React.ReactElement {
  const walletContext = useContext(WalletContext);

  const signDummy = useCallback(
    (address: string) => {
      const signer = walletContext.wallet?.signer;

      if (signer && signer.signRaw) {
        const signPromise = signer.signRaw({
          address,
          data: 'This is dummy message',
          type: 'bytes',
        });
        const key = 'sign-status';

        message.loading({ content: 'Signing', key });
        signPromise
          .then((rs: any) => {
            message.success({ content: 'Sign Successfully!', key });
          })
          .catch((error) => {
            console.error(error);
            message.warning({ content: 'Sign Failed or Cancelled!', key });
          });
      }
    },
    [walletContext.wallet?.signer],
  );

  const onSignClicked = useCallback(
    (address: string) => {
      return () => {
        signDummy(address);
      };
    },
    [signDummy],
  );

  return (
    <div className={'account-list'}>
      {walletContext.accounts.map((acc) => (
        <div className={'account-item'} key={acc.address}>
          <div className="info">
            <div className="account-item-info">
              <span className="account-item__title">Name:</span>
              <span className="account-item__content">{acc.name}</span>
            </div>
            <div className="account-item-info">
              <span className="account-item__title">Address:</span>
              <span className="account-item__content">{acc.address}</span>
            </div>
          </div>
          <div className={'actions'}>
            <Button
              className="sub-wallet-btn sub-wallet-sign-btn"
              icon={<Icon name="edit" />}
              key={acc.address}
              onClick={onSignClicked(acc.address)}
              type={'primary'}
            >
              Sign Dummy
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AccountList;
