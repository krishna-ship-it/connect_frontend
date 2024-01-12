import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../common/Modal";
import { apiEndpoints } from "./../config/api-config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Feed() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let toastId = null;
  const submitHandler = async () => {
    const formData = new FormData();
    if (text) formData.append("title", text);
    if (images) {
      const attachments = [];
      for (let i = 0; i < images.length; i++) attachments.push(images[i]);
      attachments.forEach((file, index) => {
        formData.append("attachments", file);
      });
    }
    setLoading(true);
    toastId = toast.loading("posting");
    try {
      const response = await fetch(
        `${apiEndpoints.postsEndpoints.CREATEPOST}`,
        {
          method: "POST",
          body: formData,
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      const result = await response.json();
      if (toastId) {
        toast.dismiss(toastId);
        toastId = null;
      }
      toast.success("posted");
      navigate(`/profile/${user.id}`);
    } catch (err) {
      if (toastId) {
        toast.dismiss(toastId);
        toastId = null;
      }
      toast.error(err.message);
    }
  };
  const textLimit = 500;
  return (
    <div className="feed_wrapper w-screen p-8">
      {isAuthenticated && (
        <div className="flex">
          <img
            src={user?.avatar_public_url}
            className="w-[50px] rounded-[50%]"
          />
          <button
            className="bg-purple-400 w-screen rounded-[25px] ml-2"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            CREATE POST
          </button>
          <Modal
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <div className="w-[320px] h-full">
              <textarea
                className="resize-none bg-transparent w-full  outline-none p-3
                border-purple-300 border-[1px]
                rounded-md
                min-h-[40vh]
                  placeholder:text-purple-100"
                placeholder="what do you want to talk about?"
                onChange={(e) => {
                  setText(e.target.value);
                }}
              ></textarea>
              {text.length > textLimit && (
                <div className="w-full text-red-950 flex justify-between items-center">
                  <p>You have exceed the maximum character limit</p>
                  <p>
                    {text.length}/{textLimit}
                  </p>
                </div>
              )}

              <div className="py-3">
                <label htmlFor="attachments" className="cursor-pointer">
                  <i className="fa-solid fa-image bg-purple-950 p-3 rounded-[50%]"></i>
                </label>
                <input
                  type="file"
                  name="attachments"
                  id="attachments"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setImages(e.target.files);
                  }}
                />
              </div>
              <div className="py-3 flex justify-end">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    submitHandler();
                    setIsOpen(false);
                  }}
                  className="cursor-pointer w-full h-full rounded-md p-1 bg-purple-500"
                >
                  Post
                </button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Feed;
