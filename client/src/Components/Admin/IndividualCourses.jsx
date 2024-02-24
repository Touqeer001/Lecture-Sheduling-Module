import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getuserschedule,
  allInstructors,
  getcoursename,
  addschedule,
  dateInstructorAvailability,
} from "../Utils/APIRoutes.js";
import axios from "axios";

const IndividualCourses = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [dropDropUser, setDropUser] = useState(undefined);
  const [id, setId] = useState(null);
  const [courseName, setCourseName] = useState("Dummy Course");
  const [instructorData, setInstructorData] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [schedule, setSchedule] = useState([]);


  // Function to get course name by ID
  const getCourseNameById = async (courseId) => {
    try {
      const response = await axios.get(`${getcoursename}/${courseId}`);
      return response.data.courseName;
    } catch (error) {
      console.error("Error fetching course name:", error);
      return null;
    }
  };

   // Effect hook to fetch course name
   useEffect(() => {
    const fetchCourseName = async () => {
      try {
        if (courseId) {
          setCourseName(await getCourseNameById(courseId));
        }
      } catch (error) {
        console.error("Error fetching course name:", error);
      }
    };
    fetchCourseName();
  }, [courseId]);

  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {/* <h2 style={{ color: "white" }}>HEllo</h2> */}
          <form>
            <h2 style={{ color: "white" }}>Schedule a Lecture</h2>
            <div className="mb-1">
              <label
                htmlFor="instructor"
                className="form-label"
                placeholder="instructor"
              >
                Select Instructor
              </label>
              <select
                className="form-select"
                name="instructor"
                placeholder="instructor"
                // value={selectedInstructor}
                // onChange={handleInstructorSelection}
                required
              >
                <option value="" disabled>
                  Select Instructor
                </option>
                {/* {instructorData.map((instructor, index) => (
                  <option key={index} value={instructor}>
                    {instructor}
                  </option>
                ))} */}
              </select>
            </div>
            <div className="mb-2">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                name="date"
                // value={lectureData.date}
                // onChange={handleChange}
                required
              />
            </div>

            {/* Other form inputs */}
            <select
              className="form-select mb-3"
              name="subject"
              // value={lectureData.subject}
              // onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Course
              </option>
              {/* <option>{courseName}</option> */}
            </select>
            <input
              type="text"
              className="form-control mb-3"
              name="lecture"
              placeholder="Lecture"
              // value={lectureData.lecture}
              // onChange={handleChange}
              required
            />
            <input
              type="text"
              className="form-control mb-3"
              name="location"
              placeholder="Location"
              // value={lectureData.location}
              // onChange={handleChange}
              required
            />

            <button type="submit" className="btn btn-primary">
              Schedule Lecture
            </button>
          </form>
        </div>
        <div className="col-md-2 border-start">
          {/* Content for the right side */}
        </div>
      </div>
    </div>
  );
};

export default IndividualCourses;
