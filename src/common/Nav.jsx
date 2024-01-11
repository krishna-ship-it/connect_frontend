import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "../store/slices/user-slice";
import { INITIALSTATE as userInitialState } from "../store/slices/user-slice";
function Nav() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUserState(userInitialState));
    navigate("/");
  };
  let timeOutId = null;
  return (
    <nav className="p-3 flex justify-between items-center">
      <Link to={isAuthenticated ? "/feed" : "/login"}>
        <img src={logo} className="w-16" />
      </Link>
      <ul className="flex relative">
        {isAuthenticated ? (
          <>
            <Link
              to={`profile/${user.id}`}
              onMouseOver={(e) => {
                setShowOptions(true);
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                timeOutId = setTimeout(() => {
                  setShowOptions(false);
                  console.log("leave");
                }, 300);
              }}
            >
              <img
                src={user?.avatar_public_url}
                className="w-[35px] rounded-[50%]"
              />
            </Link>
            {showOptions && (
              <div
                className="absolute right-0 top-full  w-[200px] rounded-md  z-40 mt-2 cursor-pointer border-[1px] border-purple-500 bg-purple-700"
                onMouseOver={(e) => {
                  setShowOptions(true);
                  if (timeOutId) {
                    clearTimeout(timeOutId);
                    console.log("clearing timeout");
                  }
                }}
                onMouseLeave={(e) => {
                  e.preventDefault();
                  timeOutId = setTimeout(() => {
                    setShowOptions(false);
                    console.log("leave");
                  }, 300);
                }}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    logoutHandler();
                  }}
                  className="w-full py-1 hover:bg-purple-500"
                >
                  Logout
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    logoutHandler();
                  }}
                  className="w-full  py-1 hover:bg-purple-500"
                >
                  Friends
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <li className="mr-2 hover:text-purple-300">
              <Link to="login">LOGIN</Link>
            </li>
            <li className="mr-2 hover:text-purple-300">
              <Link to={"/signup"}>SIGNUP</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
