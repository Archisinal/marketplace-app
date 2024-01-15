'use client';

import {
  Wallet,
  WalletAccount,
  WalletInfo,
  WalletLogoProps,
} from '@/features/wallet-connect/types';

import {
  InjectedAccount,
  InjectedExtension,
  InjectedMetadata,
  InjectedProvider,
  InjectedWindow,
} from '@polkadot/extension-inject/types';
import { Signer } from '@polkadot/types/types';
import { encodeAddress } from '@polkadot/util-crypto';

const DAPP_NAME = 'SubWallet Connect';

export class BaseDotSamaWallet implements Wallet {
  extensionName: string;
  title: string;
  installUrl: string;
  logo: WalletLogoProps;

  _extension: InjectedExtension | undefined;
  _signer: Signer | undefined;
  _metadata: InjectedMetadata | undefined;
  _provider: InjectedProvider | undefined;

  constructor({ extensionName, installUrl, logo, title }: WalletInfo) {
    this.extensionName = extensionName;
    this.title = title;
    this.installUrl = installUrl;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.logo = logo;

    return this;
  }

  // API docs: https://polkadot.js.org/docs/extension/
  get extension() {
    return this._extension;
  }

  // API docs: https://polkadot.js.org/docs/extension/
  get signer() {
    return this._signer;
  }

  get metadata() {
    return this._metadata;
  }

  get provider() {
    return this._provider;
  }

  get installed() {
    const injectedWindow = window as Window & InjectedWindow;
    const injectedExtension =
      injectedWindow?.injectedWeb3?.[this.extensionName];

    return !!injectedExtension;
  }

  get rawExtension() {
    const injectedWindow = window as Window & InjectedWindow;

    return injectedWindow?.injectedWeb3?.[this.extensionName];
  }

  enable = async () => {
    if (!this.installed) {
      return;
    }

    try {
      const injectedExtension = this.rawExtension;

      if (!injectedExtension || !injectedExtension.enable) {
        return;
      }

      const rawExtension = await injectedExtension.enable(DAPP_NAME);

      if (!rawExtension) {
        return;
      }

      const extension: InjectedExtension = {
        ...rawExtension,
        // Manually add `InjectedExtensionInfo` so as to have a consistent response.
        name: this.extensionName,
        version: injectedExtension.version || 'unknown',
      };

      this._extension = extension;
      this._signer = extension?.signer;
      this._metadata = extension?.metadata;
      this._provider = extension?.provider;
    } catch (err) {
      console.error(err);
    }
  };

  getAccounts = async (ss58Format: number) => {
    if (!this._extension) {
      await this?.enable();
    }

    if (!this._extension) {
      return null;
    }

    const accounts = await this._extension.accounts.get();

    return accounts.map((account: InjectedAccount): WalletAccount => {
      return {
        ...account,
        address: encodeAddress(account.address, ss58Format),
        source: this._extension?.name as string,
        // Added extra fields here for convenience
        wallet: this,
        signer: this._extension?.signer,
      } as WalletAccount;
    });
  };
}
