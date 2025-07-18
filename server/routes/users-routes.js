import express from "express";

import { check } from "express-validator";
import {
  getUsers,
  addUser,
  loginUser,
} from "../controllers/users-controller.js";

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

export default router;
