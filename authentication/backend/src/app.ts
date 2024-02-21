import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser"

// routes
import authRoute from "./routes/v1/auth.routes.js";

// initilization
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(express.static("public"));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoute);

export default app;
