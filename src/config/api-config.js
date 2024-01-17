export const apiEndpoints = {
  userAuthEndpoints: {
    LOGIN: "http://localhost:3000/api/v1/users/login",
    SIGNUP: "http://localhost:3000/api/v1/users/signup",
    GETMYPROFILE: "http://localhost:3000/api/v1/users/profile/me",
    // http://localhost:3000/api/v1/users/${userid}
    GETUSERBYID: "http://localhost:3000/api/v1/users",
    GETALLUSER: "http://localhost:3000/api/v1/users/",
  },
  postsEndpoints: {
    CREATEPOST: "http://localhost:4000/api/v1/posts",
    // http://localhost:4000/api/v1/posts/user/:user_id
    GETPOSTS: "http://localhost:4000/api/v1/posts/user",
    GETLIKES: "http://localhost:4000/api/v1/likes/posts",
    LIKEORREMOVELIKEPOST: "http://localhost:4000/api/v1/likes/posts",
    DELETEPOST: "http://localhost:4000/api/v1/posts",
  },
  friendsEndpoints: {
    // http://localhost:4000/api/v1/friends/${userID}
    GETFRIENDS: "http://localhost:4000/api/v1/friends",
  },
};
