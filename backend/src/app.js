import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import Razorpay from "razorpay"

const app = express();

app.use(cors())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



export const payuConfig = {
  // key: process.env.PAYU_MERCHANT_KEY,
  key: process.env.PAYU_KEY,
  salt: process.env.PAYU_MERCHANT_SALT,
  env: process.env.PAYU_ENV === "test"
    ? "https://test.payu.in/_payment"
    : "https://secure.payu.in/_payment"
};


//student routes
import studentRouter from "./routes/student.routes.js";
app.use("/api/student", studentRouter)


//teacher routes
import teacherRouter from "./routes/teacher.routes.js"
app.use("/api/teacher", teacherRouter)

//course routes
import courseRouter from "./routes/course.routes.js"
app.use("/api/course", courseRouter)

import adminRouter from "./routes/admin.routes.js"
app.use("/api/admin", adminRouter)

import paymentRouter from "./routes/payment.routes.js"
app.use("/api/payment", paymentRouter)
//dd
import classRouter from "./routes/class.routes.js"; // Import the new class router

// ... (other app.use() statements)

// Ensure this app.use() statement is present:
app.use("/api/class", classRouter); // Use the new class router

export {app}

