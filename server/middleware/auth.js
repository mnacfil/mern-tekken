import jwt from "jsonwebtoken";
import { promisify } from "util";
import Player from "../models/player.js";
import { APIError } from "./errorHandler.js";

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.cookies["jwt-token"]) {
    token = req.cookies["jwt-token"];
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new APIError("You are not logged in! Please log in to get access.", 401)
    );
  }

  let decoded;

  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new APIError("Invalid token. Please log in again!", 401));
    }
    return next(
      new APIError("Token verification failed. Please log in again!", 401)
    );
  }

  const currentPlayer = await Player.findById(decoded.id).select("-password");
  if (!currentPlayer) {
    return next(
      new APIError(
        "The player belonging to this token does no longer exist.",
        401
      )
    );
  }

  req.player = currentPlayer;
  next();
};

export { authMiddleware };
