import HttpError from "../models/http-error.js";
import { validationResult } from "express-validator";
import User from "../models/user.js";
import fs from "fs";

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (error) {
    const err = new HttpError("Fetching users failed, please try again", 500);
    return next(err);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const addUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpError("Signup failed, please try again.", 500);
    return next(err);
  }

  if (user) {
    return next(new HttpError("User already exists.", 422));
  }

  const newUser = new User({
    name,
    email,
    image: "",
    password,
    places: [],
  });

  try {
    await newUser.save();
  } catch (error) {
    const err = new HttpError("Signup failed, please try again.", 500);
    return next(err);
  }

  res.json({
    message: "User added!",
    user: {
      id: newUser.id,
      name: newUser.name,
      image: newUser.image,
      places: 0,
    },
  });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpError("Login failed, please try again", 500);
    return next(err);
  }

  if (!user || user.password !== password) {
    return next(new HttpError("Invalid credentials, could not login", 401));
  }

  res.json({
    message: "Logged in!",
    user: {
      id: user.id,
      name: user.name,
      image: user.image,
      places: user.places.length,
    },
  });
};

const updateUserImage = async (req, res, next) => {
  const userId = req.params.uId;
  const image = req.file.path;

  let user;

  try {
    user = await User.findById(userId);
  } catch (error) {
    const err = new HttpError("Updating user failed, please try again", 500);
    return next(err);
  }

  if (!user) {
    return next(new HttpError("Could not find user for this id", 404));
  }

  const prevImagePath = user.image;

  user.image = image;

  try {
    await user.save();
  } catch (error) {
    const err = new HttpError("Updating user failed, please try again", 500);
    return next(err);
  }

  if (prevImagePath !== "") {
    fs.unlink(prevImagePath, (err) => console.log(err));
  }

  res.json({
    message: "User image updated!",
    image: user.toObject({ getters: true }).image,
  });
};

export { getUsers, addUser, loginUser, updateUserImage };
