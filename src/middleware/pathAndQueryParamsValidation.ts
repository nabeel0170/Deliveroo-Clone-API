import { ValidateFunction } from 'ajv';
import { NextFunction, Request, Response } from 'express';

export const validateCombinedSchema = (ajvValidate: ValidateFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajvValidate({
      pathParam: req.params.pathParam,
      queryParam: req.query.queryParam,
    });

    console.log('Validation result:', valid); // Log validation status
    console.log('Errors:', ajvValidate.errors);
    if (!valid) {
      const errors = ajvValidate.errors;
      return res.status(400).json(errors);
    }
    next();
  };
};
