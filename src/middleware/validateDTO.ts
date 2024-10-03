import { ValidateFunction } from 'ajv';
import { NextFunction, Request, Response } from 'express';

export const validateDTO = (ajvValidate: ValidateFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajvValidate(req.body);
    console.log('valdiating', req.body, valid);
    if (!valid) {
      const errors = ajvValidate.errors;
      return res.status(400).json(errors);
    }
    next();
  };
};
