import express from "express";

import HttpError from "./models/http-error.js";
import placesRoutes from "./routes/places-routes.js";

const app = express();

app.use(express.json());

app.use("/api/places", placesRoutes);

app.use((req, res) => {
  throw new HttpError("Could not find this route", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
