import { MetaMaskInpageProvider } from '@metamask/providers';
import { JsonRpcPayload, JsonRpcResponse } from 'web3-core-helpers';

import {
  InjectedExtension,
  InjectedMetadata,
  InjectedProvider,
  Unsubcall,
} from '@polkadot/extension-inject/types';
import { Signer } from '@polkadot/types/types';

export type SubscriptionFn = (
  accounts: WalletAccount[] | undefined,
) => void | Promise<void>;

export interface WalletLogoProps {
  src: string;
  alt: string;
}

export interface WalletAccount {
  address: string;
  source: string;
  name?: string;
  wallet?: Wallet;
  signer?: unknown;
}

export interface WalletInfo {
  extensionName: string;
  title: string;
  installUrl: string;
  logo: WalletLogoProps;
}

export interface WalletMethods {
  enable: () => Promise<unknown>;

  subscribeAccounts: (callback: SubscriptionFn) => Promise<Unsubcall | null>;

  getAccounts: () => Promise<WalletAccount[] | null>;
}

export interface Wallet extends WalletInfo, WalletMethods {
  installed: boolean | undefined;

  extension: InjectedExtension | undefined;

  signer: Signer | undefined;

  metadata: InjectedMetadata | undefined;

  provider: InjectedProvider | undefined;
}

export interface EvmWalletMethods {
  request<T>(args: RequestArguments): Promise<Maybe<T>>;

  enable(): Promise<boolean>;
}

export interface EvmWalletInfo extends WalletInfo {
  isSetGlobalString: string;
  initEvent?: string;
}

export interface EvmWallet extends EvmWalletInfo, EvmWalletMethods {
  installed: boolean;
  extension: MetaMaskInpageProvider | undefined;
  isReady: Promise<MetaMaskInpageProvider | undefined>;
}

// EVM request method callback event params
export interface EvmConnectParams {
  chainId: string;
}

export declare type RequestArguments = {
  /** The RPC method to request. */
  method: string;
  /** The params of the RPC method, if any. */
  params?: unknown[] | Record<string, unknown>;
};

export declare type Maybe<T> = Partial<T> | null | undefined;

export interface AbstractProvider {
  sendAsync(
    payload: JsonRpcPayload,
    callback?: (
      error: Error | null,
      result?: JsonRpcResponse,
    ) => Promise<unknown> | void,
  ): void;

  send?(
    payload: JsonRpcPayload,
    callback: (error: Error | null, result?: JsonRpcResponse) => unknown,
  ): void;

  request?(args: RequestArguments): Promise<any>;

  connected?: boolean;
}
