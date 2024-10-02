import CryptoJS from 'crypto-js';

// Generate Salt
export const generateSalt = (): string => {
  return CryptoJS.lib.WordArray.random(128 / 8).toString(); // 16 bytes = 128 bits
};

export const hashPassword = (password: string, salt: string): string => {
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32, // Match this with backend
    iterations: 1000, // Match this with backend
  }).toString();
};

export const comparePasswords = (
  inputPassword: string,
  storedHash: string,
): boolean => {
  return inputPassword === storedHash;
};
