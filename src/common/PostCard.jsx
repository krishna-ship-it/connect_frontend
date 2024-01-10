import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiEndpoints } from "../config/api-config";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
function PostCard({ post, author }) {
  const [likes, setLikes] = useState(post.Likes || []);
  const [liked, setLiked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    for (const like of likes) if (like.user_id == user.id) setLiked(true);
  }, []);

  // handler for fetching the likes
  const getLikes = async () => {
    try {
      const response = await fetch(
        `${apiEndpoints.postsEndpoints.GETLIKES}/${post.id}`,
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setLikes(data.likes);
    } catch (err) {
      toast.error(err.message);
    }
  };
  // handler for adding or removing the likes
  const addOrRemoveLikeHandler = async () => {
    try {
      const response = await fetch(
        `${apiEndpoints.postsEndpoints.LIKEORREMOVELIKEPOST}/${post.id}`,
        {
          method: "POST",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 204) {
        toast.success("you unliked post");
        await getLikes();
        setLiked(false);
        return;
      }
      const data = await response.json();

      if (response.status === 200) {
        toast.success("you like the post");
        await getLikes();
        setLiked(true);
        return;
      }

      throw new Error(data.message || "something went wrong");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const deletePostHandler = async () => {
    try {
      const response = await fetch(
        `${apiEndpoints.postsEndpoints.DELETEPOST}/${post.id}`,
        {
          method: "delete",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "something went wrong");
      }
      toast.success("post deleted");
    } catch (err) {}
  };

  const likedBtnStyles = liked
    ? "p-2 rounded-[25px] bg-purple-500"
    : "p-2 rounded-[25px] hover:bg-purple-500";

  return (
    <div className="w-full border-purple-200 border-[1px] mx-2 my-4 py-2 rounded-md">
      <div className="author flex items-center py-2 px-2 justify-between">
        <div className="author_details flex items-center">
          <img
            className="author_image w-[35px] rounded-[50%] mr-1"
            src={author.avatar_url}
          />
          <Link to={`/profile/${author.id}`}>{author.name}</Link>
        </div>
        <div className="options relative">
          <i
            className="fa-solid fa-ellipsis-vertical cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setShowOptions(!showOptions);
            }}
          ></i>
          {showOptions && (
            <div className="absolute right-0 top-full bg-slate-400 p-3 z-10 rounded-md">
              {post.author_id === user.id && (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deletePostHandler();
                    }}
                  >
                    Delete
                  </button>
                  <button>Edit</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <p className="px-2 text-left">{post?.title}</p>
      {post?.files && (
        <div className={`files`}>
          {post.files.map((file, i) => {
            return (
              <img
                src={file.url}
                className="w-full mb-2"
                key={i}
                loading="lazy"
              />
            );
          })}
        </div>
      )}
      {likes.length > 0 && (
        <div className="likes px-3 py-1">
          {liked
            ? likes.length - 1 === 0
              ? "only you liked it"
              : `you and ${likes.length - 1} liked`
            : `${likes.length} liked`}
        </div>
      )}
      <div className="post_footer flex justify-evenly">
        <button
          className={likedBtnStyles}
          onClick={(e) => {
            e.preventDefault();
            addOrRemoveLikeHandler();
          }}
        >
          <i className={"fa-solid fa-thumbs-up"}></i>
          <span>Like</span>
        </button>
        <button className="p-2 hover:bg-purple-500 rounded-[25px]">
          <i className="fa-solid fa-comment"></i> <span>Comment</span>
        </button>
        <button className="p-2 hover:bg-purple-500 rounded-[25px]">
          <i className="fa-solid fa-share"></i> <span>Share</span>
        </button>
      </div>
    </div>
  );
}

export default PostCard;
