// src/components/Navbar.jsx
function Navbar() {
    return (
      <nav className="navbar">
        <h1>Welcome to My Dashboard</h1>
        <div className="links">
          <a href="/">Home</a> 
          
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/create" style={{
            color: "white",
            backgroundColor: "#f1356d",
            borderRadius: "8px"
          }}> New Blog</a>
        </div>
      </nav>
    );
  }
  
  export default Navbar;