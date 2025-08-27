    import { Router } from "express";
    import { deleteClass } from "../controllers/course.controller.js"; // Ensure this path is correct
    import { authTeacher } from "../middlewares/teacherAuth.middleware.js";

    const router = Router();

    router.delete("/:courseId/teacher/:teacherId/delete-class", authTeacher, deleteClass);

    export default router;
    
