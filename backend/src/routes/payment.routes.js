// import { Router } from "express";
// import { authSTD } from "../middlewares/stdAuth.middleware.js";
// import { coursePayment, coursePaymentConfirmation, getkey, teacherAmount, withdrawAmount } from "../controllers/payment.controller.js";
// import { authTeacher } from "../middlewares/teacherAuth.middleware.js";


// const router = Router()

// router.route("/course/:courseID/:coursename").post(authSTD, coursePayment)

// router.route("/razorkey").get(authSTD, getkey)

// router.route("/confirmation/course/:courseID").post(authSTD, coursePaymentConfirmation)

// router.route("/teacher/:teacherID/balance").post(authTeacher, teacherAmount)

// router.route("/teacher/:teacherID/withdraw").post(authTeacher, withdrawAmount)




// export default router;












import { Router } from "express";
import { authSTD } from "../middlewares/stdAuth.middleware.js";
import { authTeacher } from "../middlewares/teacherAuth.middleware.js";
import {
  coursePayment,
  coursePaymentConfirmation,
  teacherAmount,
  withdrawAmount
} from "../controllers/payment.controller.js";

const router = Router();

// Student pays for a course
router.route("/payu/course/:courseID/:coursename").post(authSTD, coursePayment);

// PayU will redirect here on success
router.route("/payu/confirmation/course/:courseID").post(authSTD, coursePaymentConfirmation);

// Teacher balance check
router.route("/teacher/:teacherID/balance").post(authTeacher, teacherAmount);

// Teacher withdraw money
router.route("/teacher/:teacherID/withdraw").post(authTeacher, withdrawAmount);

export default router;
