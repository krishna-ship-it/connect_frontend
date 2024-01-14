import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiEndpoints } from "../config/api-config";

function Friends() {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    if (!isAuthenticated) return navigate("/login");
    const fetchFriends = async () => {
      try {
        const response = await fetch(
          `${apiEndpoints.friendsEndpoints.GETFRIENDS}/${user_id}`,
          {
            method: "get",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );

        const data = await response.json();
        setFriends([...data.friend_list]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFriends();
  }, [user_id]);
  console.log(friends);
  return (
    <div className="friends">
      {friends.length === 0
        ? "you have no friends :("
        : friends.map((friend) => {
            return (
              <div className="flex items-center p-3">
                <img
                  src={friend.avatar_public_url}
                  className="w-[50px] h-[50px] rounded-[50%]"
                />
                <Link to={`/profile/${friend.id}`}>{friend.name}</Link>
              </div>
            );
          })}
    </div>
  );
}

export default Friends;
