// src/App.jsx
import Navbar from './components/Navbar';
import Card from './components/Card';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import Pomodoro from './components/Pomodoro';
import './App.css';
import Weather from './components/weather';
import Quote from './components/Quote'; // Import the Quote component
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './ThemeToggle';


function App() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="cards-container">
        <Card title="Card 1" content="Daily Progress" />
        <Card title="Card 2" content="Upcoming Tasks" />
        <Card title="Card 3" content="Weather Snapshot" />
      </div>
      <ThemeProvider>
      <div>
        <h1>Theme Switcher Demo</h1>
        <ThemeToggle />
        <p>This text will change color based on the theme!</p>
      </div>
    </ThemeProvider>
      <div className="todo-container">
        <TodoList />
      </div>
      <div>
      <Pomodoro />
      <Weather />
      <Quote /> {/* Capitalized component name to follow convention */}
     </div>
      <div className="footer"><Footer /></div>
    </div>
  );
}

export default App;
