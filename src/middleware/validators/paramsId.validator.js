import Joi from 'joi';

const idScema = Joi.number().integer().positive();

export const idValidator = (req, res, next) => {
  const { todoId } = req.params;
  const { error } = idScema.validate(todoId);

  if (error) {
    return res.status(400).json({
      error: error.message,
      details: error.details.map((detail) => detail.message),
    });
  }
  next();
};
