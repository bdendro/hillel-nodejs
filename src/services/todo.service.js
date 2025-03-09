const todos = [];
let i = 1; // autoincrement

const findById = (userId, id) => {
  return todos.find(
    (todo) => todo.userId === userId && todo.id === parseInt(id)
  );
};

const findIndexById = (userId, id) => {
  return todos.findIndex(
    (todo) => todo.userId === userId && todo.id === parseInt(id)
  );
};

export const getTodos = (userId) => {
  return todos.filter((todo) => todo.userId === userId);
};

export const getTodo = (userId, id) => {
  const todo = findById(userId, id);
  if (!todo) {
    return null;
  }
  return todo;
};

export const postTodo = (userId, todo) => {
  todos.push({ id: i, userId, ...todo });
  i++;
  return findById(userId, i - 1);
};

export const putTodo = (userId, id, todo) => {
  const todoIndex = findIndexById(userId, id);
  if (todoIndex === -1) {
    return null;
  }
  todos[todoIndex] = { id: parseInt(id), userId, ...todo };
  return findById(userId, id);
};

export const deleteTodo = (userId, id) => {
  // temporary placeholder until the db connection is established
  const todoIndex = findIndexById(userId, id);
  if (todoIndex === -1) {
    return null;
  }
  todos.splice(todoIndex, 1);
  return true;
};
