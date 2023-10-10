import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/my_admin_access';

export interface AdminAdded {
	caller: ReturnTypes.AccountId;
	accountId: ReturnTypes.AccountId;
}

export interface AdminRemoved {
	caller: ReturnTypes.AccountId;
	accountId: ReturnTypes.AccountId;
}

