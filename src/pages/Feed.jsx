import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../common/Modal";

function Feed() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  //   console.log(user);
  const [isOpen, setIsOpen] = useState(false);
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
            <div className="w-full h-full">
              <textarea
                className="resize-none bg-transparent w-full  outline-none p-3
                border-purple-300 border-[1px]
                rounded-md
                  placeholder:text-white"
                placeholder="what do you want to talk about?"
              ></textarea>
              <input type="file" />
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Feed;
