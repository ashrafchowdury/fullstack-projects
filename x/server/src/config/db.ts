import mongoose from "mongoose";

const db = () => mongoose.connect(process.env.DATABASE_URL);

export default db;
