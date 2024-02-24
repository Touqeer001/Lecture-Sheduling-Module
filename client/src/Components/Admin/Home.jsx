import { addCourse, getCourse } from "../../Components/Utils/APIRoutes.js";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const [auth, setAuth] = useAuth();
  const [Courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post(addCourse, { ...courseData });
      setCourseData({
        name: "",
        level: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(getCourse);
      console.log("Data from server:", data);
      if (data?.success) {
        setCourses(data?.Courses);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [courseData, user]);

  return (
    <>
      <Header />
      <div className="row " id="image">
        <div className="col-md-6 ">
          <h1 style={{ color: "white" }} className="heading">
            Instructors
          </h1>
          <div class="card" style={{ width: "18rem" }}>
            <div class="card-body">
              <h5 class="card-title">Instructor Name:{auth?.user?.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                Instructor Email:{auth?.user?.email}
              </h6>
              {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
              <a href="#" class="card-link">
                Card link
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4" style={{ border: "5px solid white" }}>
          <form onSubmit={handleSubmit}>
            <h1 style={{ color: "white" }}>Add a Course</h1>
            <div className="form-group">
              <label htmlFor="name">Course Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter Course Name"
                value={courseData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="level">Level</label>
              <select
                className="form-control"
                id="level"
                name="level"
                value={courseData.level}
                onChange={handleChange}
                required
              >
                <option value="" disabled selected>
                  Select Level
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Enter Description"
                value={courseData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image1" style={{ color: "white" }}>
                Image URL
              </label>
              <input
                type="text"
                className="form-control"
                marginTop="10px"
                id="image1"
                name="image"
                placeholder="Enter Image URL"
                value={courseData.image}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "8px" }}
            >
              Add Course
            </button>
          </form>
        </div>
      </div>

      <h1 className="text-center" style={{ color: "white" }}>
        Courses
      </h1>
      <div className="d-flex flex-wrap">
        {Courses?.map((course, id) => (
          <div className="card m-2" key={id}>
            <img src={course.image} className="card-img-top" alt="Image" />
            <div className="card-body">
              <div className="card-name-price">
                <h5 className="card-title">Name:{course.name}</h5>
                <h5 className="card-title card-price">Lavel: {course.level}</h5>
              </div>
              <p className="card-text " style={{ color: "black" }}>
                Description:{course.description}
              </p>
              <div className="card-name-price">
                <Link to="/individualcourse">
                  <button className="btn btn-info ms-1">
                    Schedule Lecture
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
