import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../store/slices/user-slice";
import { isEmail } from "../helper/input-validation";
import toast from "react-hot-toast";
import Modal from "../common/Modal";
import Crop from "../common/Crop";

function Signup() {
  console.log("signup");
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userImage, setUserImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const submitHandler = () => {
    if (!isEmail(userData.email)) return toast.error("incorrect email format");
    if (!userData.password) return toast.error("password is required");
    dispatch(loginThunk(userData));
  };
  const [croppedImage, setCroppedImage] = useState(null);
  useEffect(() => {
    if (userImage) setIsOpen(true);
  }, [userImage]);
  console.log(userImage);
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
          <div className="h-[250px] w-[250px] bg-gray-300 self-start rounded-[50%] relative">
            <input
              className="hidden"
              name="user_image"
              id="user_image"
              type="file"
              onChange={(e) => {
                setUserImage(URL.createObjectURL(e.target.files[0]));
              }}
            />

            <label htmlFor="user_image">
              <i className="fa-solid fa-image bg-purple-950 p-3 rounded-[50%] absolute top-[80%] right-[1%] cursor-pointer"></i>
            </label>
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
              LOGIN
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
          </Modal>
        </form>
      </div>
    </div>
  );
}

export default Signup;
