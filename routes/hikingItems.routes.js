import express from "express";
import { getHikingItems } from "../controllers/hikingItems.controller.js";

const router = express.Router();

router.get("/", getHikingItems);

export default router;