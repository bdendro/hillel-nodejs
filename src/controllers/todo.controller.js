import jwt from 'jsonwebtoken';
import {
  getTodos as getTodosService,
  getTodo as getTodoService,
  postTodo as postTodoService,
  putTodo as putTodoService,
  deleteTodo as deleteTodoService,
} from '../services/todo.service.js';

const getUserIdByToken = (token) => {
  const { userId } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  return userId;
};

export const getTodos = (req, res) => {
  const userId = getUserIdByToken(
    String(req.headers['authorization']).split(' ')[1]
  );
  const todos = getTodosService(userId);
  return res.status(200).json(todos);
};

export const getTodo = (req, res) => {
  const userId = getUserIdByToken(
    String(req.headers['authorization']).split(' ')[1]
  );
  const { todoId } = req.params;
  const todo = getTodoService(userId, todoId);
  if (!todo) {
    return res.status(400).send(`Todo doesn't exist`);
  }

  return res.status(200).json(todo);
};

export const postTodo = (req, res) => {
  const userId = getUserIdByToken(
    String(req.headers['authorization']).split(' ')[1]
  );
  const todo = req.body;
  const resTodo = postTodoService(userId, todo);
  return res.status(201).json(resTodo);
};

export const putTodo = (req, res) => {
  const userId = getUserIdByToken(
    String(req.headers['authorization']).split(' ')[1]
  );
  const todo = req.body;
  const { todoId } = req.params;
  const resTodo = putTodoService(userId, todoId, todo);
  if (!resTodo) {
    return res.status(400).send(`Todo doesn't exist`);
  }
  return res.status(201).json(resTodo);
};

export const deleteTodo = (req, res) => {
  const userId = getUserIdByToken(
    String(req.headers['authorization']).split(' ')[1]
  );
  const { todoId } = req.params;
  const resTodo = deleteTodoService(userId, todoId);
  if (!resTodo) {
    return res.status(400).send(`Todo doesn't exist`);
  }
  return res.status(204).send();
};
