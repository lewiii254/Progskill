// src/components/Card.jsx
function Card({ title, content }) {
    return (
      <div className="card">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    );
  }
  
  export default Card;