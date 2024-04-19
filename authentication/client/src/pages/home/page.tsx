import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import Profile from "@/components/profile";
import { useAuth } from "@/context/auth-context";

const Home = () => {
  const { user, uid } = useAuth();
console.log(uid);
  return (
    <main className="flex items-center justify-center w-screen h-screen">
      {!uid ? (
        <Link to="/login">
          <Button>Login To Your Account</Button>
        </Link>
      ) : (
        <Profile />
      )}
    </main>
  );
};

export default Home;
