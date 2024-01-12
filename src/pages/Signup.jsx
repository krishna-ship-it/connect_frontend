import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, signupThunk } from "../store/slices/user-slice";
import { isEmail } from "../helper/input-validation";
import toast from "react-hot-toast";
import Modal from "../common/Modal";
import Crop from "../common/Crop";
import { useNavigate } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const submitHandler = () => {
    if (!userData.name) return toast.error("name is required");
    if (!isEmail(userData.email)) return toast.error("incorrect email format");
    if (!userData.password) return toast.error("password is required");
    if (!croppedImage) return toast.error("profile picture is required");
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", croppedImage);

    dispatch(
      signupThunk(formData, (page) => {
        navigate(`${page}`);
      })
    );
  };

  useEffect(() => {
    if (userImage) setIsOpen(true);
  }, [userImage]);
  return (
    <div className="signup_wrapper w-screen p-5 flex justify-center items-center">
      <div className="signup_inner flex flex-col w-11/12">
        <form
          className="flex flex-col items-center w-full"
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <div className="h-[150px] w-[150px] bg-gray-300 self-start rounded-[50%] relative">
            <input
              className="hidden"
              name="user_image"
              id="user_image"
              type="file"
              onChange={(e) => {
                setUserImage(e.target.files);
              }}
            />
            {croppedImage && (
              <img
                src={URL.createObjectURL(croppedImage)}
                className="w-full rounded-[50%]"
              />
            )}
            <label htmlFor="user_image">
              <i className="fa-solid fa-image bg-purple-950 p-3 rounded-[50%] absolute top-[80%] right-[1%] cursor-pointer"></i>
            </label>
            {/* recrop icon */}
            {croppedImage && (
              <i
                className="fa-solid fa-pen bg-purple-950 p-3 rounded-[50%] absolute top-[58%] right-[-15%] cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(true);
                }}
              ></i>
            )}
          </div>
          <div className="name_wrapper flex flex-col mb-2 w-full">
            <label>Name</label>
            <input
              className=" border rounded-md border-purple-400 outline-none px-4 py-2 "
              onChange={(e) => {
                setUserData({ ...userData, name: e.target.value });
              }}
            />
          </div>
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
              SIGNUP
            </button>
          </div>
          <Modal
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <Crop
              sourceImage={userImage}
              setCroppedImage={() => {
                return (img) => {
                  setCroppedImage(img);
                };
              }}
            />
            <div className="pt-2 w-full h-full">
              <button
                className="cursor-pointer w-full h-full rounded-md p-1 bg-purple-500"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
              >
                OK
              </button>
            </div>
          </Modal>
        </form>
      </div>
    </div>
  );
}

export default Signup;
