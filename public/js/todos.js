const createTodoForm = document.getElementById('newTodoForm');
const removeButtons = document.querySelectorAll('.delete-btn');
const todos = document.querySelectorAll('.check-input-show');
const todoList = document.querySelector('.list-group');

createTodoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(createTodoForm);
  const todo = {
    title: formData.get('title'),
    done: !!formData.get('status'),
  };

  try {
    const res = await fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${res.status} (${text})`);
    }

    const resTodo = await res.json();
    addTodoToDOM(resTodo);
    createTodoForm.reset();
  } catch (err) {
    console.error(
      'Error while trying to create todo:',
      err?.message || 'Unknown error'
    );
    alert(
      `Error while trying to create todo: ${err?.message || 'Unknown error'}`
    );
  }
});

todoList.addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;

    try {
      const res = await fetch(`/todos/${id}`, { method: 'DELETE' });
      const text = await res.text();
      if (!res.ok) {
        throw new Error(`${res.status} (${text})`);
      }
      console.log(`${res.status} (Todo deleted)`);
      e.target.closest('.list-group-item').remove();
    } catch (err) {
      console.error(
        'Error while trying to delete todo:',
        err?.message || 'Unknown error'
      );
      alert(
        `Error while trying to delete todo: ${err?.message || 'Unknown error'}`
      );
    }
  }
});

todoList.addEventListener('change', async (e) => {
  if (e.target.classList.contains('check-input-show')) {
    const id = e.target.dataset.id;
    const done = !!e.target.checked;
    const title = document.querySelector(
      `label[for="${e.target.id}"] .todo-title`
    ).textContent;

    try {
      const res = await fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, done }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status} (${text})`);
      }
      // const resTodo = await res.json();
    } catch (err) {
      e.target.checked = !e.target.checked;
      console.error(
        'Error while trying to update todo:',
        err?.message || 'Unknown error'
      );
      alert(
        `Error while trying to update todo: ${err?.message || 'Unknown error'}`
      );
    }
  }
});

function addTodoToDOM(todo) {
  const todoItem = document.createElement('li');
  todoItem.className = 'list-group-item d-flex align-items-center gap-3';
  todoItem.innerHTML = `
    <input class="form-check-input check-input-show" type="checkbox" ${
      todo.done ? 'checked' : ''
    } data-id="${todo.id}" id="todo-${todo.id}">
    <label class="form-check-label" for="todo-${todo.id}">
      <span class="todo-id">#${todo.id}. </span> 
      <span class="todo-title">${todo.title}</span>
    </label>
    <button class="btn btn-danger ms-auto delete-btn" data-id="${
      todo.id
    }">Delete</button>
  `;
  todoList.appendChild(todoItem);
}
