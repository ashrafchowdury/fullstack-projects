import express from "express";
import helmet from "helmet";

// initilization
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(express.static("public"))

// routes
app.get("/", (req, res) => res.status(200).send("Hello from X!"));

export default app;
