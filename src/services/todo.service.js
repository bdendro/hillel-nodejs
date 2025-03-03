const todos = [];
let i = 1; // autoincrement

const findById = (id) => {
  return todos.find((todo) => todo.id === parseInt(id));
};

const findIndexById = (id) => {
  return todos.findIndex((todo) => todo.id === parseInt(id));
};

export const isTodoExists = (id) => {
  return !!findById(id);
};

export const getTodos = () => {
  return todos;
};

export const getTodo = (id) => {
  return findById(id);
};

export const postTodo = (todo) => {
  todos.push({ id: i, ...todo });
  i++;
  return findById(i - 1);
};

export const putTodo = (id, todo) => {
  const todoIndex = findIndexById(id);
  todos[todoIndex] = { id: parseInt(id), ...todo };
  return findById(id);
};

export const deleteTodo = (id) => {
  // temporary placeholder until the db connection is established
  const todoIndex = findIndexById(id);
  todos.splice(todoIndex, 1);
};
