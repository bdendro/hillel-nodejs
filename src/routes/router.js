import { Router } from 'express';
import { todosRoutes } from './todos.route.js';
import { viewsRouter } from './views.route.js';

const router = Router();

router.use('/todos', todosRoutes);
router.use('/views', viewsRouter);

export default router;
