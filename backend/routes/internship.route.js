import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminInternships, getAllInternships, getInternshipById, postInternship } from "../controllers/internship.controller.js";


const router=express.Router();

router.route("/post").post(isAuthenticated,postInternship);
router.route("/get").get(isAuthenticated,getAllInternships);
router.route("/getadmininternships").get(isAuthenticated,getAdminInternships);
router.route("/get/:id").get(isAuthenticated,getInternshipById);

export default router;