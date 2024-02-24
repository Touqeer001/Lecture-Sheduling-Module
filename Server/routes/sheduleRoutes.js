import express from "express";
import {
  addScheduleController,
  checkDateController,
  getScheduleController,
  getUserScheduleController,
} from "../Controllers/sheduleController.js";
const router = express.Router();

//Add Shedule
router.post("/addschedule", addScheduleController);
router.get("/getschedule", getScheduleController);
router.get("/getuserschedule", getUserScheduleController);
router.post("/dateInstructorAvailability", checkDateController);
export default router;
