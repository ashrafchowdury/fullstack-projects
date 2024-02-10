import Home from "@/pages/home/page";
import Login from "@/pages/auth/login";

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
];

export default route;