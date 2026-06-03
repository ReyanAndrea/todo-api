const { v4: uuidv4 } = require('uuid');

let todos = [];

// GET all todos
const getAllTodos = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: todos
  });
};

// GET todo by ID
const getTodoById = (req, res) => {
  const todo = todos.find(t => t.id === req.params.id);
  if (!todo) {
    return res.status(404).json({ status: 'error', message: 'Todo not found' });
  }
  res.status(200).json({ status: 'success', data: todo });
};

// POST create todo
const createTodo = (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ status: 'error', message: 'Title is required' });
  }
  const newTodo = {
    id: uuidv4(),
    title,
    description: description || '',
    completed: false,
    createdAt: new Date()
  };
  todos.push(newTodo);
  res.status(201).json({ status: 'success', data: newTodo });
};

// PUT update todo
const updateTodo = (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ status: 'error', message: 'Todo not found' });
  }
  const { title, description, completed } = req.body;
  todos[index] = {
    ...todos[index],
    title: title ?? todos[index].title,
    description: description ?? todos[index].description,
    completed: completed ?? todos[index].completed,
    updatedAt: new Date()
  };
  res.status(200).json({ status: 'success', data: todos[index] });
};

// DELETE todo
const deleteTodo = (req, res) => {
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ status: 'error', message: 'Todo not found' });
  }
  todos.splice(index, 1);
  res.status(200).json({ status: 'success', message: 'Todo deleted successfully' });
};

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };