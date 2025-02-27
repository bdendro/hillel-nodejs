import { todos } from '../routes/todos.js';

export const validateId = (req, res, next) => {
  const { todoId } = req.params;
  const id = Number(todoId);
  if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
    res.status(400).send('Invalid URL');
  } else if (todos.length < id) {
    res.status(400).send(`Todo doesn't exist`);
  } else {
    next();
  }
};
