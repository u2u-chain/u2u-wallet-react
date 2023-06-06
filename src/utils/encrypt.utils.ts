import * as CryptoJS from 'crypto-js';

export function encryptWithPassword(plaintext, password) {
  return CryptoJS.AES.encrypt(plaintext, password).toString();
}

export async function decryptWithPassword(encryptedData: string, password: string) {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, password);
  if (decrypted) {
    try {
      console.log(decrypted);
      const str = decrypted.toString(CryptoJS.enc.Utf8);
      if (str.length > 0) {
        return str;
      } else {
        return 'error 1';
      }
    } catch (e) {
      return 'error 2';
    }
  }
  return 'error 3';
}
