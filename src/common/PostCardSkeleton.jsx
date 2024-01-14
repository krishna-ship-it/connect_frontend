import React from "react";

function PostCardSkeleton() {
  return (
    <div className="post_skeleton w-full border-purple-200 border-[1px] mx-2 my-4 px-3 py-3 rounded-md animate-pulse">
      <div className="post_skeleton_header  flex items-center justify-between ">
        <div className="w-[35px] h-[35px] rounded-[50%] bg-purple-300"></div>
        <div className="h-[20px] w-[230px] bg-purple-300 rounded-md "></div>
      </div>
      <div className="post_skeleton_image_area w-full h-[200px]  bg-purple-300 mt-3 rounded-md"></div>
      <div className="post_footer flex items-center justify-between mt-3">
        <div className="w-[70px] h-[30px] bg-purple-300 rounded-[10px]"></div>
        <div className="w-[70px] h-[30px] bg-purple-300 rounded-[10px]"></div>
        <div className="w-[70px] h-[30px] bg-purple-300 rounded-[10px]"></div>
      </div>
    </div>
  );
}

export default PostCardSkeleton;
