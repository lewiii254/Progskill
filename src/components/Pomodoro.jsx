import React, { useState, useEffect } from 'react';
import './Pomodoro.css'; // Assuming you'll add this CSS file

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('work');

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      if (phase === 'work') {
        setPhase('break');
        setTimeLeft(300);
      } else {
        setPhase('work');
        setTimeLeft(1500);
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft, phase]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setPhase('work');
    setTimeLeft(1500);
  };

  return (
    <div className="pomodoro-container">
      <h1 className="title">Pomodoro Timer</h1>
      <h2 className={`phase ${phase}`}>{phase === 'work' ? 'Work Session' : 'Break Time'}</h2>
      <div className="timer">{formatTime(timeLeft)}</div>
      <div className="button-group">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="btn start-btn"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          className="btn pause-btn"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="btn reset-btn"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;