import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiEndpoints } from "../config/api-config";
import PostCardSkeleton from "./../common/PostCardSkeleton";
import PostCard from "./../common/PostCard";
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
  const { user_id } = useParams();
  const [profilePictureLoaded, setProfilePictureLoaded] = useState(false);
  const [deletedPosts, setDeletedPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const deletePostHandler = (id) => {
    setDeletedPost((pre) => [...pre, id]);
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
    const init = async () => {
      try {
        setLoading(true);
        await fetchUser();
        await fetchFriends();
        await fetchPosts();
        setLoading(false);
        console.log("comple");
      } catch (err) {}
    };
    init();
  }, [user_id]);
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
