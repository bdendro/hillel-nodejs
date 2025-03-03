import {
  isTodoExists,
  getTodos as getTodosService,
  getTodo as getTodoService,
  postTodo as postTodoService,
  putTodo as putTodoService,
  deleteTodo as deleteTodoService,
} from '../services/todo.service.js';

export const getTodos = (req, res) => {
  const todos = getTodosService();
  return res.status(200).json(todos);
};

export const getTodo = (req, res) => {
  const { todoId } = req.params;
  if (!isTodoExists(todoId)) {
    return res.status(400).send(`Todo doesn't exist`);
  }
  const todo = getTodoService(todoId);
  return res.status(200).json(todo);
};

export const postTodo = (req, res) => {
  const todo = req.body;
  const resTodo = postTodoService(todo);
  return res.status(201).json(resTodo);
};

export const putTodo = (req, res) => {
  const todo = req.body;
  const { todoId } = req.params;
  if (!isTodoExists(todoId)) {
    return res.status(400).send(`Todo doesn't exist`);
  }
  const resTodo = putTodoService(todoId, todo);
  return res.status(201).json(resTodo);
};

export const deleteTodo = (req, res) => {
  const { todoId } = req.params;
  if (!isTodoExists(todoId)) {
    return res.status(400).send(`Todo doesn't exist`);
  }
  deleteTodoService(todoId);
  return res.status(204).send();
};
