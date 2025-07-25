import HttpError from "../models/http-error.js";
import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error("Authentication failed!");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    const err = new HttpError(error.message, 401);
    return next(err);
  }
};

export default checkAuth;
