import { Router } from 'express';
import {
  deleteTodo,
  getTodo,
  getTodos,
  postTodo,
  putTodo,
} from '../controllers/todo.controller.js';
import { todoValidator } from '../middleware/validators/todo.validator.js';
import { idValidator } from '../middleware/validators/paramsId.validator.js';
import { auth } from '../middleware/auth.js';

export const todosRoutes = Router();

todosRoutes.get('/', auth, getTodos);
todosRoutes.get('/:todoId', auth, idValidator(['todoId']), getTodo);
todosRoutes.post('/', auth, todoValidator, postTodo);
todosRoutes.put(
  '/:todoId',
  auth,
  idValidator(['todoId']),
  todoValidator,
  putTodo
);
todosRoutes.delete('/:todoId', auth, idValidator(['todoId']), deleteTodo);
