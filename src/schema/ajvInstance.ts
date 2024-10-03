import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export const ajvInstance = new Ajv({ allErrors: true });
addFormats(ajvInstance);
