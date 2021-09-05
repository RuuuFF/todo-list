const Todo = {
  form: document.getElementById('form'),
  input: document.getElementById('input'),
  todosUL: document.getElementById('todos'),

  todos: JSON.parse(localStorage.getItem('todos')),
  
  cancelEvent: event => event.preventDefault(),
  loadTodosInLocalStorage: () => Todo.todos ? Todo.todos.forEach(todo => Todo.addTodo(todo)) : '',

  updateLocalStorage() {
    const todosEl = document.querySelectorAll('.todos li')
    const todos = []
  
    todosEl.forEach(todoEl => todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed')
    }))
  
    localStorage.setItem('todos', JSON.stringify(todos))
  },

  addTodo(todo) {
    let todoText = input.value
  
    todo ? todoText = todo.text : ''
  
    if(todoText) {
      const todoEl = document.createElement('li')
  
      todo && todo.completed ? todoEl.classList.add('completed') : ''
  
      todoEl.innerText = todoText
  
      todoEl.addEventListener('click', () => {
        todoEl.classList.toggle('completed')
        Todo.updateLocalStorage()
      })
      
      todoEl.addEventListener('contextmenu', event => {
        Todo.cancelEvent(event)
        todoEl.remove()
        Todo.updateLocalStorage()
      })
  
      Todo.input.value = ''
      Todo.todosUL.appendChild(todoEl)
      Todo.updateLocalStorage()
    }
  },

  start() {
    Todo.loadTodosInLocalStorage()
    Todo.form.addEventListener('submit', event => {
      Todo.cancelEvent(event)
      Todo.addTodo()
    })
  }
}

Todo.start()