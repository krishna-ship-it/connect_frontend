export const apiEndpoints = {
  userAuthEndpoints: {
    LOGIN: "http://localhost:3000/api/v1/users/login",
    GETMYPROFILE: "http://localhost:3000/api/v1/users/profile/me",
  },
  postsEndpoints: {
    CREATEPOST: "http://localhost:4000/api/v1/posts",
    // http://localhost:4000/api/v1/posts/user/:user_id
    GETPOSTS: "http://localhost:4000/api/v1/posts/user",
    GETLIKES: "http://localhost:4000/api/v1/likes/posts",
    LIKEORREMOVELIKEPOST: "http://localhost:4000/api/v1/likes/posts",
    DELETEPOST: "http://localhost:4000/api/v1/posts",
  },
};
