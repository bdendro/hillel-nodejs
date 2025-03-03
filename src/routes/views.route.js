import { Router } from 'express';
import { getTodos } from '../services/todo.service.js';

export const viewsRouter = Router();

viewsRouter.get('/todos', (req, res) => {
  const todos = getTodos();
  res.render('todos', { title: 'Todos', todos });
});
