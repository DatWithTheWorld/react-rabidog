import React from "react";
import { Link } from "react-router-dom"; // Sử dụng Link để chuyển trang

const Header = () => (
  <header className="header">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/others">Others</Link></li>
    </ul>
  </header>
);

export default Header;
