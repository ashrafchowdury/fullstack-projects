import { ApiError, async_handler } from "../libs/handlers.js";
import { uploadFileOnCloud } from "../libs/cloudinary.js";
import { join } from "path";
import { unlink } from "fs/promises";

export const uploadFile = async_handler(async (req, res) => {
  const relativeUploadDir = "/temp";
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);
  try {
    const file = req.file;

    if (!file) {
      res.status(400).end("Avatar required!");
    }

    const upload = await uploadFileOnCloud(`${uploadDir}/${file.filename}`);

    await unlink(`${uploadDir}/${file.filename}`); // delete the file from temporary folder

    return res.status(201).json(upload);
  } catch (error) {
    console.log("uploadFile", error);
  }
});
