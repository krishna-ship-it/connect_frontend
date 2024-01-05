import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (!isAuthenticated) return navigate("/login");
  return (
    <div className="profile_wrapper w-screen p-8">
      <div className="profile_intro flex flex-col justify-center items-center ">
        <img
          src={user?.avatar_public_url}
          className="rounded-[50%] w-[100px]"
        />
        <h1 className="text-2xl text-purple-400 text-justify">{user?.name}</h1>
        <div className=""></div>
      </div>
    </div>
  );
}

export default Profile;
