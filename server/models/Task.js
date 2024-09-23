const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Not Started', 'Completed', 'In Progress'],
    default: 'Pending'
  },
  priority: {
    type: String,
    enum: ['Low', 'Normal', 'High'],
    default: 'Normal'
  },
  assignedTo: {
    type: String,
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
