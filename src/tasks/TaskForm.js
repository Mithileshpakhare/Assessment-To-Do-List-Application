import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ onAddTask, onEditTask, editingTask, onCancel }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Normal',
    assignedTo: '',
  });

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    } else {
      setTask({
        title: '',
        description: '',
        dueDate: '',
        status: 'Not Started',
        priority: 'Normal',
        assignedTo: '',
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      onEditTask(editingTask._id, task);
    } else {
      onAddTask(task);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{editingTask ? 'Edit Task' : 'New Task'}</h3>
      <h6 style={{ color: 'red' }}>*Task Title</h6>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <div>
        <h6 style={{ color: 'red' }}>*Assigned To</h6>
        <input
          type="text"
          name="assignedTo"
          value={task.assignedTo}
          onChange={handleChange}
          placeholder="Assigned To"
          required
        />
        <h6 style={{ color: 'red' }}>Due date</h6>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <h6 style={{ color: 'red' }}>*Status</h6>
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          required
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <h6 style={{ color: 'red' }}>*Priority</h6>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          required
        >
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </div>
      <h6 style={{ color: 'red' }}>*Description</h6>
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Task Description"
        required
      />
      <div className="form-buttons">
        <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
        <button type="submit" className="confirm-button">{editingTask ? 'Save' : 'Save'}</button>
      </div>
    </form>
  );
};

export default TaskForm;
