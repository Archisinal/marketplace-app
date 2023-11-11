import {PolkadotIndexer} from "./indexer";
import {ArchNftListener} from "./events/contracts/arch-nft";

const main = async () => {
    const indexer = new PolkadotIndexer();
    await indexer.init();

    indexer.addEventHandlers(
        new ArchNftListener("5CdQE2vqc5U62LX1gfdXgiLnv9VpcaVZVxkgxJccN7v23AcR")
    )

    await indexer.processChain();
}

main().catch(console.error);
