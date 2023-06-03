import {AccountBalanceQuery, AccountId, Client, Hbar, TransferTransaction} from "@hashgraph/sdk";

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

  async sendTokens(accountId: string, recipientId: string, amount: number) {
    const transaction = await new TransferTransaction()
      .addHbarTransfer(accountId, Hbar.fromTinybars(-amount)) //Sending account
      .addHbarTransfer(recipientId, Hbar.fromTinybars(amount)) //Receiving account
      .execute(this.client);
    const receipt = await transaction.getReceipt(this.client);
    return {
      transaction,
      receipt,
    }
  }
}

export default new HederaService();
