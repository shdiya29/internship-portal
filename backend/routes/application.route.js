import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyInternship, getApplicants, getAppliedInternships, updateStatus } from "../controllers/application.controller.js";

const router=express.Router();

router.route("/apply/:id").get(isAuthenticated,applyInternship);
router.route("/get").get(isAuthenticated,getAppliedInternships);
router.route("/:id?applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);

export default router;