import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { FaBars, FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './TaskList.css';

const TaskList = ({ tasks, onEditClick, onDeleteClick, onNewTask }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const itemsPerPage = 5; 

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter(task =>
    task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  // Get current tasks to display
  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleSelectTask = (task) => {
    setSelectedTasks(prevSelected => {
      if (prevSelected.includes(task._id)) {
        return prevSelected.filter(id => id !== task._id);
      } else {
        return [...prevSelected, task._id];
      }
    });
  };

  const handleDeleteSelected = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    selectedTasks.forEach(taskId => {
      const taskToDelete = tasks.find(task => task._id === taskId);
      if (taskToDelete) {
        onDeleteClick(taskToDelete);
      }
    });
    setSelectedTasks([]);
    setShowConfirmDelete(false);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div className="task-list">
      <div className="task-header-container">
        <h4 className="task-header">
          <FaBars className="task-icon" /> Tasks
        </h4>
        <div className="action-buttons">
          <button className="new-task-button" onClick={onNewTask}>New Task</button>
          <button className="refresh-button" onClick={() => window.location.reload()}>Refresh</button>
        </div>
      </div>

      <div className="button-container">
        <div className="header-info">
          <h6>All Tasks</h6>
          <h5>({tasks.length} records)</h5>
        </div>
        <input 
          type="text" 
          placeholder="Search by Assigned To..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="search-bar"
        />
      </div>

      <table className="task-item-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Assigned To</th>
            <th>Status</th> 
            <th>Due Date</th>
            <th>Priority</th>
           
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              onSelect={handleSelectTask}
              isSelected={selectedTasks.includes(task._id)}
            />
          ))}
        </tbody>
      </table>

      <button 
        className="delete-selected-button" 
        onClick={handleDeleteSelected} 
        disabled={selectedTasks.length === 0}
      >
        Delete Selected
      </button>

      <div className="pagination">
  <button 
    disabled={currentPage === 1} 
    onClick={() => setCurrentPage(1)}
  >
    <FaArrowUp /> First
  </button>
  
  <button 
    disabled={currentPage === 1} 
    onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}  // Ensures it doesn't go below 1
  >
    <FaArrowLeft /> Prev
  </button>
  
  <span>{currentPage}</span>
  
  <button 
    disabled={currentPage === totalPages} 
    onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}  // Ensures it doesn't go beyond total pages
  >
    <FaArrowRight /> Next
  </button>
  
  <button 
    disabled={currentPage === totalPages} 
    onClick={() => setCurrentPage(totalPages)}
  >
    <FaArrowDown /> Last
  </button>
</div>


      {showConfirmDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete</h3>
            <p>Are you sure you want to delete the selected tasks?</p>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={cancelDelete}>No</button>
              <button className="confirm-button" onClick={confirmDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
