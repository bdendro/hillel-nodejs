import Joi from 'joi';

const registerScheme = Joi.object({
  username: Joi.string().min(1).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(1).max(30).required(),
});

const loginScheme = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).max(30).required(),
});

const tokenSchema = Joi.object({
  token: Joi.string().min(1).required(),
});

export const registerValidator = (req, res, next) => {
  const { error } = registerScheme.validate(req.body, {
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

export const loginValidator = (req, res, next) => {
  const { error } = loginScheme.validate(req.body, {
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

export const validateToken = (req, res, next) => {
  const { error } = tokenSchema.validate(req.body, {
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
