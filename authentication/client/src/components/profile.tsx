import { useState } from "react";
import { Button } from "@/components/ui";
import {
  Card,
  CardContent,
  CardFooter,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import { Edit, X, ImagePlus } from "lucide-react";
import { USER_PROFILE_TYPE } from "@/lib/types";
import { useAuth } from "@/context/auth-context";
import useFile from "@/utils/hooks/useFile";
import { toast } from "sonner";
import axios from "axios";

const Profile = () => {
  const [profileUpdate, setProfileUpdate] = useState<USER_PROFILE_TYPE>({
    username: "",
    email: "",
    bio: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useAuth();
  const { filePreview, loadFile, file, setFile, setFilePreview } = useFile();

  const onChange = (event: any, fieldName: string) => {
    setProfileUpdate({ ...profileUpdate, [fieldName]: event.target.value });
  };

  const onSubmit = async () => {
    try {
      if (file) {
        await update_avatar();
      }

      const update: any = {};

      for (const key in profileUpdate) {
        if (profileUpdate[key as keyof USER_PROFILE_TYPE]) {
          update[key] = profileUpdate[key as keyof USER_PROFILE_TYPE];
        }
      }
      if (!update) {
        toast.error("Please update any filed before update the profile");
        return;
      }
      await axios.post(
        "",
        { ...update },
        {
          headers: {
            Authorization: `Beear ${"token"}`,
          },
        }
      );
      toast("Profile has updated!");
      clearStates();
    } catch (error) {
      toast.error("Failed to update the profile. Please try again later.");
    }
  };

  const update_avatar = async () => {
    try {
      await axios.post(
        "",
        { avatar: file },
        {
          headers: {
            Authorization: `Beear ${"token"}`,
          },
        }
      );
    } catch (error) {
      toast.error("Failed to update the profile photo. Please try again!");
      return;
    }
  };

  const clearStates = () => {
    setProfileUpdate({
      username: "",
      email: "",
      bio: "",
    });
    setFile(null);
    setFilePreview(null);
  };

  return (
    <Card>
      <CardContent className="w-[550px] p-7 relative">
        <Button
          className="w-7 h-7 absolute top-3 right-3"
          variant="outline"
          size="icon"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? (
            <X className="w-4 h-4 opacity-80" />
          ) : (
            <Edit className="w-4 h-4 opacity-80" />
          )}
        </Button>

        <section className="space-y-3 *:space-y-1">
          <div className="w-[100px] h-[100px] rounded-md overflow-hidden border relative !space-y-0">
            {isEdit && (
              <div className="top-0 left-0 right-0 bottom-0 absolute z-20 flex items-center justify-center bg-black/60">
                <ImagePlus className="w-5 h-5 text-white" />
                <input
                  type="file"
                  className="opacity-0 absolute top-0 left-0 right-0 bottom-0 z-30 cursor-pointer"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => loadFile(e.target.files as FileList)}
                />
              </div>
            )}
            <img
              src={
                (filePreview as string) ||
                "https://pbs.twimg.com/profile_images/1716120082198548481/nW-npRrA_400x400.jpg"
              }
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="username"
              disabled={!isEdit}
              aria-disabled={!isEdit}
              className=" disabled:opacity-100"
              value={profileUpdate.username}
              defaultValue={user.username}
              onChange={(e) => onChange(e, "username")}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Email"
              disabled={!isEdit}
              aria-disabled={!isEdit}
              className=" disabled:opacity-100"
              value={profileUpdate.email}
              defaultValue={user.email}
              onChange={(e) => onChange(e, "email")}
            />
          </div>
          <div>
            <Label>Bio</Label>
            <Textarea
              placeholder="Bio"
              disabled={!isEdit}
              aria-disabled={!isEdit}
              className=" disabled:opacity-100"
              value={profileUpdate.bio}
              defaultValue={user.bio}
              onChange={(e) => onChange(e, "bio")}
            ></Textarea>
          </div>
          <div>
            <Label>Last Updated</Label>
            <p className="py-1.5 px-3 border rounded-md text-sm cursor-not-allowed">
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <div>
            <Label>Registred By</Label>
            <p className="py-1.5 px-3 border rounded-md text-sm cursor-not-allowed">
              Email / Password
            </p>
          </div>
        </section>

        <CardFooter className="p-0 m-0 mt-10">
          <Button className="w-full h-8" onClick={onSubmit}>
            Update Profile
          </Button>
          {/* <Button className="w-full h-8" variant="destructive">
              Log Out
            </Button> */}
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default Profile;
