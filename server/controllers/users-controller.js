import HttpError from "../models/http-error.js";
import { validationResult } from "express-validator";
import User from "../models/user.js";

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
      new HttpError("Invalid inputs passed, please check your data", 422)
    );
  }

  const { name, email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    const err = new HttpError("Signing up failed, please try again", 500);
    return next(err);
  }

  if (user) {
    return next(new HttpError("User already exists", 422));
  }

  const newUser = new User({
    name,
    email,
    image:
      "https://images.pexels.com/photos/27765567/pexels-photo-27765567.jpeg",
    password,
    places: []
  });

  try {
    await newUser.save();
  } catch (error) {
    const err = new HttpError("Signing up failed, please try again", 500);
    return next(err);
  }

  res.json({ message: "User added!" });
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

  res.json({ message: "Logged in!" });
};

export { getUsers, addUser, loginUser };
