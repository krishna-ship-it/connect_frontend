import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiEndpoints } from "../config/api-config";
import PostCardSkeleton from "./../common/PostCardSkeleton";
import PostCard from "./../common/PostCard";
import { useSelector } from "react-redux";
const ProfileHeaderSkeleton = () => {
  const skeletons = Array(15).fill(1);
  return (
    <div className="profile_skeleton_wrapper p-3">
      <div className="flex flex-col justify-center items-center">
        <div
          className={
            "bg-purple-300 w-[100px] h-[100px] rounded-[50%] animate-pulse"
          }
        ></div>
        <div className="h-[20px] w-[180px] bg-purple-300 animate-pulse rounded-md mt-2"></div>
        <div className="h-[20px] w-[180px] bg-purple-300 animate-pulse rounded-md mt-2"></div>
      </div>
      <div className="flex items-center flex-col">
        {skeletons.map((s, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

function Profile() {
  const [profile, setProfile] = useState(null);
  const [alreadyFriends, setAlreadyFriends] = useState(false);
  const [alreadySentRequest, setAlreadySentRequest] = useState(null);
  const { user_id } = useParams();
  const [profilePictureLoaded, setProfilePictureLoaded] = useState(false);
  const [deletedPosts, setDeletedPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const deletePostHandler = (id) => {
    setDeletedPost((pre) => [...pre, id]);
  };
  const sendRequest = async (to) => {
    try {
      const response = await fetch(
        `${apiEndpoints.friendsEndpoints.SENDREQUEST}/${to}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setAlreadySentRequest(data.requestId);
    } catch (err) {
      console.log(err);
    }
  };
  const withdrawRequest = async () => {
    try {
      console.log("withdrawing request ", alreadySentRequest);
      const response = await fetch(
        `${apiEndpoints.friendsEndpoints.WITHDRAWREQUEST}/${alreadySentRequest}`,
        {
          method: "delete",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log("request withdrawed");
      setAlreadySentRequest(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${apiEndpoints.userAuthEndpoints.GETUSERBYID}/${user_id}`,
          {
            method: "GET",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setProfile((pre) => {
          return { ...pre, user: data.user };
        });
      } catch (err) {
        console.log(err);
      }
    };
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

        setProfile((pre) => {
          return { ...pre, friends: data };
        });
      } catch (err) {}
    };
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${apiEndpoints.postsEndpoints.GETPOSTS}/${user_id}/?page_no=1`,
          {
            method: "GET",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setProfile((pre) => {
          return { ...pre, posts: data };
        });
      } catch (err) {
        console.log(err);
      }
    };
    const getFriendShipStatus = async () => {
      try {
        const response = await fetch(
          `${apiEndpoints.friendsEndpoints.GETFRIENDSHIPSTATUS}/${user?.id}/${user_id}`,
          {
            method: "get",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setAlreadyFriends(data.friends);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    const getRequestStatus = async () => {
      try {
        const response = await fetch(
          `${apiEndpoints.friendsEndpoints.GETREQUESTSTATUS}/${user_id}`,
          {
            method: "get",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setAlreadySentRequest(data.requestId);
        }
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    const init = async () => {
      try {
        setLoading(true);
        await fetchUser();
        await fetchFriends();
        await fetchPosts();
        await getFriendShipStatus();
        await getRequestStatus();
        setLoading(false);
        console.log("comple");
      } catch (err) {}
    };
    if (!isAuthenticated) return;
    init();
  }, [user_id, user]);

  return loading ? (
    <ProfileHeaderSkeleton />
  ) : (
    <>
      <div className="profile_wrapper w-screen p-8 flex flex-col items-center justify-center">
        {/* profile header */}
        <div className="profile_intro flex flex-col justify-center items-center">
          <div
            className={
              profilePictureLoaded
                ? "bg-purple-300 w-[100px] rounded-[50%]"
                : "bg-purple-300 w-[100px] rounded-[50%] animate-pulse"
            }
          >
            <img
              src={profile?.user?.avatar_public_url}
              className={
                profilePictureLoaded
                  ? "rounded-[50%] w-[100px] opacity-1"
                  : "rounded-[50%] w-[100px] opacity-0"
              }
              onLoad={(e) => {
                setTimeout(() => {
                  setProfilePictureLoaded(true);
                }, 1000);
              }}
            />
          </div>
          <h1 className="text-2xl text-purple-400 text-justify">
            {profile?.user?.name}
          </h1>
          <Link to={`/friends/${profile?.user?.id}`}>
            {profile?.friends?.totalFriends} Friends
          </Link>
          {user?.id != user_id && !alreadyFriends && !alreadySentRequest && (
            <button
              className="bg-purple-500 px-2 py-1 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                sendRequest(user_id);
              }}
            >
              Add Friend
            </button>
          )}
          {alreadySentRequest && (
            <button
              className="bg-purple-500 px-2 py-1 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                if (alreadySentRequest) withdrawRequest();
              }}
            >
              Withdraw Request
            </button>
          )}
        </div>
        {profile?.posts?.posts && (
          <div className="posts">
            {profile?.posts?.posts.length > 0 ? (
              profile?.posts?.posts.map((post) => {
                if (!deletedPosts?.includes(post.id)) {
                  return (
                    <PostCard
                      post={post}
                      author={profile.posts.author_details}
                      key={post.id}
                      onDelete={() => {
                        deletePostHandler(post.id);
                      }}
                    />
                  );
                }
              })
            ) : (
              <p className="text-red-400 text-2xl">No posts.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
