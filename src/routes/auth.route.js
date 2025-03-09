import { Router } from 'express';
import {
  refreshToken,
  signIn,
  signUp,
} from '../controllers/auth.controller.js';
import {
  loginValidator,
  registerValidator,
  validateToken,
} from '../middleware/validators/auth.validator.js';

export const authRouter = Router();

authRouter.post('/register', registerValidator, signUp);
authRouter.post('/login', loginValidator, signIn);
authRouter.post('/refresh', validateToken, refreshToken);
