import express from "express";
import helmet from "helmet";
// v1 routes
import authRoute from "./routes/v1/auth.routes.js";
import postRoute from "./routes/v1/post.routes.js";
import profileRoute from "./routes/v1/profile.routes.js";

import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./libs/upload/upload-thing.js";

// initilization
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// routes
app.get("/", (req, res) => res.status(200).send("Hello from X!"));
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/profile", profileRoute);

// uploadthing route for uploading images
app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
      uploadthingId: process.env.UPLOADTHING_APP_ID,
      uploadthingSecret: process.env.UPLOADTHING_SECRET,
      isDev: true,
    },
  })
);

export default app;
