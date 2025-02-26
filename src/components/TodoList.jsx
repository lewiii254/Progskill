import React, { useState, useEffect } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error parsing tasks from localStorage:', error);
      return [];
    }
  });

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = { text: newTask, completed: false };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Define styles with dope colors
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    background: '#2d3748', // Deep slate gray
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)' // Purple neon shadow
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#00bcd4', // Bright cyan
    marginBottom: '20px'
  };

  const inputContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  };

  const inputStyle = {
    flex: '1',
    padding: '10px',
    border: '1px solid #8b5cf6', // Purple border
    borderRadius: '5px',
    background: '#4b5563', // Dark gray input background
    color: '#ffffff' // White text
  };

  const addButtonStyle = {
    padding: '10px 20px',
    background: '#8b5cf6', // Vibrant purple
    color: '#ffffff', // White text
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const listStyle = {
    listStyle: 'none',
    padding: '0'
  };

  const taskItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    marginBottom: '10px',
    background: '#ffffff', // White background for tasks
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 188, 212, 0.3)' // Cyan glow
  };

  const taskStyle = {
    flex: '1',
    color: '#ffffff' // White text on dark container
  };

  const completedTaskStyle = {
    ...taskStyle,
    textDecoration: 'line-through',
    color: '#10b981' // Neon green for completed
  };

  const deleteButtonStyle = {
    padding: '5px 10px',
    background: '#ec4899', // Hot pink
    color: '#ffffff', // White text
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Todo List</h1>
      <div style={inputContainerStyle}>
        <input
          style={inputStyle}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button style={addButtonStyle} onClick={addTask}>Add Task</button>
      </div>
      <ul style={listStyle}>
        {tasks.map((task, index) => (
          <li key={index} style={taskItemStyle}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(index)}
            />
            <span style={task.completed ? completedTaskStyle : taskStyle}>
              {task.text}
            </span>
            <button style={deleteButtonStyle} onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;