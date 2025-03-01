import { useState, useEffect } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState({ content: '', author: '' });

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      setQuote({ content: data.content, author: data.author });
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({ content: 'Keep going, even when it’s tough.', author: 'Unknown' });
    }
  };

  useEffect(() => {
    fetchQuote();
    const interval = setInterval(() => {
      fetchQuote();
    }, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '24px',
  };

  const hrStyle = {
    border: 'none',
    height: '1px',
    background: '#7f8c8d',
    margin: '20px 0',
    opacity: '0.3',
  };

  const quoteStyle = {
    color: '#34495e',
    fontSize: '20px',
    lineHeight: '1.5',
    margin: '0',
    fontStyle: 'italic',
  };

  const authorStyle = {
    color: '#7f8c8d',
    fontSize: '16px',
    margin: '15px 0 25px',
    fontWeight: '500',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Quote of the Day</h2>
      <hr style={hrStyle} />
      <p style={quoteStyle}>"{quote.content}"</p>
      <p style={authorStyle}>— {quote.author}</p>
      <button 
        style={buttonStyle}
        onClick={fetchQuote}
        onMouseOver={e => e.target.style.backgroundColor = '#2980b9'}
        onMouseOut={e => e.target.style.backgroundColor = '#3498db'}
      >
        New Quote
      </button>
    </div>
  );
};

export default Quote;  // Must be at the top level, outside the component