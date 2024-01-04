import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";
import { useSelector } from "react-redux";

function Nav() {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <nav className="p-3 flex justify-between items-center">
      <Link to="/">
        <img src={logo} className="w-16" />
      </Link>
      <ul className="flex">
        {isAuthenticated ? (
          <>
            <Link>Notifications</Link>
          </>
        ) : (
          <>
            <li className="mr-2 hover:text-purple-300">
              <Link to="login">LOGIN</Link>
            </li>
            <li className="mr-2 hover:text-purple-300">
              <Link>SIGNUP</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
