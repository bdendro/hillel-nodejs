import express, { Router } from 'express';
import { todosRoutes } from './todos.js';

const router = Router();

router.use('/todos', todosRoutes);

export default router;
