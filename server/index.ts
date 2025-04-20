import "dotenv/config";
import express from "express";
import { connectToDatabase } from "./config/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error_handler";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";
import userRouter from "./routes/user.route";
import { APP_ORIGIN, PORT } from "./constants/env";
import categoryRouter from "./routes/category.route";
import path from "path";
import blogRouter from "./routes/post.route";
import googleRouter from "./routes/google.route";
import { seedCategories } from "./seeders/seed-categoryies";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use(cookieParser());

app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  return res.status(OK).json({
    status: "healthy",
  });
});
app.use("/", googleRouter);
app.use("/auth", authRoutes);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/blog", blogRouter);

seedCategories();

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase().then(()=> console.log('db running'));
});
