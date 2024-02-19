import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "../ui";
import { Input } from "../ui";
import { Textarea } from "../ui";
import { Edit2, XIcon, CameraIcon } from "lucide-react";
import { Button } from "../ui";

const UpdateProfile = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-8 h-8" variant="outline" size="icon">
          <Edit2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <section className="relative h-[500px] overflow-auto mx-1">
          <div className="w-full relative mb-16">
            <div className="group/item relative">
              <img
                src="https://pbs.twimg.com/profile_banners/1355130501124685824/1704545880/1080x360"
                alt="banner"
                className="w-full h-[150px] object-cover border"
              />

              <div className="space-x-3 items-center justify-center hover:bg-black/30 duration-200 hidden group-hover/item:flex absolute top-0 left-0 bottom-0 right-0 text-white">
                <button className="w-9 h-9">
                  <CameraIcon className="w-5 h-5" />
                </button>
                <button className="w-9 h-9">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <img
              src="https://pbs.twimg.com/profile_images/1716120082198548481/nW-npRrA_400x400.jpg"
              alt="profile photo"
              className="w-[100px] h-[100px] rounded-full border-4 border-background absolute -bottom-12 left-2"
            />
          </div>
          <div className="space-y-4 *:text-[16px]">
            <Input placeholder="Name" className="h-10" />
            <Textarea placeholder="Bio"></Textarea>
            <Input placeholder="Location" className="h-10" />
            <Input placeholder="Website" className="h-10" />
          </div>
          <Button className=" absolute bottom-0 w-full">Save Profile</Button>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
