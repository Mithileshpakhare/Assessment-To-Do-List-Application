import React, { useState } from 'react';
import './TaskModal.css';

const TaskModal = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    user: task?.user || '',
    status: task?.status || '',
    dueDate: task?.dueDate || '',
    priority: task?.priority || '',
    comments: task?.comments || '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = () => {
    const { user, status, dueDate, priority, comments } = formData;

    if (!user || !status || !dueDate || !priority || !comments) {
      setError('All fields are mandatory. Please fill out every field.');
      return;
    }

    const formattedDueDate = formatDate(new Date(dueDate));
    onSave({ ...task, ...formData, dueDate: formattedDueDate });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{task ? 'Edit Task' : 'New Task'}</h3>
        {error && <p className="error-message">{error}</p>}

        <div className="modal-row">
          <div className="field">
            <label htmlFor="user">
              <span className="required">*</span> Assigned To
            </label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleChange}
              id="user"
              required
              className={error ? 'error' : ''}
            />
          </div>

          <div className="field">
            <label htmlFor="status">
              <span className="required">*</span> Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              id="status"
              required
              className={error ? 'error' : ''}
            >
              <option value="">*Select Status</option>
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="modal-row">
          <div className="field">
            <label htmlFor="dueDate">
              <span className="required">*</span> Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              id="dueDate"
              required
              className={error ? 'error' : ''}
            />
          </div>

          <div className="field">
            <label htmlFor="priority">
              <span className="required">*</span> Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              id="priority"
              required
              className={error ? 'error' : ''}
            >
              <option value="">*Select Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Normal</option>
            </select>
          </div>
        </div>

        <label htmlFor="comments">
          <span className="required">*</span> Description
        </label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          id="comments"
          required
          className={error ? 'error' : ''}
        />

        <div className="modal-actions">
          <button className="btn btn-cancel1" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-save1" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
