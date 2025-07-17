import express from "express";

import {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  patchPlace,
  deletePlace,
} from "../controllers/places-controller.js";

const router = express.Router();

router.get("/:pId", getPlaceById);
router.get("/user/:uId", getPlacesByUserId);
router.post("/", createPlace);
router.patch("/:pId", patchPlace);
router.delete("/:pId", deletePlace);

export default router;
