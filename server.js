import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import eventRoutes from "./routes/events.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import multer  from "multer";
import path from "path";
import cors from "cors";
import { fileURLToPath } from 'url';




const app = express();
dotenv.config();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

const connect = async () => {
  await mongoose
    .connect(process.env.MONG_URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://wadabalan.netlify.app");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


app.use(
  cors({
    origin: "https://wadabalan.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
//middlewares
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);




//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

connect().then(() => {
  app.listen(5002, () => {
    console.log("Connected to Server!");
  });
});
