import mongoose from "mongoose";

export const connection = mongoose
  .connect(process.env.url, {
    dbName: "backendapi",
  })
  .then(() => console.log("database is connected"))
  .catch((e) => console.log(e));   