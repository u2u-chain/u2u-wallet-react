import crypto from "crypto";

export async function encryptWithPassword(plaintextData: string, password: string) {
  const key = crypto.pbkdf2Sync(password, "", 100000, 32, "sha256");
  const iv = Buffer.alloc(16);

  const encryptor = crypto.createCipheriv("aes-256-ctr", key, iv);
  encryptor.setEncoding("hex");

  let encryptedData = encryptor.update(plaintextData, "utf8", "hex");
  encryptedData += encryptor.final("hex");

  return encryptedData;
}

export async function decryptWithPassword(encryptedData: string, password: string) {
  const key = crypto.pbkdf2Sync(password, "", 100000, 32, "sha256");
  const iv = Buffer.alloc(16);

  const decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);
  decipher.setEncoding("utf8");

  let decryptedData = decipher.update(encryptedData, "hex", "utf8");
  decryptedData += decipher.final("utf8");

  return decryptedData;
}
