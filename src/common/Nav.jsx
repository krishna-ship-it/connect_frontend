import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";
import { useSelector } from "react-redux";

function Nav() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <nav className="p-3 flex justify-between items-center">
      <Link to={isAuthenticated ? "/feed" : "/login"}>
        <img src={logo} className="w-16" />
      </Link>
      <ul className="flex">
        {isAuthenticated ? (
          <>
            <Link to={`profile/${user.id}`}>
              <img
                src={user?.avatar_public_url}
                className="w-[35px] rounded-[50%]"
              />
            </Link>
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
