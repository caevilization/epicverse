import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navigator.css";
import ScrollManager from "../utils/ScrollManager.ts";

const Navigator: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isInitialMount = useRef(true);
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

  // 处理页面切换时的滚动
  useEffect(() => {
    if (isInitialMount.current) {
      // 首次加载时滚动到顶部
      window.scrollTo(0, 0);
      isInitialMount.current = false;
    } else {
      // 从其他页面返回时，恢复之前的滚动位置
      const savedPosition = ScrollManager.getScrollPosition(location.pathname);
      window.scrollTo(0, savedPosition);
    }

    // 页面切换前保存当前滚动位置
    return () => {
      ScrollManager.saveScrollPosition(location.pathname);
    };
  }, [location.pathname]);

  // 修改导航点击处理函数
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const path = (e.currentTarget as HTMLAnchorElement).pathname;
    if (path !== location.pathname) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className={`navigator ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-content">
        <div className="nav-logo">
          <NavLink to="/">
            Create. Share. Earn.A world where your story becomes a masterpiece!
          </NavLink>
        </div>
        <div className="nav-links">
          <NavLink to="/" className="nav-link" end onClick={handleNavClick}>
            Home
          </NavLink>
          <NavLink to="/create" className="nav-link" onClick={handleNavClick}>
            Create
          </NavLink>
          <NavLink
            to="/adventure"
            className="nav-link"
            onClick={handleNavClick}
          >
            Adventure
          </NavLink>
          <NavLink to="/treasury" className="nav-link" onClick={handleNavClick}>
            Treasury
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigator;
