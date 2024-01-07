import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post, author }) {
  return (
    <div className="w-full max-w-[600px] border-purple-200 border-[1px] mx-2 my-4 p-2 rounded-md">
      <div className="author flex items-center py-2">
        <img
          className="author_image w-[35px] rounded-[50%] mr-1"
          src={author.avatar_url}
        />
        <Link to={`/profile/${author.id}`}>{author.name}</Link>
      </div>
      <p>{post?.title}</p>
      {post?.files && (
        <div className={`files`}>
          {post.files.map((file, i) => {
            return <img src={file.url} className="w-full mb-2" key={i} />;
          })}
        </div>
      )}

      <div className="post_footer flex justify-evenly">
        <button className="p-2 hover:bg-purple-500 rounded-[25px]">
          <i className="fa-solid fa-thumbs-up"></i>
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
