import React, { useState, useEffect } from 'react';
import TaskList from './tasks/TaskList';
import TaskForm from './tasks/TaskForm';
import Modal from './tasks/Modal';
import { getTasks, addTask, editTask, deleteTask } from './api';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const tasksFromServer = await getTasks();
    setTasks(tasksFromServer);
  };

  const handleNewTask = () => {
    setIsEditing(false);
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleAddTask = async (task) => {
    const newTask = await addTask(task);
    setTasks([...tasks, newTask]);
    handleModalClose();
  };

  const handleEditTask = async (id, updatedTask) => {
    const editedTask = await editTask(id, updatedTask);
    setTasks(tasks.map(task => (task._id === id ? editedTask : task)));
    handleModalClose();
  };

  const handleDeleteClick = async (task) => {
    await deleteTask(task._id);
    setTasks(tasks.filter(t => t._id !== task._id));
  };

  return (
    <div>
      <TaskList 
        tasks={tasks} 
        onEditClick={handleEditClick} 
        onDeleteClick={handleDeleteClick} 
        onNewTask={handleNewTask} 
      />
      
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <TaskForm 
          onAddTask={handleAddTask} 
          onEditTask={handleEditTask} 
          editingTask={currentTask} 
          onCancel={handleModalClose} 
        />
      </Modal>
    </div>
  );
};

export default App;
