const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // To use environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase'; // Fallback for local MongoDB

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Task schema and model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: 'Pending' },
  priority: { type: String, enum: ['Low', 'Normal', 'High'], default: 'Normal' },
  dueDate: Date,
  assignedTo: String
});

const Task = mongoose.model('Task', taskSchema);

// Routes

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Add a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: 'Error creating task', error: err.message });
  }
});

// Edit an existing task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: 'Error updating task', error: err.message });
  }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
