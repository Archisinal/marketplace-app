import { configDotenv } from 'dotenv';

configDotenv();

export class Config {
  static get collectionFabricAddress(): string {
    return process.env.COLLECTION_FABRIC!;
  }

  static get marketplaceAddress(): string {
    return process.env.MARKETPLACE!;
  }

  static get accountManagerAddress(): string {
    return process.env.ACCOUNT_MANAGER!;
  }

  static get rpcUrl(): string {
    return process.env.RPC_URL!;
  }
}
