import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./common/Nav";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginByTokenThunk } from "./store/slices/user-slice";

function App() {
  const dispatch = useDispatch();

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
