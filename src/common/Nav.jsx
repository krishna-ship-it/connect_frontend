import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setUserState } from "../store/slices/user-slice";
import { INITIALSTATE as userInitialState } from "../store/slices/user-slice";
import { apiEndpoints } from "../config/api-config";
function Nav() {
  const [name, setName] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [showOptions, setShowOptions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUserState(userInitialState));
    navigate("/");
  };
  const searchHandler = async (name) => {
    if (name.length === 0) return setSearchResults([]);
    try {
      console.log("called with ", name);
      const response = await fetch(
        `${apiEndpoints.userAuthEndpoints.GETALLUSER}/?name=${name}&result_per_page=5`,
        {
          method: "GET",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setSearchResults(data.users);
    } catch (err) {
      console.log(err);
    }
  };
  let timeOutId = null;
  useEffect(() => {
    const timerID = setTimeout(() => {
      searchHandler(name);
    }, 1000);
    return () => {
      console.log("clearing = >", timerID);
      clearInterval(timerID);
    };
  }, [name]);
  return (
    <nav className="p-3 flex justify-between items-center h-[60px]">
      <Link to={isAuthenticated ? "/feed" : "/login"}>
        <img src={logo} className="w-16" />
      </Link>
      <ul className="flex relative">
        {isAuthenticated ? (
          <div className="flex items-center">
            <form
              className="mr-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                placeholder="search"
                className="border-[1px] border-purple-300 p-1 rounded-md outline-none"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />

              <button type="submit" className="hidden"></button>
            </form>
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
          </div>
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
      {isAuthenticated && searchResults.length > 0 && (
        <div className="absolute right-0 top-[60px]  w-screen rounded-md  z-40 mt-2 cursor-pointer border-[1px] left-[0]  border-purple-500 bg-purple-700 ">
          {searchResults.map((res) => (
            <div
              onClick={(e) => {
                e.preventDefault();
                navigate(`/profile/${res.id}`);
                setSearchResults([]);
                setName("");
              }}
              className="p-2 results flex my-1 hover:bg-purple-400"
            >
              <span
                className="block cursor-pointer px-2 py-1 
                    w-[100%] rounded-md "
              >
                {res.id === user.id ? "You" : res.name}
              </span>
              <img
                src={res.avatar_public_url}
                className="w-[35px] h-[35px] rounded-[50%]"
              />
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Nav;
