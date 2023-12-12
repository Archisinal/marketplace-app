'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, message } from 'antd';

import {
  InjectedMetadataKnown,
  MetadataDef,
} from '@polkadot/extension-inject/types';
import { Icon } from '@/components';

import { WalletContext } from '@/features/wallet-connect/context';

function WalletMetadata(): React.ReactElement {
  const walletContext = useContext(WalletContext);
  const [injectedMetas, setInjectedMetas] = useState<InjectedMetadataKnown[]>(
    [],
  );

  const loadMetadata = useCallback(() => {
    const metadata = walletContext.wallet?.metadata;

    if (metadata) {
      metadata.get().then((rs) => {
        setInjectedMetas(rs);
      });
    }
  }, [walletContext.wallet?.metadata]);

  useEffect(() => {
    setTimeout(() => {
      loadMetadata();
    }, 300);
  }, [loadMetadata, walletContext.wallet]);

  const addMetadata = useCallback(() => {
    const metadata = walletContext.wallet?.metadata;

    if (metadata) {
      const newMetaDef: MetadataDef = {
        chain: 'SubWallet Connect Demo',
        genesisHash:
          '0x1bf2a278799868de66ea8610f2ce7c8c43706561b6476031315f6640fe38e888',
        icon: 'substrate',
        ss58Format: 0,
        // @ts-ignore
        chainType: 'substrate',
        color: '#F0F0F0',
        specVersion: Math.floor(Date.now() / 1000),
        tokenDecimals: 12,
        tokenSymbol: 'SWCC',
        types: {},
      };
      const key = 'add-metadata';

      message.loading({ content: 'Adding Metadata', key });
      metadata
        // @ts-ignore
        .provide(newMetaDef)
        .then((rs) => {
          message.success({ content: 'Add Metadata Successfully!', key });
          loadMetadata();
        })
        .catch((error) => {
          console.error(error);
          message.warning({
            content: 'Add Metadata Failed or Cancelled!',
            key,
          });
        });
    }
  }, [loadMetadata, walletContext.wallet?.metadata]);

  return (
    <div className={'wallet-metadata'}>
      <div className={'metadata-list'}>
        {injectedMetas.map((meta) => (
          <div className="metadata-item" key={meta.genesisHash}>
            <div className="metadata-item-info">
              <span className="metadata-item__title">Genesis Hash:</span>
              <span className="metadata-item__content">{meta.genesisHash}</span>
            </div>
            <div className="metadata-item-info">
              <span className="metadata-item__title">Spec Version:</span>
              <span className="metadata-item__content">{meta.specVersion}</span>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="sub-wallet-btn sub-wallet-icon-btn"
        icon={<Icon name="circleAdd" />}
        onClick={addMetadata}
        type={'primary'}
      >
        Add Example Metadata
      </Button>
    </div>
  );
}

export default WalletMetadata;
