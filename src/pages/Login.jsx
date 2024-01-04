import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../store/slices/user-slice";
import { isEmail } from "../helper/input-validation";
import toast from "react-hot-toast";
import stateStatus from "../helper/state-status";

function Login() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ email: "", password: "" });

  const submitHandler = () => {
    if (!isEmail(userData.email)) return toast.error("incorrect email format");
    if (!userData.password) return toast.error("password is required");
    dispatch(loginThunk(userData));
  };

  return (
    <div className="login_wrapper w-screen p-5 flex justify-center items-center">
      <div className="login_inner flex flex-col w-11/12">
        <form
          className="flex flex-col items-center w-full"
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <div className="email_wrapper flex flex-col mb-2 w-full">
            <label>Email</label>
            <input
              className=" border rounded-md border-purple-400 outline-none px-4 py-2 "
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
          </div>

          <div className="password_wrapper flex flex-col mb-3 w-full">
            <label>Password</label>
            <input
              className="border rounded-md border-purple-400 border-double outline-none px-4 py-2 "
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
          </div>

          <div className="login_button_wrapper flex justify-center items-center w-full">
            <button
              className="bg-purple-400  w-full rounded-md p-2"
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
