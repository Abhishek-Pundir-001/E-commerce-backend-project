import { Router } from "express";
import { signup } from "../controllers/userControllers.js";

const route = Router();

route.post("/signup",signup)

export default route