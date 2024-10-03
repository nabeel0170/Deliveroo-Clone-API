import { ajvInstance } from './ajvInstance';

const combinedSchema = {
  type: 'object',
  properties: {
    pathParam: {
      type: 'string',
      pattern: '^[a-zA-Z0-9_-]*$', // Allow only alphanumeric, underscore, and hyphen
      minLength: 0, // Require at least one character to avoid empty input
      maxLength: 50,
    },
    queryParam: {
      type: 'string',
      pattern: '^[a-zA-Z0-9_-]*$', // Allow only alphanumeric, underscore, and hyphen
      minLength: 0, // Require at least one character to avoid empty input
      maxLength: 100,
    },
  },
  additionalProperties: false, // Disallow additional properties
};

// Compile the schema
export const combinedQueryAndPathSchema = ajvInstance.compile(combinedSchema);
