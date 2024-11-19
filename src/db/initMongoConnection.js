import mongoose from "mongoose";

const DB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=MyCluster`;

export async function initMongoConnection() {
  await mongoose.connect(DB_URI);
  console.log("Mongo connection successfully established!");
}
