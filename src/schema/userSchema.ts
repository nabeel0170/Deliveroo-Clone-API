import { ajvInstance } from './ajvInstance';

// Base user schema
const baseUserSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
    contactNumber: { type: 'string', pattern: '^\\+?[1-9]\\d{1,14}$' },
    encryptedPassword: { type: 'string' },
    salt: { type: 'string' },
  },
  additionalProperties: false,
};

// Login schema
const userLoginSchema = {
  type: 'object',
  properties: {
    email: baseUserSchema.properties.email,
    encryptedPassword: baseUserSchema.properties.encryptedPassword,
  },
  required: ['email', 'encryptedPassword'],
  additionalProperties: false,
};

// Email verification schema
const userVerifyEmailSchema = {
  type: 'object',
  properties: {
    email: baseUserSchema.properties.email,
  },
  required: ['email'],
  additionalProperties: false,
};
// Email verification schema
const userSignUpSchema = {
  type: 'object',
  properties: {
    email: baseUserSchema.properties.email,
    password: baseUserSchema.properties.password,
    name: baseUserSchema.properties.name,
    contactNumber: baseUserSchema.properties.contactNumber,
    salt: baseUserSchema.properties.salt,
  },
  required: ['email', 'password', 'name', 'contactNumber', 'salt'],
  additionalProperties: false,
};

export const loginSchema = ajvInstance.compile(userLoginSchema);
export const emailSchema = ajvInstance.compile(userVerifyEmailSchema);
export const signUpSchema = ajvInstance.compile(userSignUpSchema);
