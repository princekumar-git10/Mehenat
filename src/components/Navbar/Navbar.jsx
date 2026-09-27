import "./Navbar.css";

function Navbar({ onAuthClick }) {
  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">

        <span className="logo-dot"></span>

        <span className="logo-text">
          PRINCE
        </span>

      </div>


      {/* Navigation */}
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

    </nav>
  );
}

export default Navbar;