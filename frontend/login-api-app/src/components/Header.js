import React from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

function Header() {
  return (
    <BrowserRouter>
    <header>
      <ul className="menu">
      <Route to="/">Home</Route>
      <Route to="/private">Dashboard</Route>
      </ul>
    </header>
    </BrowserRouter>
    
  );
}

export default Header;