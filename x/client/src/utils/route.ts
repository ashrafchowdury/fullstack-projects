import Home from "@/pages/home/page";
import Login from "@/pages/auth/page";
import Profile from "@/pages/profile/page";
import Interest from "@/pages/profile/interest/page";

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
    path: "/profile",
    element: Profile,
    restricted: true,
  },
  {
    path: "/interest",
    element: Interest,
    restricted: true,
  },
];

export default route;
