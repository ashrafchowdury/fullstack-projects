import Home from "@/pages/home/page";
import Login from "@/pages/auth/login/page";
import Signup from "@/pages/auth/signup/page";
import Forget from "@/pages/auth/forget/page";
import NewPassword from "@/pages/auth/new-password/page";


const route = [
  {
    path: "/",
    element: Home,
    restricted: false,
  },
  {
    path: "/login",
    element: Login,
    restricted: true,
  },
  {
    path: "/signup",
    element: Signup,
    restricted: true,
  },
  {
    path: "/forget-password",
    element: Forget,
    restricted: true,
  },
  {
    path: "/new-password",
    element: NewPassword,
    restricted: true,
  },
];

export default route;
