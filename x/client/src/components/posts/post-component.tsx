import { Avatar, Button } from "@/components/ui";
import {
  HeartIcon,
  MessageCircle,
  Repeat2,
  MoreHorizontal,
} from "lucide-react";

const PostComponent = () => {
  return (
    <div className="flex items-start space-x-3 border-t py-5">
      <Avatar fallback="Suraf" className="w-12 h-12 text-lg" />
      <div>
        <div className="flex items-center space-x-2">
          <p className="text-lg font-bold">name </p>
          <p className="text-lg font-medium opacity-70 hover:underline duration-150">
            @username
          </p>
          <p className="text-normal font-medium opacity-60 underline duration-150">
            time
          </p>
        </div>
        <p className="font-medium text-lg mt-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod omnis
          quaerat iste labore assumenda optio tempora ducimus voluptatibus
          suscipit voluptas.
        </p>
        {/* <img src="" alt="media" /> */}

        <div className="mt-5 flex items-center justify-between *:opacity-70">
          <MessageCircle />
          <Repeat2 />
          <HeartIcon />
          <MoreHorizontal />
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
