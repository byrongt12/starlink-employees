import "./Navbar.css"

// Navbar.js
export default function Navbar() {
    return (
      <nav className="navigation">
        <a href="/" className="brand-name">
          StarLink
        </a>
        <a className="subtitle">
          Employees
        </a>
      </nav>
    );
  }