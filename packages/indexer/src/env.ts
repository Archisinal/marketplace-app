import { configDotenv } from 'dotenv';

configDotenv();

export class Config {
  static get collectionFabricAddress(): string {
    return process.env.COLLECTION_FABRIC_ADDRESS!;
  }

  static get marketplaceAddress(): string {
    return process.env.MARKETPLACE_ADDRESS!;
  }

  static get accountManagerAddress(): string {
    return process.env.ACCOUNT_MANAGER_ADDRESS!;
  }

  static get rpcUrl(): string {
    return process.env.RPC_URL!;
  }
}
