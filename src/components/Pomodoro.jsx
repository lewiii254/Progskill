import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false); // Timer running status
  const [phase, setPhase] = useState('work'); // 'work' or 'break'

  useEffect(() => {
    console.log('useEffect triggered:', { isRunning, timeLeft, phase }); // Debug log
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        console.log('Timer ticking:', timeLeft - 1); // Debug timer
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      console.log('Switching phase from', phase); // Debug phase switch
      if (phase === 'work') {
        setPhase('break');
        setTimeLeft(300); // 5-minute break
      } else {
        setPhase('work');
        setTimeLeft(1500); // Back to 25-minute work
      }
    }
    return () => {
      if (timer) clearTimeout(timer); // Cleanup
    };
  }, [isRunning, timeLeft, phase]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    console.log('Start clicked'); // Debug button
    setIsRunning(true);
  };

  const handlePause = () => {
    console.log('Pause clicked'); // Debug button
    setIsRunning(false);
  };

  const handleReset = () => {
    console.log('Reset clicked'); // Debug button
    setIsRunning(false);
    setPhase('work');
    setTimeLeft(1500);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Pomodoro Timer</h1>
      <h2>{phase === 'work' ? 'Work Session' : 'Break Time'}</h2>
      <div style={{ fontSize: '48px', margin: '20px' }}>
        {formatTime(timeLeft)}
      </div>
      <div>
        <button
          onClick={handleStart}
          disabled={isRunning}
          style={{ margin: '0 10px', padding: '10px 20px' }}
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          style={{ margin: '0 10px', padding: '10px 20px' }}
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          style={{ margin: '0 10px', padding: '10px 20px' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;