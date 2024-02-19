import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui";
import { ArrowLeft, Locate, Link2, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "@/components/profile/update-profile";
import AppLayout from "@/components/layout/app";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <header className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-3">
          <Button
            size="icon"
            variant="ghost"
            className="w-7 h-7"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <p className="text-xl font-bold">Ashraf Chowdury ^_-</p>
            <p className="text-sm">number of posts</p>
          </div>
        </div>

        <UpdateProfile />
      </header>
      <div className="w-full relative mb-24">
        <img
          src="https://pbs.twimg.com/profile_banners/1355130501124685824/1704545880/1080x360"
          alt="banner"
          className="w-full h-[250px] object-cover border"
        />
        <img
          src="https://pbs.twimg.com/profile_images/1716120082198548481/nW-npRrA_400x400.jpg"
          alt="profile photo"
          className="w-[180px] h-[180px] rounded-full border-4 border-background absolute -bottom-20 left-5"
        />
      </div>
      <div className="w-[95%] space-y-4 mx-auto">
        <div className="space-y-1.5">
          <p className="text-2xl font-bold">Ashraf Chowdury ^_-</p>
          <p className="opacity-60">@ashraf_chowdury</p>
        </div>
        <p className="font-semibold text-[16px]">
          A self-taught front-end developer who loves to write code ^_~
        </p>
        <div className="flex items-center space-x-5 *:flex *:items-center">
          <p>
            <Locate className="w-3 h-3 mr-2" /> location
          </p>
          <p>
            <Link2 className="w-3 h-3 mr-2" />
            link
          </p>
          <p>
            <Calendar className="w-3 h-3 mr-2" />
            joint date
          </p>
        </div>
        <div className="flex items-center space-x-5">
          <Link to="" className="underline">
            <span className="font-bold">333</span> Followings
          </Link>
          <Link to="" className="underline">
            {" "}
            <span className="font-bold">333</span> Followers
          </Link>
        </div>
      </div>

      <Tabs defaultValue="posts" className="w-full mt-10">
        <TabsList className="w-full flex items-center *:!font-semibold *:text-lg *:w-full *:py-4 active:*:border-b">
          <TabsTrigger
            className="data-[state=active]:shadow-none data-[state=active]:border-b"
            value="posts"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:shadow-none data-[state=active]:border-b"
            value="replies"
          >
            Replies
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:shadow-none data-[state=active]:border-b"
            value="highlights"
          >
            Highlights
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:shadow-none data-[state=active]:border-b"
            value="media"
          >
            Media
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:shadow-none data-[state=active]:border-b"
            value="links"
          >
            Links
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts"></TabsContent>
        <TabsContent value="replies"></TabsContent>
        <TabsContent value="highlights"></TabsContent>
        <TabsContent value="media"></TabsContent>
        <TabsContent value="links"></TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Profile;
