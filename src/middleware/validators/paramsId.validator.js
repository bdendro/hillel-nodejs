import Joi from 'joi';

const idScema = Joi.number().integer().positive();

export const idValidator =
  (idNames = []) =>
  (req, res, next) => {
    const errors = [];

    idNames.forEach((idName) => {
      if (req.params[idName]) {
        const { error } = idScema.validate(req.params[idName]);
        if (error) {
          errors.push(`${idName}: ${error.message}`);
        }
      }
    });

    if (errors.length) {
      return res.status(400).json({
        errors: errors,
      });
    }

    next();
  };
