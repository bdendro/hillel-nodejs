import { Router } from 'express';
import { todosRoutes } from './todos.route.js';
import { viewsRouter } from './views.route.js';
import { authRouter } from './auth.route.js';

const router = Router();

router.use('/todos', todosRoutes);
router.use('/views', viewsRouter);
router.use('/auth', authRouter);

export default router;
