import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiEndpoints } from "./../config/api-config";
import PostCard from "../common/PostCard";
import PostCardSkeleton from "../common/PostCardSkeleton";
import Modal from "../common/Modal";
function Profile() {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [friendsCount, setFriendsCount] = useState(0);
  const [profilePictureLoaded, setProfilePictureLoaded] = useState(false);
  const [deletedPosts, setDeletedPost] = useState([]);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const params = useParams();
  const { user_id } = params;
  const navigate = useNavigate();
  const skeletons = Array(25).fill(0);
  useEffect(() => {
    if (!isAuthenticated) return navigate("/login");
    const fetchPosts = async () => {
      setLoading(true);
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
        console.log(data);
        setPosts(data.posts);
        setAuthor(data.author_details);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [user_id]);

  useEffect(() => {
    if (!isAuthenticated) return navigate("/login");
    const fetchFriends = async () => {
      try {
        const response = await fetch(
          `${apiEndpoints.friendsEndpoints.GETFRIENDS}/${user.id}`,
          {
            method: "get",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setFriendsCount(data.totalFriends);
      } catch (err) {}
    };
    fetchFriends();
  }, []);

  const deletePostHandler = (id) => {
    setDeletedPost((pre) => [...pre, id]);
  };
  return (
    <div className="profile_wrapper w-screen p-8">
      <div className="profile_intro flex flex-col justify-center items-center">
        <div
          className={
            profilePictureLoaded
              ? "bg-purple-300 w-[100px] rounded-[50%]"
              : "bg-purple-300 w-[100px] rounded-[50%] animate-pulse"
          }
        >
          <img
            src={user?.avatar_public_url}
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
        <h1 className="text-2xl text-purple-400 text-justify">{user?.name}</h1>
        <Link to={`/friends/${user.id}`}>{friendsCount} Friends</Link>
        {loading ? (
          skeletons.map((s, i) => <PostCardSkeleton key={i} />)
        ) : posts ? (
          <div className="posts">
            {posts?.length > 0 ? (
              posts?.map((post) => {
                if (!deletedPosts?.includes(post.id)) {
                  return (
                    <PostCard
                      post={post}
                      author={author}
                      key={post.id}
                      onDelete={() => {
                        deletePostHandler(post.id);
                      }}
                    />
                  );
                }
              })
            ) : (
              <p>You have not posted anything</p>
            )}
          </div>
        ) : (
          "<h1>You have not posted anything</h1>"
        )}
      </div>
    </div>
  );
}

export default Profile;
