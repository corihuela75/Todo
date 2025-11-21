import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect("mongodb://127.0.0.1:27017/todoapp")
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});

export default app