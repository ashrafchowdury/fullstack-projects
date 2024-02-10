import { Avatar, Textarea, Button } from "@/components/ui";
import { ImageIcon, Smile, Fullscreen } from "lucide-react";

const PostShare = () => {
  return (
    <section className="">
      <div className="flex items-start space-x-2">
        <Avatar fallback="Ashraf" className="w-12 h-12 text-lg" />
        <div className="w-full">
          <Textarea
            className="mt-1 mb-3 border-none text-lg font-semibold min-h-28 placeholder:text-xl"
            placeholder="What's happeing!"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <ImageIcon />
              <Smile />
              <Fullscreen />
            </div>
            <Button className="w-20" title="anyting">
              Post
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostShare;
