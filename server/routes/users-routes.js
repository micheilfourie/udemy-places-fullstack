import express from "express";

import { check } from "express-validator";
import {
  getUsers,
  addUser,
  loginUser,
  updateUserImage,
} from "../controllers/users-controller.js";
import fileUpload from "../middleware/file-upload.js";
import imageSharpMiddleware from "../middleware/image-sharp.js";

const router = express.Router();

router.get("/", getUsers);
router.post(
  "/signup",
  check("name").not().isEmpty(),
  check("email").normalizeEmail().isEmail(),
  check("password").isLength({ min: 6 }),
  addUser
);
router.post("/login", loginUser);
router.patch(
  "/user/:uId/image",
  fileUpload.single("image"),
  imageSharpMiddleware(100),
  updateUserImage
);

export default router;
