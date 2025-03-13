import Todo from '../models/todo.model.js';

export const getTodos = async (userId) => {
  return await Todo.findAll({
    where: { userId: parseInt(userId) },
    order: [['id', 'ASC']],
  });
};

export const getTodo = async (userId, id) => {
  const todo = await Todo.findByPk(parseInt(id));
  if (parseInt(userId) !== todo?.userId) {
    return null;
  }
  return todo;
};

export const postTodo = async (userId, todo) => {
  const newTodo = await Todo.create({ userId: parseInt(userId), ...todo });
  return newTodo;
};

export const putTodo = async (userId, id, todo) => {
  const [affectedRows, updatedTodos] = await Todo.update(
    { ...todo },
    { where: { id: parseInt(id), userId: parseInt(userId) }, returning: true }
  );
  if (!affectedRows) {
    return null;
  }
  return updatedTodos[0];
};

export const deleteTodo = async (userId, id) => {
  const res = await Todo.destroy({
    where: { id: parseInt(id), userId: parseInt(userId) },
  });
  if (!res) {
    return false;
  }
  return true;
};
