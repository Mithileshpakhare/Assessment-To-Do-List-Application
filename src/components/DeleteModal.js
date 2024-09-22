import React from 'react';
import './DeleteModal.css'; // Import the CSS

const DeleteModal = ({ task, onDelete, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Delete</h2>
        <p>Are you sure you want to delete the task: {task.user}?</p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>No</button>
          <button className="btn btn-danger" onClick={onDelete}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
