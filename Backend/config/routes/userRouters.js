import express from "express";
import { createNewUser,getUserProfile } from "../../src/api/v1/controllers/usersController.js";
import { validateParametersUser } from "../../middlewares/validateParametersUser.js";

const router = express.Router();

router.post("/usuarios", validateParametersUser, createNewUser);
router.get("/usuarios", getUserProfile);

export default router;
