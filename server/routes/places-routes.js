import express from "express";

import { check } from "express-validator";
import {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  patchPlace,
  deletePlace,
} from "../controllers/places-controller.js";
import fileUpload from "../middleware/file-upload.js";
import imageSharpMiddleware from "../middleware/image-sharp.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/:pId", getPlaceById);
router.get("/user/:uId", getPlacesByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single("image"),
  imageSharpMiddleware(700),
  check("title").isLength({ min: 3, max: 50 }),
  check("description").isLength({ min: 3, max: 200 }),
  createPlace
);
router.patch(
  "/:pId",
  check("title").isLength({ min: 3, max: 50 }),
  check("description").isLength({ min: 3, max: 200 }),
  patchPlace
);
router.delete("/:pId", deletePlace);

export default router;
