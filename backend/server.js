import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoutes.js";
import userRouter from "./routes/userRoute.js";
const app = express();
const port = process.env.PORT || 5001;
connectDB();
connectCloudinary();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/admin", adminRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/user", userRouter);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
