import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        🎙️ <span>Telugu Transcriber</span>
      </div>
      <div className="navbar-links">
        <Link to="/"        className={pathname === "/"        ? "active" : ""}>Transcribe</Link>
        <Link to="/history" className={pathname === "/history" ? "active" : ""}>History</Link>
      </div>
    </nav>
  );
}

export default Navbar;
