import Course from "../Model/courseModel.js";
import JWT from "jsonwebtoken";

export const addcourseController = async (req, res) => {
  try {
    // Extract course data from the request body
    const { name, level, description, image } = req.body;

    // Check if all required fields are provided
    if (!name || !level || !description) {
      throw new Error("Missing required fields");
    }
    const newCourse = new Course({
      name,
      level,
      description,
      image
    });

    const savedCourse = await newCourse.save();
    return res.json({ status: true, savedCourse });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in course",
    });
  }
};

//get course
export const getCourseController = async (req, res) => {
  try {
    const Courses = await Course.find({});
    res.status(200).send({
      success: true,
      message: "All courses List",
      Courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Course",
    });
  }
};

export const getCourseNameController = async (req, res) => {
  try {
    const { courseId } = req.params;
    // const course = await Course.findById(courseId);
    const course= await Course.findOne({courseId });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).send({
      success: true,
      message: "courseName: course.name",
      course,
    });

    // return res.json({ courseName: course.name });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting course by name",
    });
  }
};
