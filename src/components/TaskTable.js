import React, { useState } from 'react';
import TaskModal from './TaskModal';
import DeleteModal from './DeleteModal';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './TaskTable.css';

const TaskTable = () => {
  const [tasks, setTasks] = useState([
    { id: 1, user: 'User 1', status: 'Completed', dueDate: '12/10/2024', priority: 'Low', comments: 'This task is good' },
    { id: 2, user: 'User 2', status: 'In Progress', dueDate: '14/09/2024', priority: 'High', comments: 'This task is good' },
    { id: 3, user: 'User 3', status: 'Not Started', dueDate: '18/08/2024', priority: 'Low', comments: 'This task is good' },
    { id: 4, user: 'User 4', status: 'In Progress', dueDate: '12/06/2024', priority: 'Normal', comments: 'This task is good' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  const handleAddTask = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = (task) => {
    setDeleteTask(task);
    setShowDeleteModal(true);
  };

  const saveTask = (newTask) => {
    if (selectedTask) {
      setTasks(tasks.map(task => (task.id === newTask.id ? newTask : task)));
    } else {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    }
    setShowModal(false);
  };

  const confirmDeleteTask = () => {
    setTasks(tasks.filter(task => task.id !== deleteTask.id));
    setShowDeleteModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTasks = tasks.filter(task =>
    task.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.comments.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <div className="task-table">
      <div className="table-header">
        <div className="task-count">
          <h4><FontAwesomeIcon icon={faBars} className="task-icon" />Tasks</h4>
          <h6>All Tasks</h6>
          <h5>({tasks.length} records)</h5>
        </div>
        <div className="table-actions">
  <button className="btn btn-primary" onClick={handleAddTask}>New Task</button>
  <button className="btn btn-primary" onClick={() => window.location.reload()}>Refresh</button>
</div>
      </div>

      <div className="search-wrapper">
  <input
    type="text"
    placeholder="Search"
    className="search-bar"
    value={searchTerm}
    onChange={handleSearchChange}
  />
</div>

      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map(task => (
            <tr key={task.id}>
              <td><input type="checkbox" /></td>
              <td>{task.user}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-basic">
                    <i className="dropdown-icon" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEditTask(task)} className="dropdown-item">Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteTask(task)} className="dropdown-item">Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)}><FaArrowUp /> First</button>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><FaArrowLeft /> Prev</button>
        <span>{currentPage}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}><FaArrowRight /> Next</button>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}><FaArrowDown /> Last</button>
      </div>

      {showModal && <TaskModal task={selectedTask} onSave={saveTask} onClose={() => setShowModal(false)} />}
      {showDeleteModal && <DeleteModal task={deleteTask} onDelete={confirmDeleteTask} onClose={() => setShowDeleteModal(false)} />}
    </div>
  );
};

export default TaskTable;
