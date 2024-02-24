export const host = "http://localhost:8080";

//course
export const addCourse = `${host}/api/v1/course/addcourses`;
export const getCourse = `${host}/api/v1/course/getcourse`;
export const getcoursename = `${host}/api/v1/course/getcoursename/:Id`;

//Schedule route
export const addschedule = `${host}/api/v1/shedule/addschedule`;
export const getuserschedule = `${host}/api/v1/shedule/getuserschedule`;
export const dateInstructorAvailability = `${host}/api/v1/shedule/dateInstructorAvailability`;

