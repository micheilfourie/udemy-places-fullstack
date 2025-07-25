import HttpError from "../models/http-error.js";
import { validationResult } from "express-validator";
import Place from "../models/place.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import fs from "fs";

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pId;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(err);
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uId;
  let userPlaces;

  try {
    userPlaces = await Place.find({ creator: userId });
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(err);
  }

  if (!userPlaces || userPlaces.length === 0) {
    return next(
      new HttpError("Could not find any places for the provided user.", 404)
    );
  }

  res.json({ places: userPlaces.map((p) => p.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, coordinates } = req.body;

  if (!req.file || !req.file.processedPath) {
    return next(new HttpError("No processed image found.", 400));
  }

  const image = req.file.processedPath;

  let parsedCoordinates;
  try {
    parsedCoordinates = JSON.parse(coordinates);
  } catch {
    return next(new HttpError("Invalid coordinates format.", 422));
  }

  const createdPlace = new Place({
    title,
    description,
    image,
    address,
    location: parsedCoordinates,
    creator: req.userId,
  });

  let user;

  try {
    user = await User.findById(req.userId);
  } catch (error) {
    return next(new HttpError("Creating place failed, please try again.", 500));
  }

  if (!user) {
    return next(new HttpError("Could not find user for provided id.", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Creating place failed, please try again.", 500));
  }

  res.status(201).json({ place: createdPlace });
};

const patchPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const placeId = req.params.pId;
  const { title, description } = req.body;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (error) {
    const err = new HttpError("Updating place failed, please try again.", 500);
    return next(err);
  }

  if (req.userId !== place.creator.toString()) {
    return next(new HttpError("Authorization failed.", 401));
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    const err = new HttpError("Updating place failed, please try again.", 500);
    return next(err);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pId;
  let place;

  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (error) {
    const err = new HttpError("Deleting place failed, please try again.", 500);
    return next(err);
  }

  if (!place) {
    return next(new HttpError("Could not find place for this id.", 404));
  }

  if (place.creator.id !== req.userId) {
    return next(new HttpError("Authorization failed.", 401));
  }

  const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    const err = new HttpError("Deleting place failed, please try again.", 500);
    return next(err);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted place!" });
};

export {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  patchPlace,
  deletePlace,
};
