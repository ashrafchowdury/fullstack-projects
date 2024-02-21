import dotenv from "dotenv";
dotenv.config();

import db from "./src/config/db.js";
import app from "./src/app.js";

db()
  .then(() => {
    app.listen(process.env.PORT || 5000, () =>
      console.log("server is running...")
    );
  })
  .catch((err) => console.log("Something wrong on database connection:", err));
