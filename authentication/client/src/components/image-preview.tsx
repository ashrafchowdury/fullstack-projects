import { ImagePlus } from "lucide-react";
import useFile from "@/utils/hooks/useFile";

const ImagePreview = () => {
  const { filePreview, loadFile, file } = useFile();
  return (
    <>
      <div className="group/item w-[95px] h-[90px] rounded-md overflow-hidden border relative !space-y-0">
        <div className="top-0 left-0 right-0 bottom-0 absolute z-20 items-center justify-center bg-black/60 hidden group-hover/item:flex">
          <ImagePlus className="w-5 h-5 text-white" />
          <input
            type="file"
            className="opacity-0 absolute top-0 left-0 right-0 bottom-0 z-30 cursor-pointer"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => loadFile(e.target.files as FileList)}
          />
        </div>

        <img
          src={
            (filePreview as string) ||
            "https://th.bing.com/th/id/OIP.MJvIPzu-WyjWaJfJEzDTMwHaHa?w=600&h=600&rs=1&pid=ImgDetMain"
          }
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
};

export default ImagePreview;
