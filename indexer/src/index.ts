import {PolkadotIndexer} from "./indexer";
import {ArchNftListener} from "./events/contracts/arch-nft";
import {UserListener} from "./events/contracts/user";
import {CreatorListener} from "./events/contracts/creator";
import {MarketplaceListener} from "./events/contracts/marketplace";
import {AccountManagerListener} from "./events/contracts/account-manager";

import ArchNFTAbi from "../artifacts/arch_nft.json";
// import UserAbi from "../artifacts/user.json";
// import CreatorAbi from "../artifacts/creator.json";
// import MarketplaceAbi from "../artifacts/marketplace.json";
// import AccountManagerAbi from "../artifacts/account_manager.json";

const main = async () => {
    const indexer = new PolkadotIndexer();
    await indexer.init();


    // PSP22 deployed at 5HCQVx1ypKPnajcGF9TpWUchk1W3VitoSeUjL8YWcHzk9d3Y
    // ArchNFT deployed at 5H5PTiMfpzWmwrQ9m2PXVxuD4EhSVDx8Uy7rNdfFonjSZcx9
    // User deployed at 5H2V6gXnF7AtQHJWC4BG6CvaLTz38fFfYevb6Aw21QQKa7bv
    // Creator deployed at 5CdogmiFDsp9zwb4a1TJDfPWAzBJFCqG21oYnxi9KL2dNDoc
    // Marketplace deployed at 5CmT6jYJ7vxcXuFYKrJzG65qq9iDxNzhvhL9vQsXofkKhEDw
    // AccountManager deployed at 5DZ1HhGoHMGkBQ6MN8V1E1rKdwQqV72y4LtdU2ckxdbAefEW

    indexer.addEventHandlers(
        new ArchNftListener("5Hpjk9Lfwy44M88wK7bLhL4c9fbnnPb1UD8wCrYrFkmhTCR1", ArchNFTAbi),
        // new UserListener("5H2V6gXnF7AtQHJWC4BG6CvaLTz38fFfYevb6Aw21QQKa7bv", UserAbi),
        // new CreatorListener("5CdogmiFDsp9zwb4a1TJDfPWAzBJFCqG21oYnxi9KL2dNDoc", CreatorAbi),
        // new MarketplaceListener("5CmT6jYJ7vxcXuFYKrJzG65qq9iDxNzhvhL9vQsXofkKhEDw", MarketplaceAbi),
        // new AccountManagerListener("5DZ1HhGoHMGkBQ6MN8V1E1rKdwQqV72y4LtdU2ckxdbAefEW", AccountManagerAbi)
    )

    await indexer.processChain();
}

main().catch(console.error);
