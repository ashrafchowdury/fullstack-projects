import express from "express";

import { uploadFile } from "../../controllers/file.controller.js";
// middlewares
import { upload } from "../../middlewares/multer.middleware.js";

//intilization
const router = express.Router();

router.post("/v1/upload", upload.single("file"), uploadFile);

export default router;