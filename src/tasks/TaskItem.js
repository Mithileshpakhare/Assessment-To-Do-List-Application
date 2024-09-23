import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onEditClick, onDeleteClick, onSelect, isSelected }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDeleteClick(task);
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <tr className="task-item">
        <td>
          <input 
            type="checkbox" 
            checked={isSelected} 
            onChange={() => onSelect(task)} 
          />
        </td>
        <td>{task.assignedTo}</td>
        <td>{task.status}</td>
        <td>{new Date(task.dueDate).toLocaleDateString()}</td>
        <td>{task.priority}</td>
        <td>{task.description}</td>
        <td className="action-dropdown">
          <select onChange={(e) => {
            if (e.target.value === 'edit') {
              onEditClick(task);
            } else if (e.target.value === 'delete') {
              handleDeleteClick();
            }
            e.target.value = ''; // Reset dropdown
          }}>
            <option value=""></option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
        </td>
      </tr>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete</h3>
            <p>Are you sure you want to delete the task assigned to <strong>{task.assignedTo}</strong>?</p>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={handleCancelDelete}>No</button>
              <button className="confirm-button" onClick={handleConfirmDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
