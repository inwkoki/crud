const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory database (seeded with sample data)
let tasks = [
  { id: uuidv4(), title: 'Design system architecture', description: 'Plan microservices and DB schema', status: 'done', priority: 'high', createdAt: new Date('2025-04-20').toISOString() },
  { id: uuidv4(), title: 'Build REST API endpoints', description: 'CRUD operations for all resources', status: 'in-progress', priority: 'high', createdAt: new Date('2025-04-22').toISOString() },
  { id: uuidv4(), title: 'Write unit tests', description: 'Cover edge cases and happy paths', status: 'todo', priority: 'medium', createdAt: new Date('2025-04-23').toISOString() },
  { id: uuidv4(), title: 'Deploy to production', description: 'Configure Render environment', status: 'todo', priority: 'low', createdAt: new Date('2025-04-24').toISOString() },
];

// GET all tasks
app.get('/api/tasks', (req, res) => {
  const { status, priority } = req.query;
  let filtered = [...tasks];
  if (status) filtered = filtered.filter(t => t.status === status);
  if (priority) filtered = filtered.filter(t => t.priority === priority);
  res.json({ success: true, data: filtered, total: filtered.length });
});

// GET single task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
  res.json({ success: true, data: task });
});

// POST create task
app.post('/api/tasks', (req, res) => {
  const { title, description, priority = 'medium' } = req.body;
  if (!title?.trim()) return res.status(400).json({ success: false, message: 'Title is required' });
  const task = { id: uuidv4(), title: title.trim(), description: description?.trim() || '', status: 'todo', priority, createdAt: new Date().toISOString() };
  tasks.unshift(task);
  res.status(201).json({ success: true, data: task });
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Task not found' });
  const { title, description, status, priority } = req.body;
  tasks[idx] = { ...tasks[idx], ...(title && { title }), ...(description !== undefined && { description }), ...(status && { status }), ...(priority && { priority }) };
  res.json({ success: true, data: tasks[idx] });
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Task not found' });
  tasks.splice(idx, 1);
  res.json({ success: true, message: 'Task deleted' });
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
