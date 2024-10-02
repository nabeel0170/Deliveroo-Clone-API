import CryptoJS from 'crypto-js';

export const generateSalt = (): string => {
  return CryptoJS.lib.WordArray.random(128 / 8).toString();
};

export const hashPassword = (password: string, salt: string): string => {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 1000,
  }).toString();
};

export const comparePasswords = (
  inputPassword: string,
  storedHash: string,
): boolean => {
  return inputPassword === storedHash;
};
