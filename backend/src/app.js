import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import Razorpay from "razorpay"

const app = express();

// ✅ Correct CORS setup
app.use(cors({
  origin: [
    "http://localhost:5173",                 // Dev frontend
    "https://learning-plat-m5wb.vercel.app"  // Prod frontend
  ],
  credentials: true
}));

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// PayU config
export const payuConfig = {
  key: process.env.PAYU_KEY,
  salt: process.env.PAYU_MERCHANT_SALT,
  env: process.env.PAYU_ENV === "test"
    ? "https://test.payu.in/_payment"
    : "https://secure.payu.in/_payment"
};

// ✅ Routes
import studentRouter from "./routes/student.routes.js";
app.use("/student", studentRouter);

import teacherRouter from "./routes/teacher.routes.js";
app.use("/teacher", teacherRouter);

import courseRouter from "./routes/course.routes.js";
app.use("/course", courseRouter);

import adminRouter from "./routes/admin.routes.js";
app.use("/admin", adminRouter);

import paymentRouter from "./routes/payment.routes.js";
app.use("/payment", paymentRouter);

import classRouter from "./routes/class.routes.js";
app.use("/class", classRouter);

export { app };
