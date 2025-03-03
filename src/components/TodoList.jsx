// App.jsx (or combined component file)
import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoListWithStreak() {
  // TodoList State
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

  // Streak State
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  // Load initial data
  useEffect(() => {
    // Load tasks
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Load streaks
    const savedCurrent = parseInt(localStorage.getItem('currentStreak')) || 0;
    const savedLongest = parseInt(localStorage.getItem('longestStreak')) || 0;
    setCurrentStreak(savedCurrent);
    setLongestStreak(savedLongest);

    const lastCompletion = localStorage.getItem('lastCompletionDate');
    const today = new Date().toDateString();
    setIsTaskCompleted(lastCompletion === today);
  }, [tasks]);

  // Check if all tasks are completed
  const allTasksCompleted = tasks.length > 0 && tasks.every(task => task.completed);

  // Handle streak update when all tasks are completed
  const updateStreak = () => {
    if (allTasksCompleted && !isTaskCompleted) {
      const today = new Date();
      const lastCompletion = localStorage.getItem('lastCompletionDate');
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      let newStreak = currentStreak;

      if (lastCompletion === yesterday.toDateString()) {
        newStreak = currentStreak + 1;
      } else if (!lastCompletion || lastCompletion !== today.toDateString()) {
        newStreak = 1;
      }

      setCurrentStreak(newStreak);
      setIsTaskCompleted(true);
      
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }

      localStorage.setItem('currentStreak', newStreak);
      localStorage.setItem('longestStreak', longestStreak > newStreak ? longestStreak : newStreak);
      localStorage.setItem('lastCompletionDate', today.toDateString());
    }
  };

  // TodoList Functions
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    updateStreak(); // Check streak after toggling
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Streak Visualization
  const renderStreakVisual = () => {
    const streakArray = Array(longestStreak).fill('🔥');
    return streakArray.map((fire, index) => (
      <span key={index} className={index < currentStreak ? 'active' : 'inactive'}>
        {fire}
      </span>
    ));
  };

  // Styles (combining both components' styles)
  const containerStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    background: '#2d3748',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)'
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#00bcd4',
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
    border: '1px solid #8b5cf6',
    borderRadius: '5px',
    background: '#4b5563',
    color: '#ffffff'
  };

  const addButtonStyle = {
    padding: '10px 20px',
    background: '#8b5cf6',
    color: '#ffffff',
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
    background: '#ffffff',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 188, 212, 0.3)'
  };

  const taskStyle = {
    flex: '1',
    color: '#111111'
  };

  const completedTaskStyle = {
    ...taskStyle,
    textDecoration: 'line-through',
    color: '#10b981'
  };

  const deleteButtonStyle = {
    padding: '5px 10px',
    background: '#ec4899',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>✨Todo List with Streak</h1>
      
      {/* Todo List Section */}
      <div style={inputContainerStyle}>
        <input
          style={inputStyle}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button style={addButtonStyle} onClick={addTask}>Add Task🧾</button>
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

      {/* Streak Section */}
      <div className="streak-section">
        <h2 style={{...headingStyle, fontSize: '20px'}}>Productivity Streak</h2>
        <div className="streak-display">
          <p>Current Streak: {currentStreak} day{currentStreak !== 1 ? 's' : ''}</p>
          <p>Longest Streak: {longestStreak} day{longestStreak !== 1 ? 's' : ''}</p>
          <div className="streak-visual">{renderStreakVisual()}</div>
          {allTasksCompleted && isTaskCompleted && (
            <p className="points">+60 Points Earned Today!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoListWithStreak;