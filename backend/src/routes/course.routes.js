// import { Router } from "express";
// import { addClass, addCourseStudent, addCourseTeacher, canStudentEnroll, enrolledcourseSTD, enrolledcourseTeacher, getCourse, getcourseTeacher, stdEnrolledCoursesClasses, teacherEnrolledCoursesClasses } from "../controllers/course.controller.js";
// import { authSTD } from "../middlewares/stdAuth.middleware.js";
// import { authTeacher } from "../middlewares/teacherAuth.middleware.js";


// const router = Router()


// router.route("/all").get(getCourse)

// router.route("/:coursename").get(getcourseTeacher)

// router.route("/:coursename/create/:id").post(authTeacher, addCourseTeacher)

// router.route("/:coursename/:courseID/add/student/:id").post(authSTD, addCourseStudent)

// router.route("/:coursename/:courseID/verify/student/:id").post(authSTD, canStudentEnroll)

// router.route("/student/:id/enrolled").get(authSTD, enrolledcourseSTD)

// router.route("/teacher/:id/enrolled").get(authTeacher, enrolledcourseTeacher)

// router.route("/:courseId/teacher/:teacherId/add-class").post(authTeacher, addClass)

// router.route("/classes/student/:studentId").get(authSTD, stdEnrolledCoursesClasses)

// router.route("/classes/teacher/:teacherId").get(authTeacher, teacherEnrolledCoursesClasses)

// export default router;














import { Router } from "express";
import {
  addClass,
  addCourseStudent,
  addCourseTeacher,
  canStudentEnroll,
  enrolledcourseSTD,
  enrolledcourseTeacher,
  getCourse,
  getcourseTeacher,
  stdEnrolledCoursesClasses,
  teacherEnrolledCoursesClasses,
} from "../controllers/course.controller.js";
import { authSTD } from "../middlewares/stdAuth.middleware.js";
import { authTeacher } from "../middlewares/teacherAuth.middleware.js";

const router = Router();

// ---------- Course Listing ----------
router.get("/all", getCourse); // Get all courses
router.get("/:coursename", getcourseTeacher); // Get teachers for a course

// ---------- Course Enrollment ----------
router.post("/:coursename/create/:id", authTeacher, addCourseTeacher); // Add teacher to course
router.post("/:coursename/:courseID/add/student/:id", authSTD, addCourseStudent); // Add student to course
router.post("/:coursename/:courseID/verify/student/:id", authSTD, canStudentEnroll); // Verify student enrollment

// ---------- Enrolled Courses ----------
router.get("/student/:id/enrolled", authSTD, enrolledcourseSTD); // Get student enrolled courses
router.get("/teacher/:id/enrolled", authTeacher, enrolledcourseTeacher); // Get teacher enrolled courses

// ---------- Classes ----------
router.post("/:courseId/teacher/:teacherId/add-class", authTeacher, addClass); // Add class to a course
router.get("/classes/student/:studentId", authSTD, stdEnrolledCoursesClasses); // Get student classes
router.get("/classes/teacher/:teacherId", authTeacher, teacherEnrolledCoursesClasses); // Get teacher classes

export default router;






// import { Router } from "express";
// import {
//   addClass,
//   addCourseStudent,
//   addCourseTeacher,
//   canStudentEnroll,
//   enrolledcourseSTD,
//   enrolledcourseTeacher,
//   getCourse,
//   getcourseTeacher,
//   stdEnrolledCoursesClasses,
//   teacherEnrolledCoursesClasses,
//   deleteClass // Import the new deleteClass controller
// } from "../controllers/course.controller.js";
// import { authSTD } from "../middlewares/stdAuth.middleware.js";
// import { authTeacher } from "../middlewares/teacherAuth.middleware.js";

// const router = Router();

// // ---------- Course Listing ----------
// router.get("/all", getCourse); // Get all courses
// router.get("/:coursename", getcourseTeacher); // Get teachers for a course

// // ---------- Course Enrollment ----------
// router.post("/:coursename/create/:id", authTeacher, addCourseTeacher); // Add teacher to course
// router.post("/:coursename/:courseID/add/student/:id", authSTD, addCourseStudent); // Add student to course
// router.post("/:coursename/:courseID/verify/student/:id", authSTD, canStudentEnroll); // Verify student enrollment

// // ---------- Enrolled Courses ----------
// router.get("/student/:id/enrolled", authSTD, enrolledcourseSTD); // Get student enrolled courses
// router.get("/teacher/:id/enrolled", authTeacher, enrolledcourseTeacher); // Get teacher enrolled courses

// // ---------- Classes ----------
// router.post("/:courseId/teacher/:teacherId/add-class", authTeacher, addClass); // Add class to a course
// router.get("/classes/student/:studentId", authSTD, stdEnrolledCoursesClasses); // Get student classes
// router.get("/classes/teacher/:teacherId", authTeacher, teacherEnrolledCoursesClasses); // Get teacher classes

// // NEW: Route to delete a class
// router.delete("/:courseId/teacher/:teacherId/delete-class", authTeacher, deleteClass); // Delete a class from a course

// export default router;
