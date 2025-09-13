import {
  getCurrentUser,
  login,
  logout,
  register,
} from "../controllers/auth.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/current-user", getCurrentUser);

export default router;
