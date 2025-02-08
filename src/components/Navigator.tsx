import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navigator.css";

const Navigator: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // 清理事件监听
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navigator ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-content">
        <div className="nav-logo">
          <NavLink to="/">
            Create. Share. Earn.A world where your story becomes a masterpiece!
          </NavLink>
        </div>
        <div className="nav-links">
          <NavLink to="/" className="nav-link" end>
            Home
          </NavLink>
          <NavLink to="/create" className="nav-link">
            Create
          </NavLink>
          <NavLink to="/adventure" className="nav-link">
            Adventure
          </NavLink>
          <NavLink to="/treasury" className="nav-link">
            Treasury
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigator;
