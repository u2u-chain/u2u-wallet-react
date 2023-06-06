import * as CryptoJS from 'crypto-js';

export function encryptWithPassword(plaintext, password) {
  return CryptoJS.AES.encrypt(plaintext, password).toString();
}

export function decryptWithPassword(encryptedData: string, password: string) {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
  if (decrypted) {
    try {
      console.log(decrypted);
      const str = decrypted.toString(CryptoJS.enc.Utf8);
      if (str.length > 0) {
        return str;
      } else {
        throw new Error('WRONG_KEY');
      }
    } catch (e: any) {
      throw new Error('FAILED_TO_DECRYPT');
    }
  }
  throw new Error('INVALID_ENCRYPTION');
}
