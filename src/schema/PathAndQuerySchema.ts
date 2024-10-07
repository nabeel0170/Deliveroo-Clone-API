import { ajvInstance } from './ajvInstance';

const querySchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      minLength: 0,
      maxLength: 50,
    },
  },

  additionalProperties: false,
};

export const QuerySchema = ajvInstance.compile(querySchema);
