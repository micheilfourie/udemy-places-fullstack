import HttpError from "../models/http-error.js";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

const users = [
  {
    id: "u1",
    name: "Amy Fisher",
    email: "amy@example.com",
    password: "password",
    image:
      "https://images.pexels.com/photos/27765567/pexels-photo-27765567.jpeg",
    places: 2,
  },
  {
    id: "u2",
    name: "Mark Zuckerberg",
    email: "amy@example.com",
    password: "password",
    image: "",
    places: 1,
  },
  {
    id: "u3",
    name: "Sam Smith",
    email: "amy@example.com",
    password: "password",
    image: "",
    places: 1,
  },
];

const getUsers = (req, res, next) => {
  const userList = users.map((u) => ({
    id: u.id,
    name: u.name,
    image: u.image,
    places: u.places,
  }));

  if (!userList) {
    throw new HttpError("No users found", 404);
  }

  res.json({ users: userList });
};

const addUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new HttpError("Invalid user input recieved", 422);
  }

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    throw new HttpError("User already exists", 422);
  }

  const user = {
    id: uuidv4(),
    name,
    email,
    password, // need to hash
    places: 0,
    image: "",
  };

  users.push(user);

  res.json({ message: "User added!" });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new HttpError("Invalid user input recieved", 422);
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new HttpError("User Not Found", 422);
  }

  const passwordIsValid = password === user.password;

  if (!passwordIsValid) {
    throw new HttpError("Incorrect password", 422);
  }

  res.json({ message: "Logged in!" });
};

export { getUsers, addUser, loginUser };
