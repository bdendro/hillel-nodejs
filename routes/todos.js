import { Router } from 'express';
import { validateId } from '../middleware/validateId.js';

export const todosRoutes = Router();

export const todos = [];

todosRoutes
  .route('/')
  .get((req, res) => {
    res.status(200).json(todos);
  })
  .post((req, res) => {
    todos.push(req.body);
    res.status(201).send('Todo added');
  });

todosRoutes
  .route('/:todoId')
  .put(validateId, (req, res) => {
    const { todoId } = req.params;
    const id = Number(todoId);
    todos[id - 1] = req.body;
    res.status(201).send('Todo modified');
  })
  .delete(validateId, (req, res) => {
    const { todoId } = req.params;
    const id = Number(todoId);
    todos.splice(id - 1, 1);
    res.status(204).send();
  });
