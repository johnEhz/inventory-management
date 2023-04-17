import React, { useState } from "react";
import type { NavigationLink } from "../types";
import { NavLink } from "react-router-dom";
import links from "../data/navigationLinks";

const Navigation = () => {

  return (
    <div>
      <nav>
        <ul>
          {links.map((link, idx) => (
            <li key={idx}>
              <NavLink className={(navData) => (navData.isActive ? 'bg-red-300': 'bg-transparent')} to={link.route}>{link.name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
