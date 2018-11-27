import React from "react";
import { NavLink } from "react-router-dom";

export default function SideNav() {
  return (
    <div>
      <div className="sidenav">
        <div className="user-el">
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
    </div>
  );
}
