import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import Profile from "@/components/profile";

const Home = () => {
  const isUser = true;

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      {!isUser ? (
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
