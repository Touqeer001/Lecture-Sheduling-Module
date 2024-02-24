import CourseSchedule from "../Model/scheduleModel.js";
export const addScheduleController = async (req, res) => {
  try {
    const { course, lecture, date, instructor, location } = req.body;
    const parsedDate = new Date(date);
    // Create a new schedule document
    const newSchedule = new CourseSchedule({
      course,
      lecture,
      date: parsedDate, // Convert date string to Date object
      instructor,
      location,
    });

    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get shedule

export const getScheduleController = async (req, res) => {
  try {
    const { courseName } = req.query;

    // Validate if courseName is provided
    if (!courseName) {
      return res.status(400).json({ error: "Course name is required." });
    }

    const schedules = await CourseSchedule.find({ course: courseName });

    res.status(200).json({ schedules });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//user Shedule
export const getUserScheduleController = async (req, res) => {
  try {
    const { currUser } = req.query;

    if (!currUser) {
      return res.status(400).json({ error: "No user is here! To display" });
    }
    const schedules = await CourseSchedule.find({ instructor: currUser });

    res.status(200).json({ schedules });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


//date Avalibility controller

export const checkDateController = async (req, res) => {
  const { name, date } = req.body;

  try {
    const existingSchedule = await CourseSchedule.findOne({
      instructor: name,
      date: new Date(date),
    });

    if (existingSchedule) {
      return res
        .status(409)
        .json({ error: "Instructor is already busy on this date." });
    }

    return res
      .status(200)
      .json({ message: "Instructor is available on this date." });
  } catch (error) {
    console.error("Error checking instructor availability:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};