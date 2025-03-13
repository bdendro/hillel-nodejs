import jwt from 'jsonwebtoken';
import Logger from '../utils/logger/Logger.js';
import {
  getTodos as getTodosService,
  getTodo as getTodoService,
  postTodo as postTodoService,
  putTodo as putTodoService,
  deleteTodo as deleteTodoService,
} from '../services/todo.service.js';

const logger = new Logger();

const getUserIdByToken = (token) => {
  const { userId } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  return userId;
};

export const getTodos = async (req, res) => {
  const userId = getUserIdByToken(
    String(req.headers['authorization']).split(' ')[1]
  );
  try {
    const todos = await getTodosService(userId);
    return res.status(200).json(todos);
  } catch (err) {
    logger.error(err);
    if (err.name === 'SequelizeConnectionError') {
      return res.status(503).json({ message: 'Database connection error' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTodo = async (req, res) => {
  const userId = getUserIdByToken(
    String(req.headers['authorization']).split(' ')[1]
  );
  const { todoId } = req.params;
  try {
    const todo = await getTodoService(userId, todoId);
    if (!todo) {
      return res.status(404).json({ message: `Todo doesn't exist` });
    }
    return res.status(200).json(todo);
  } catch (err) {
    logger.error(err);
    if (err.name === 'SequelizeConnectionError') {
      return res.status(503).json({ message: 'Database connection error' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const postTodo = async (req, res) => {
  const userId = getUserIdByToken(
    String(req.headers['authorization']).split(' ')[1]
  );
  const todo = req.body;
  try {
    const newTodo = await postTodoService(userId, todo);
    return res.status(201).json(newTodo);
  } catch (err) {
    logger.error(err);
    if (err.name === 'SequelizeConnectionError') {
      return res.status(503).json({ message: 'Database connection error' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const putTodo = async (req, res) => {
  const userId = getUserIdByToken(
    String(req.headers['authorization']).split(' ')[1]
  );
  const todo = req.body;
  const { todoId } = req.params;
  try {
    const updatedTodo = await putTodoService(userId, todoId, todo);
    if (!updatedTodo) {
      return res.status(404).json({ message: `Todo doesn't exist` });
    }
    return res.status(201).json(updatedTodo);
  } catch (err) {
    logger.error(err);
    if (err.name === 'SequelizeConnectionError') {
      return res.status(503).json({ message: 'Database connection error' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTodo = async (req, res) => {
  const userId = getUserIdByToken(
    String(req.headers['authorization']).split(' ')[1]
  );
  const { todoId } = req.params;
  try {
    const resTodo = await deleteTodoService(userId, todoId);
    if (!resTodo) {
      return res.status(404).json({ message: `Todo doesn't exist` });
    }
    return res.status(204).json();
  } catch (err) {
    logger.error(err);
    if (err.name === 'SequelizeConnectionError') {
      return res.status(503).json({ message: 'Database connection error' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};
