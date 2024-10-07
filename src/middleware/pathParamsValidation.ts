import { ValidateFunction } from 'ajv';
import { NextFunction, Request, Response } from 'express';

export const validateQueryParamSchema = (ajvValidate: ValidateFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajvValidate(req.path);

    console.log('Errors:', ajvValidate.errors);
    if (!valid) {
      const errors = ajvValidate.errors;
      return res.status(400).json(errors);
    }
    next();
  };
};
