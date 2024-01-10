import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { apiEndpoints } from "./../config/api-config";
import PostCard from "../common/PostCard";
function Profile() {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState(null);
  const params = useParams();
  const { user_id } = params;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) return navigate("/login");
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
        console.log(data);
        setPosts(data.posts);
        setAuthor(data.author_details);
        // console.log(author);
        console.log(posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [user_id]);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <div className="profile_wrapper w-screen p-8">
      <div className="profile_intro flex flex-col justify-center items-center ">
        <img
          src={user?.avatar_public_url}
          className="rounded-[50%] w-[100px]"
        />
        <h1 className="text-2xl text-purple-400 text-justify">{user?.name}</h1>
        {posts ? (
          <div className="posts">
            {posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard post={post} author={author} key={post.id} />
              ))
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
