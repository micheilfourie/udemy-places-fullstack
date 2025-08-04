import HttpError from "../models/http-error.js";
import { validationResult } from "express-validator";
import User from "../models/user.js";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const getUsers = async (req, res, next) => {
  try {
    let { page = 1, limit = 5, name, places } = req.query;

    page = Math.max(1, parseInt(page));
    limit = Math.max(1, parseInt(limit));
    const skip = (page - 1) * limit;

    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (places) {
      query.places = { $size: parseInt(places) };
    }

    const rawUsers = await User.find(query).skip(skip).limit(limit).exec();

    const results = await User.countDocuments(query);

    const users = rawUsers.map((user) => user.toObject({ getters: true }));

    res.json({
      users,
      results,
      totalPages: Math.ceil(results / limit),
      currentPage: page,
    });
  } catch (error) {
    const err = new HttpError("Fetching users failed, please try again", 500);
    return next(err);
  }
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

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    const err = new HttpError("Signup failed, please try again.", 500);
    return next(err);
  }

  const newUser = new User({
    name,
    email,
    image: "",
    password: hashedPassword,
    places: [],
  });

  try {
    await newUser.save();
  } catch (error) {
    const err = new HttpError("Signup failed, please try again.", 500);
    return next(err);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: newUser.id, email: email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
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
      token: token,
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

  if (!user) {
    return next(new HttpError("Invalid credentials, could not login", 401));
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    const err = new HttpError("Login failed, please try again", 500);
    return next(err);
  }

  if (!isValidPassword) {
    return next(new HttpError("Invalid credentials, could not login", 401));
  }

  let token;

  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    const err = new HttpError("Login failed, please try again", 500);
    return next(err);
  }

  res.json({
    message: "Logged in!",
    user: {
      id: user.id,
      name: user.name,
      image: user.image,
      places: user.places.length,
      token: token,
    },
  });
};

const updateUserImage = async (req, res, next) => {
  const userId = req.params.uId;

  if (!req.file || !req.file.processedPath) {
    return next(new HttpError("No processed image found", 400));
  }

  let user;

  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("Updating user failed", 500));
  }

  if (!user) {
    return next(new HttpError("User not found", 404));
  }

  if (req.userId !== user.id) {
    return next(new HttpError("Authorization failed", 401));
  }

  const prevImagePath = user.image;
  user.image = req.file.processedPath;

  try {
    await user.save();
  } catch (error) {
    return next(new HttpError("Saving user failed", 500));
  }

  if (prevImagePath && fs.existsSync(prevImagePath)) {
    fs.unlink(prevImagePath, (err) => {
      if (err) console.log(err);
    });
  }

  res.json({
    message: "User image updated!",
    image: user.toObject({ getters: true }).image,
  });
};

export { getUsers, addUser, loginUser, updateUserImage };
