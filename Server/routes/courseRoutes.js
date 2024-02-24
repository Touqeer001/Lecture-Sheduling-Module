import express from "express";
const router = express.Router();
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { addcourseController, getCourseController, getCourseNameController } from "../Controllers/courseController.js";

// add course
router.post("/addcourses", addcourseController);

//get course
router.get("/getcourse", getCourseController);

router.get("/getcoursename/:Id", getCourseNameController);


export default router;
