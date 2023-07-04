import {
  AccountBalanceQuery,
  AccountId,
  Client,
  U2U, Mnemonic, TransactionId,
  TransactionReceiptQuery, TransactionRecordQuery,
  TransferTransaction
} from "@u2u/sdk";
import axios from "axios";

class HederaService {
  client = Client.forTestnet();
  scanApiBaseUrl = import.meta.env.VITE_APP_SCAN_API_BASE || 'https://testnet.mirrornode.hedera.com';

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
      .addU2UTransfer(accountId, U2U.fromTinyU2U(-amount)) //Sending account
      .addU2UTransfer(recipientId, U2U.fromTinyU2U(amount)) //Receiving account
      .execute(this.client);
    const receipt = await transaction.getReceipt(this.client);
    return {
      transaction,
      receipt,
    }
  }

  async getTransactionsHistory(accountId: string, nextLink?: string) {
    return axios({
      url: `${this.scanApiBaseUrl}${nextLink ? nextLink : '/api/v1/transactions'}`,
      params: nextLink ? undefined : {
        'account.id': accountId,
        order: 'desc'
      }
    })
  }

  async getTransactionDetail(transactionId: string) {
    const [account, rest, second] = transactionId.split('-');
    const formattedId = `${account}@${rest}.${second}`;
    const tid = TransactionId.fromString(formattedId);
    return await new TransactionRecordQuery()
      .setTransactionId(tid)
      .execute(this.client);
  }

  async getTransactionReceipt(transactionId: string) {
    const [account, rest, second] = transactionId.split('-');
    const formattedId = `${account}@${rest}.${second}`;
    const tid = TransactionId.fromString(formattedId);
    return await new TransactionReceiptQuery()
      .setTransactionId(tid)
      .execute(this.client);
  }

  async generateMnemonicPrivateKey() {
    const mnemonic = await Mnemonic.generate();
    const privateKey = await mnemonic.toLegacyPrivateKey();
    const derPrivateKey = privateKey.toStringDer();
    return {
      mnemonic: mnemonic.toString(),
      privateKey: derPrivateKey.toString(),
      publicKey: privateKey.publicKey.toStringDer(),
    }
  }

  async restoreKeyFromMnemonic(mnemonicString: string) {
    const mnemonic = await Mnemonic.fromString(mnemonicString);
    const privateKey = await mnemonic.toLegacyPrivateKey();
    return {
      privateKey: privateKey.toStringDer(),
      publicKey: privateKey.publicKey.toStringDer(),
    }
  }
}

export default new HederaService();
