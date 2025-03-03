import Joi from 'joi';

const todoSchema = Joi.object({
  title: Joi.string().max(100).required(),
  done: Joi.boolean().required(),
});

export const todoValidator = (req, res, next) => {
  const { error } = todoSchema.validate(req.body, {
    allowUnknown: false,
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      error: error.message,
      details: error.details.map((detail) => detail.message),
    });
  }
  next();
};
