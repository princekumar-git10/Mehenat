import { useState } from "react";
import "./Navbar.css";

function Navbar({ onAuthClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">

        <span className="logo-dot"></span>

        <span className="logo-text">
          PRINCE
        </span>

      </div>


      {/* Desktop Navigation */}
      <div className="navbar-links">

        <a
          href="#home"
          className="nav-link active"
        >
          Home
        </a>

        <a
          href="#about"
          className="nav-link"
        >
          About
        </a>

        <a
          href="#projects"
          className="nav-link"
        >
          Projects
        </a>

        <a
          href="#skills"
          className="nav-link"
        >
          Skills
        </a>

        <a
          href="#contact"
          className="nav-link"
        >
          Contact
        </a>

      </div>


      {/* Let's Talk */}
      <div className="navbar-right">

        <button
          className="nav-connect"
          onClick={onAuthClick}
        >
          Let's Talk

          <span className="arrow">
            ↗
          </span>
        </button>

      </div>


      {/* Mobile Menu Button */}
      <button
        className={`mobile-menu-btn ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>


      {/* Mobile Navigation */}
      <div className={`mobile-navbar-links ${menuOpen ? "show" : ""}`}>

        <a
          href="#home"
          className="nav-link active"
          onClick={closeMenu}
        >
          Home
        </a>

        <a
          href="#about"
          className="nav-link"
          onClick={closeMenu}
        >
          About
        </a>

        <a
          href="#projects"
          className="nav-link"
          onClick={closeMenu}
        >
          Projects
        </a>

        <a
          href="#skills"
          className="nav-link"
          onClick={closeMenu}
        >
          Skills
        </a>

        <a
          href="#contact"
          className="nav-link"
          onClick={closeMenu}
        >
          Contact
        </a>

        <button
          className="mobile-nav-connect"
          onClick={() => {
            closeMenu();
            onAuthClick();
          }}
        >
          Let's Talk
          <span className="arrow">↗</span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;