import { Outlet } from "react-router-dom";
import Nav from "./common/Nav";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginByTokenThunk } from "./store/slices/user-slice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  if (user.error) toast.error(user.error);
  if (user.user) toast.success("logged in");
  useEffect(() => {
    if (localStorage.getItem("token"))
      dispatch(loginByTokenThunk(localStorage.getItem("token")));
  }, []);
  return (
    <>
      <Nav />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
