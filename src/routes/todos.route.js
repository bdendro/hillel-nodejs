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

export const todosRoutes = Router();

todosRoutes.get('/', getTodos);
todosRoutes.get('/:todoId', idValidator, getTodo);
todosRoutes.post('/', todoValidator, postTodo);
todosRoutes.put('/:todoId', idValidator, todoValidator, putTodo);
todosRoutes.delete('/:todoId', idValidator, deleteTodo);
