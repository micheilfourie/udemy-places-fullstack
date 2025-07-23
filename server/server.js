import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

import HttpError from "./models/http-error.js";
import placesRoutes from "./routes/places-routes.js";
import usersRoutes from "./routes/users-routes.js";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/users", usersRoutes);
app.use("/api/places", placesRoutes);

app.use((req, res) => {
  throw new HttpError("Could not find this route", 404);
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const mongodb = process.env.MONGODB_URI;

mongoose
  .connect(mongodb)
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
