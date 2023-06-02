import {AccountBalanceQuery, AccountId, Client} from "@hashgraph/sdk";

class HederaService {
  client = Client.forTestnet();
  constructor() {
    const nodeAddress = import.meta.env.NODE_ADDRESS;
    const nodeAccountId = import.meta.env.NODE_ACCOUNT_ID;
    if (nodeAddress && nodeAccountId) {
      const nodes = {[nodeAddress]: new AccountId(parseInt(nodeAccountId))}
      this.client = Client.forNetwork(nodes);
    }
  }

  initialize(accountId: string, privateKey: string) {
    this.client.setOperator(accountId, privateKey);
  }

  async getBalance(accountId: string) {
    const balanceQuery = new AccountBalanceQuery().setAccountId(accountId);
    return await balanceQuery.execute(this.client);
  }
}

export default new HederaService();
