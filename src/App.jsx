// src/App.jsx
import Navbar from './components/Navbar';
import Card from './components/Card';
import Footer from './components/Footer';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="todo-container">
        <TodoList />
      </div>
      <div className="cards-container">
        <Card title="Card 1" content="This is the first card." />
        <Card title="Card 2" content="This is the second card." />
        <Card title="Card 3" content="This is the third card." />
      </div>
     
      <div className="footer"><Footer /></div>
    </div>
  );
}

export default App;
