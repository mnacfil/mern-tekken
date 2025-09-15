import jwt from "jsonwebtoken";
import Player from "../models/player.js";
import { APIError } from "../middleware/errorHandler.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

const createSendToken = (player, statusCode, res, message = "Success") => {
  const token = signToken(player._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // expires in 7 day
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  player.password = undefined;

  res.cookie("jwt-token", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: {
      player,
    },
  });
};

const register = async (req, res, next) => {
  const { fullName, email, password, confirmPassword, avatar } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    return next(
      new APIError(
        "Please provide full name, email, password, and confirm password",
        400
      )
    );
  }

  if (password !== confirmPassword) {
    return next(new APIError("Passwords do not match", 400));
  }

  if (password.length < 6) {
    return next(
      new APIError("Password must be at least 6 characters long", 400)
    );
  }

  try {
    const existingPlayer = await Player.findOne({ email: email.toLowerCase() });
    if (existingPlayer) {
      return next(
        new APIError(
          "Email already registered. Please use a different email or login instead",
          409
        )
      );
    }

    const newPlayer = await Player.create({
      fullName,
      email: email.toLowerCase(),
      password,
      avatar,
    });

    createSendToken(
      newPlayer,
      201,
      res,
      "Registration successful! Welcome to Monster Game!"
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new APIError("Please provide email and password", 400));
  }

  try {
    const player = await Player.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!player) {
      return next(new APIError("Unauthroized", 401));
    }

    const isPasswordCorrect = await player.comparePassword(password);

    if (!isPasswordCorrect) {
      return next(new APIError("Incorrect Password or Email", 401));
    }

    createSendToken(player, 200, res, "Login successful! Welcome back!");
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.cookie("jwt-token", "loggedout", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

const getCurrentUser = async (req, res, next) => {
  if (!req.player.id) {
    throw new APIError("Unauthorized Error", 401);
  }
  try {
    const player = await Player.findById(req.player.id).select("-password");

    res.status(200).json({
      status: "success",
      data: {
        player,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, logout, getCurrentUser };
