// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// // import {instance}  from "../app.js"
// import crypto from "crypto"
// import {payment} from "../models/payment.model.js"
// import { Teacher } from "../models/teacher.model.js";


// const coursePayment = asyncHandler(async(req,res)=>{
//     const {fees, } = req.body

//     if(!fees){
//       throw new ApiError(400,"fees is required")
//     }

//     const options = {
//         amount: fees,  // amount in the smallest currency unit
//         currency: "INR",
//         receipt: "order_rcptid_11"
//       };
//       const order = await instance.orders.create(options)

//       return res
//       .status(200)
//       .json( new ApiResponse(200, order,"order fetched"))
// })


// const getkey = asyncHandler(async(req,res)=>{
//   return res
//   .status(200)
//   .json(new ApiResponse(200,{key:process.env.KEY_ID}, "razor key fetched"))
// })


// const coursePaymentConfirmation = asyncHandler(async(req,res)=>{
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;
  
//   const studentID = req.Student._id
//   const courseID = req.params.courseID
//   console.log(courseID)

//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.KEY_SECRET)
//     .update(body.toString())
//     .digest("hex");

//   const isAuthentic = expectedSignature === razorpay_signature;

//   if (isAuthentic) {

//     const orderDetails = await payment.create({
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       courseID, 
//       studentID,
//     });

//     return res
//     .status(200)
//     .json(new ApiResponse(200,{orderDetails}, "payment confirmed" ))
//   } else {
//     throw new ApiError(400, "payment failed")
//   }
// })


// const teacherAmount = asyncHandler(async(req,res)=>{
//   const teacher = req.teacher

//   const newEnrolledStudentCount = await Teacher.aggregate([
//     {
//       $match: { _id: teacher._id }
//     },
//     {
//       $unwind: "$enrolledStudent"
//     },
//     {
//       $match: { "enrolledStudent.isNewEnrolled": true }
//     },
//     {
//       $group: {
//         _id: null,
//         count: { $sum: 1 }
//       }
//     }
//   ]);

//   const count = newEnrolledStudentCount.length > 0 ? newEnrolledStudentCount[0].count : 0;


//   await Teacher.findByIdAndUpdate(
//     teacher._id,
//     { $inc: { Balance: count * 500 } },
   
//   );

//   const newTeacher = await Teacher.findOneAndUpdate(
//     { _id: teacher._id, "enrolledStudent.isNewEnrolled": true },
//     { $set: { "enrolledStudent.$[elem].isNewEnrolled": false } },
//     { 
//         new: true,
//         arrayFilters: [{ "elem.isNewEnrolled": true }],
//     }
//   );

//   if(!newTeacher){
//     const newTeacher = await Teacher.findById(
//       teacher._id
//     )

//     return res
//     .status(200)
//     .json(new ApiResponse(200, {newTeacher}, "balance"))
//   }


//   return res
//   .status(200)
//   .json(new ApiResponse(200, {newTeacher}, "balance"))
  
// })


// const withdrawAmount = asyncHandler(async(req,res)=>{

//   const teacherId = req.teacher._id
//   const amount = req.body.amount

//   console.log(amount);

//   const teacher = await Teacher.findById(teacherId);

//   if (!teacher) {
//     return res.status(404).json({ message: "Teacher not found" });
//   }

//   if (teacher.Balance < amount) {
//     return res.status(400).json({ message: "Insufficient balance" });
//   }

//   teacher.Balance -= amount;
//   teacher.WithdrawalHistory.push({ amount });
//   await teacher.save();

//   const newTeacher = await Teacher.findById(teacherId)

//   return res
//   .status(200)
//   .json(new ApiResponse(200, {newTeacher}, "balance"))
  
// })



// export {coursePayment, getkey, coursePaymentConfirmation, teacherAmount, withdrawAmount}
















// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import crypto from "crypto";
// import { payment } from "../models/payment.model.js";
// import { Teacher } from "../models/teacher.model.js";
// import dotenv from "dotenv";

// dotenv.config();

// const coursePayment = asyncHandler(async (req, res) => {
//   const { fees, courseName } = req.body;

//   if (!fees) {
//     throw new ApiError(400, "fees is required");
//   }

//   const txnid = "txn_" + new Date().getTime(); // unique transaction ID
//   const amount = fees;
//   const productinfo = courseName || "Course";
//   const firstname = req.Student?.name || "Student";
//   const email = req.Student?.email || "test@example.com";

//   // PayU keys
//   const key = process.env.PAYU_KEY;
//   const salt = process.env.PAYU_SALT;

//   // hash sequence
// const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
//   const hash = crypto.createHash("sha512").update(hashString).digest("hex");

//   const payuURL = process.env.PAYU_BASE_URL || "https://test.payu.in/_payment";

//   const payuPayload = {
//     key,
//     txnid,
//     amount,
//     productinfo,
//     firstname,
//     email,
//     phone: req.Student?.phone || "9999999999",
//     surl: `${process.env.BACKEND_URL}/api/v1/payment/success/${req.params.courseID}`,
//     furl: `${process.env.BACKEND_URL}/api/v1/payment/failure/${req.params.courseID}`,
//     hash,
//   };

//   return res
//     .status(200)
//     .json(new ApiResponse(200, { action: payuURL, params: payuPayload }, "PayU order created"));
// });

// const coursePaymentConfirmation = asyncHandler(async (req, res) => {
//   const { txnid, status, hash, amount, productinfo, email } = req.body;
//   const courseID = req.params.courseID;
//   const studentID = req.Student._id;

//   const key = process.env.PAYU_KEY;
//   const salt = process.env.PAYU_SALT;

//   // verify hash
//   // const hashString = `${salt}|${status}|||||||||||${email}|${req.Student?.name}|${productinfo}|${amount}|${txnid}|${key}`;
// const hashString = `key∣${txnid}|amount∣${productinfo}|firstname∣${email}|||||||||||||${salt}`;

//   const expectedHash = crypto.createHash("sha512").update(hashString).digest("hex");

//   if (expectedHash !== hash) {
//     throw new ApiError(400, "Payment verification failed");
//   }

//   if (status === "success") {
//     const orderDetails = await payment.create({
//       payu_txn_id: txnid,
//       courseID,
//       studentID,
//       amount,
//       status,
//     });

//     return res
//       .status(200)
//       .json(new ApiResponse(200, { orderDetails }, "Payment confirmed"));
//   } else {
//     throw new ApiError(400, "Payment failed");
//   }
// });
// // const coursePaymentConfirmation = asyncHandler(async (req, res) => {
// //   const { txnid, status, hash: receivedHash, amount, productinfo, email } = req.body;
// //   const courseID = req.params.courseID;
// //   const studentID = req.Student._id;

// //   const key = process.env.PAYU_KEY;
// //   const salt = process.env.PAYU_SALT;
// //   const firstname = req.Student?.name || "Student";

// //   // Correct hash sequence for response verification
// //   const hashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
// //   const expectedHash = crypto.createHash("sha512").update(hashString).digest("hex");

// //   if (expectedHash !== receivedHash) {
// //     throw new ApiError(400, "Payment verification failed");
// //   }

// //   if (status === "success") {
// //     const orderDetails = await payment.create({
// //       payu_txn_id: txnid,
// //       courseID,
// //       studentID,
// //       amount,
// //       status,
// //     });

//     return res
//       .status(200)
//       .json(new ApiResponse(200, { orderDetails }, "Payment confirmed"));
//   } else {
//     throw new ApiError(400, "Payment failed");
//   }
// });

// // teacherAmount and withdrawAmount remain the same
// const teacherAmount = asyncHandler(async (req, res) => {
//   const teacher = req.teacher;

//   const newEnrolledStudentCount = await Teacher.aggregate([
//     { $match: { _id: teacher._id } },
//     { $unwind: "$enrolledStudent" },
//     { $match: { "enrolledStudent.isNewEnrolled": true } },
//     { $group: { _id: null, count: { $sum: 1 } } },
//   ]);

//   const count = newEnrolledStudentCount.length > 0 ? newEnrolledStudentCount[0].count : 0;

//   await Teacher.findByIdAndUpdate(teacher._id, { $inc: { Balance: count * 500 } });

//   const newTeacher = await Teacher.findOneAndUpdate(
//     { _id: teacher._id, "enrolledStudent.isNewEnrolled": true },
//     { $set: { "enrolledStudent.$[elem].isNewEnrolled": false } },
//     {
//       new: true,
//       arrayFilters: [{ "elem.isNewEnrolled": true }],
//     }
//   );

//   if (!newTeacher) {
//     const fallbackTeacher = await Teacher.findById(teacher._id);
//     return res.status(200).json(new ApiResponse(200, { fallbackTeacher }, "balance"));
//   }

//   return res.status(200).json(new ApiResponse(200, { newTeacher }, "balance"));
// });

// const withdrawAmount = asyncHandler(async (req, res) => {
//   const teacherId = req.teacher._id;
//   const amount = req.body.amount;

//   const teacher = await Teacher.findById(teacherId);
//   if (!teacher) return res.status(404).json({ message: "Teacher not found" });

//   if (teacher.Balance < amount) {
//     return res.status(400).json({ message: "Insufficient balance" });
//   }

//   teacher.Balance -= amount;
//   teacher.WithdrawalHistory.push({ amount });
//   await teacher.save();

//   const newTeacher = await Teacher.findById(teacherId);

//   return res.status(200).json(new ApiResponse(200, { newTeacher }, "balance"));
// });

// export { coursePayment, coursePaymentConfirmation, teacherAmount, withdrawAmount };






import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";
import { payment } from "../models/payment.model.js";
import { Teacher } from "../models/teacher.model.js";
import dotenv from "dotenv";
import { course } from "../models/course.model.js"; // Added import for course model
import { Sendmail } from "../utils/Nodemailer.js"; // Added import for nodemailer

dotenv.config();


//sdfsffsd
// const handlePaymentRedirect = asyncHandler(async (req, res) => {
//     const { status, txnid } = req.query; // Capture status and txnid from query parameters
//     const { courseID } = req.params;

//     if (status === 'success') {
//         return res.redirect(`${process.env.FRONTEND_URL}/payment-success?courseId=${courseID}&txnid=${txnid}`);
//     } else {
//         return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?courseId=${courseID}`);
//     }
// });


const coursePayment = asyncHandler(async (req, res) => {
  //yahape courseid add kiya tha extra me 
  //yahape dekho
  const { fees, courseName } = req.body;

  if (!fees) {
    throw new ApiError(400, "fees is required");
  }

  const txnid = "txn_" + new Date().getTime(); // unique transaction ID
  const amount = fees;
  const productinfo = courseName || "Course";
  const firstname = req.Student?.Firstname || "Student"; // Use Firstname property
  const email = req.Student?.Email || "test@example.com"; // Use Email property
 


  // PayU keys from .env
  const key = process.env.PAYU_KEY;
  const salt = process.env.PAYU_MERCHANT_SALT;

  // HASH SEQUENCE FOR INITIATION
  // The correct order is key|txnid|amount|productinfo|firstname|email|...|salt
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  const hash = crypto.createHash("sha512").update(hashString).digest("hex");

// The correct order is: salt|status|udf1|udf2|udf3|udf4|udf5|||||email|firstname|productinfo|amount|txnid|key
// const hashString = `${salt}|${status}|${req.body.udf1}|${req.body.udf2}|${req.body.udf3}|${req.body.udf4}|${req.body.udf5}|||||${req.body.email}|${req.body.firstname}|${req.body.productinfo}|${req.body.amount}|${req.body.txnid}|${key}`;
// const expectedHash = crypto.createHash("sha512").update(hashString).digest("hex");

  const payuURL = process.env.PAYU_BASE_URL || "https://test.payu.in/_payment";

  const payuPayload = {
    key,
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    phone: req.Student?.Phone || "9999999999", // Use Phone property
 surl: `${process.env.BACKEND_URL}/api/v1/payment/confirmation`, // Changed to a generic confirmation route
  furl: `${process.env.BACKEND_URL}/api/v1/payment/confirmation`, // Changed to a generic confirmation route
//  surl: `${process.env.BACKEND_URL}/api/payment/payu/confirmation/course/${courseID}`,
// furl: `${process.env.BACKEND_URL}/api/payment/payu/confirmation/course/${courseID}`,

    hash,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, { action: payuURL, params: payuPayload }, "PayU order created"));
});



// const coursePaymentConfirmation = asyncHandler(async (req, res) => {
//   // PayU sends all payment details in the request body
//   const { txnid, status, hash, amount, productinfo, email } = req.body;
//   const courseID = req.params.courseID;
//   const studentID = req.Student._id;

//   const key = process.env.PAYU_MERCHANT_KEY;
//   const salt = process.env.PAYU_MERCHANT_SALT;

//   // HASH SEQUENCE FOR RESPONSE VERIFICATION
//   // The correct order is: salt|status|...|email|firstname|productinfo|amount|txnid|key
//   // Note: Your previous code had the order of `email`, `firstname` and `productinfo` swapped
//   const firstname = req.Student?.Firstname || "Student"; // Use the correct property
//   const hashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;

//   const expectedHash = crypto.createHash("sha512").update(hashString).digest("hex");

//   if (expectedHash !== hash) {
//     throw new ApiError(400, "Payment verification failed");
//   }

//   if (status === "success") {
//     const orderDetails = await payment.create({
//       payu_txn_id: txnid,
//       courseID,
//       studentID,
//       amount,
//       status,
//     });
    
//     // Call the logic to enroll the student here, as payment is confirmed
//     const selectedCourse = await course.findByIdAndUpdate(courseID, 
//       { $push: { enrolledStudent: studentID } }, 
//       { new: true }
//     );
    
//     if (!selectedCourse) {
//       throw new ApiError(400, "failed to add student in course schema");
//     }
    
//     const teacherID = selectedCourse.enrolledteacher;
//     const teacher = await Teacher.findByIdAndUpdate(teacherID,
//       { $push: { enrolledStudent: { studentId: studentID, isNewEnrolled: true } } }, // Assuming you want to track new enrollments
//       { new: true }
//     );
    
//     if (!teacher) {
//       throw new ApiError(400, "Failed to update teacher's enrolled students");
//     }

//     // Send confirmation email to student
//     await Sendmail(email, `Payment Confirmation for Course Purchase`,
//       `<html>...</html>` // Your HTML email body
//     );

//     return res
//       .status(200)
//       .json(new ApiResponse(200, { orderDetails }, "Payment confirmed and student enrolled successfully"));
//   } else {
//     throw new ApiError(400, "Payment failed");
//   }
// });








// const coursePaymentConfirmation = asyncHandler(async (req, res) => {
//     // PayU sends all payment details in the request body
//     const { txnid, status, hash, amount, productinfo, email } = req.body;
//     const courseID = req.params.courseID;
//     const studentID = req.Student._id;

//     const key = process.env.PAYU_KEY;
//     const salt = process.env.PAYU_MERCHANT_SALT;

//     // HASH SEQUENCE FOR RESPONSE VERIFICATION
//     // The correct order is: salt|status|...|email|firstname|productinfo|amount|txnid|key
//     const firstname = req.Student?.Firstname;
//     const hashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;

//     const expectedHash = crypto.createHash("sha512").update(hashString).digest("hex");

//     if (expectedHash !== hash) {
//         // Redirect to a frontend failure page
//         return res.redirect(`${process.env.FRONTEND_URL}/payment-failure`);
//     }

//     if (status === "success") {
//         const orderDetails = await payment.create({
//             payu_txn_id: txnid,
//             courseID,
//             studentID,
//             amount,
//             status,
//         });
        
//         // Call the logic to enroll the student here, as payment is confirmed
//         const selectedCourse = await course.findByIdAndUpdate(courseID, 
//             { $push: { enrolledStudent: studentID } }, 
//             { new: true }
//         );
        
//         if (!selectedCourse) {
//             // This is a critical error, but for user experience, still redirect
//             console.error("Failed to add student to course schema after payment.");
//             return res.redirect(`${process.env.FRONTEND_URL}/payment-failure`);
//         }
        
//         const teacherID = selectedCourse.enrolledteacher;
//         const teacher = await Teacher.findByIdAndUpdate(teacherID,
//             { $push: { enrolledStudent: { studentId: studentID, isNewEnrolled: true } } },
//             { new: true }
//         );
        
//         if (!teacher) {
//             console.error("Failed to update teacher's enrolled students after payment.");
//             return res.redirect(`${process.env.FRONTEND_URL}/payment-failure`);
//         }

//         // Send confirmation email to student
//         await Sendmail(email, `Payment Confirmation for Course Purchase`,
//             `<html>...</html>` // Your HTML email body
//         );

//         // Redirect to a frontend success page with relevant details (if needed)
//         return res.redirect(`${process.env.FRONTEND_URL}/payment-success?status=success&txnid=${txnid}`);
//     } else {
//         // For failed or other statuses, redirect to a frontend failure page
//         return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?status=${status}`);
//     }
// });
// In payment.controller.js

// const coursePaymentConfirmation = asyncHandler(async (req, res) => {
//     // Ensure req.Student is authenticated before proceeding
//     if (!req.Student) {
//         console.error("Authentication failed during PayU redirect. req.Student is undefined.");
//         return res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
//     }

//     // PayU sends all payment details in the request body
//     // It's crucial that Express's body-parser middleware is correctly configured for application/x-www-form-urlencoded
//     const { txnid, status, hash, amount, productinfo, email } = req.body;
//     const courseID = req.params.courseID;
//     const studentID = req.Student._id;

//     // --- CRITICAL CHECK FOR TXNID ---
//     if (!txnid) {
//         console.error("PAYU CONFIRMATION ERROR: Missing transaction ID (txnid) in PayU redirect body.");
//         // Redirect to failure, as we cannot process without a valid transaction ID
//         return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?error=missing_txnid`);
//     }
//     // --- END CRITICAL CHECK ---

//     const key = process.env.PAYU_KEY;
//     const salt = process.env.PAYU_MERCHANT_SALT;
//     const firstname = req.Student?.Firstname; // Use optional chaining for safety

//     // Correct HASH SEQUENCE for RESPONSE VERIFICATION
//     const hashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
//     const expectedHash = crypto.createHash("sha512").update(hashString).digest("hex");

//     if (expectedHash !== hash) {
//         console.error("PAYU CONFIRMATION ERROR: Hash mismatch. Expected:", expectedHash, "Received:", hash);
//         return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?error=hash_mismatch`);
//     }

//     if (status === "success") {
//         // Check if a payment with this txnid already exists to prevent duplicate entries
//         const existingPayment = await payment.findOne({ payu_txn_id: txnid });
//         if (existingPayment) {
//             console.warn(`PAYU CONFIRMATION WARNING: Payment with txnid ${txnid} already processed. Redirecting to success.`);
//             return res.redirect(`${process.env.FRONTEND_URL}/payment-success?status=success&txnid=${txnid}`);
//         }

//         await payment.create({
//             payu_txn_id: txnid,
//             courseID,
//             studentID,
//             amount,
//             status,
//         });
        
//         const selectedCourse = await course.findByIdAndUpdate(courseID, 
//             { $push: { enrolledStudent: studentID } }, 
//             { new: true }
//         );
        
//         if (!selectedCourse) {
//             console.error("Failed to add student to course schema after payment. Course ID:", courseID);
//             return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?error=course_enrollment_failed`);
//         }
        
//         const teacherID = selectedCourse.enrolledteacher;
//         await Teacher.findByIdAndUpdate(teacherID,
//             { $push: { enrolledStudent: { studentId: studentID, isNewEnrolled: true } } },
//             { new: true }
//         );
        
//         await Sendmail(email, `Payment Confirmation for Course Purchase`,
//             `<html>...</html>` // Your HTML email body
//         );

//         return res.redirect(`${process.env.FRONTEND_URL}/payment-success?status=success&txnid=${txnid}`);
//     } else {
//         console.error("PAYU CONFIRMATION ERROR: Payment status is not success. Status:", status);
//         return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?status=${status}`);
//     }
// });
const coursePaymentConfirmation = asyncHandler(async (req, res) => {
    // Ensure req.Student is authenticated before proceeding
    if (!req.Student) {
        console.error("Authentication failed during PayU redirect. req.Student is undefined.");
        // Redirect to login or a generic error page if student is not authenticated
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
    }

    const payuTxnId = req.body.txnid || req.body.mihpayid; // Check for both common keys
    const { status, hash, amount, productinfo, email } = req.body;
    const courseID = req.params.courseID;
    const studentID = req.Student._id;

    // --- CRITICAL CHECK FOR TXNID ---
    if (!payuTxnId || typeof payuTxnId !== 'string' || payuTxnId.trim() === '') {
        console.error("PAYU CONFIRMATION ERROR: Missing or invalid transaction ID (txnid) in PayU redirect body.");
        return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?error=missing_or_invalid_txnid`);
    }
    // --- END CRITICAL CHECK ---

    const key = process.env.PAYU_KEY;
    const salt = process.env.PAYU_MERCHANT_SALT;
    const firstname = req.Student?.Firstname; // Use optional chaining for safety

    // Correct HASH SEQUENCE for RESPONSE VERIFICATION
    // Ensure 'email' and 'firstname' are correctly populated from req.Student if not provided by PayU
    const finalEmail = email || req.Student?.Email;
    const finalFirstname = firstname || req.Student?.Firstname;

    const hashString = `${salt}|${status}|||||||||||${finalEmail}|${finalFirstname}|${productinfo}|${amount}|${payuTxnId}|${key}`;
    const expectedHash = crypto.createHash("sha512").update(hashString).digest("hex");

    if (expectedHash !== hash) {
        console.error("PAYU CONFIRMATION ERROR: Hash mismatch. Expected:", expectedHash, "Received:", hash);
        return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?error=hash_mismatch`);
    }

    if (status === "success") {
        // Check if a payment with this txnid already exists to prevent duplicate entries
        const existingPayment = await payment.findOne({ payu_txn_id: payuTxnId });
        if (existingPayment) {
            console.warn(`PAYU CONFIRMATION WARNING: Payment with txnid ${payuTxnId} already processed. Redirecting to success.`);
            return res.redirect(`${process.env.FRONTEND_URL}/payment-success?status=success&txnid=${payuTxnId}`);
        }

        try {
            await payment.create({
                payu_txn_id: payuTxnId, // Use the correctly extracted transaction ID
                courseID,
                studentID,
                amount,
                status,
            });

            const selectedCourse = await course.findByIdAndUpdate(courseID,
                { $push: { enrolledStudent: studentID } },
                { new: true }
            );

            if (!selectedCourse) {
                console.error("Failed to add student to course schema after payment. Course ID:", courseID);
                // If course enrollment fails, it's still a failure for the user
                return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?error=course_enrollment_failed`);
            }

            const teacherID = selectedCourse.enrolledteacher;
            await Teacher.findByIdAndUpdate(teacherID,
                { $push: { enrolledStudent: { studentId: studentID, isNewEnrolled: true } } },
                { new: true }
            );

            // Only send success email if all steps above are successful
            await Sendmail(finalEmail, `Payment Confirmation for Course Purchase`,
                `<html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h1 style="color: #4CAF50; text-align: center;">Payment Successful!</h1>
                    <p style="font-size: 16px; text-align: center;">Dear ${finalFirstname},</p>
                    <p style="font-size: 16px; text-align: center;">We are pleased to inform you that your payment for the course <strong>${productinfo}</strong> has been successfully processed.</p>
                    <p style="font-size: 16px;">You can now access your course by logging into your account.</p>
                    <p style="font-size: 16px;">Transaction ID: <strong>${payuTxnId}</strong></p>
                    <p style="font-size: 16px;">Amount Paid: <strong>Rs. ${amount}</strong></p>
                    <p style="font-size: 16px;">Best regards,</p>
                    <p style="font-size: 16px;"><strong>The Shiksharthee Team</strong></p>
                    <p style="font-size: 14px;">&copy; 2024 Shiksharthee. All rights reserved.</p>
                    </body>
                </html>`
            );

            return res.redirect(`${process.env.FRONTEND_URL}/payment-success?status=success&txnid=${payuTxnId}`);

        } catch (dbError) {
            console.error("PAYU CONFIRMATION ERROR: Database operation failed during payment confirmation:", dbError);
            // Redirect to failure if any database operation fails
            return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?error=database_error&txnid=${payuTxnId}`);
        }

    } else {
        console.error("PAYU CONFIRMATION ERROR: Payment status is not success. Status:", status);
        return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?status=${status}&txnid=${payuTxnId}`);
    }
});
const teacherAmount = asyncHandler(async (req, res) => {
  const teacher = req.teacher;

  const newEnrolledStudentCount = await Teacher.aggregate([
    { $match: { _id: teacher._id } },
    { $unwind: "$enrolledStudent" },
    { $match: { "enrolledStudent.isNewEnrolled": true } },
    { $group: { _id: null, count: { $sum: 1 } } },
  ]);

  const count = newEnrolledStudentCount.length > 0 ? newEnrolledStudentCount[0].count : 0;

  await Teacher.findByIdAndUpdate(teacher._id, { $inc: { Balance: count * 500 } });

  const newTeacher = await Teacher.findOneAndUpdate(
    { _id: teacher._id, "enrolledStudent.isNewEnrolled": true },
    { $set: { "enrolledStudent.$[elem].isNewEnrolled": false } },
    {
      new: true,
      arrayFilters: [{ "elem.isNewEnrolled": true }],
    }
  );

  if (!newTeacher) {
    const fallbackTeacher = await Teacher.findById(teacher._id);
    return res.status(200).json(new ApiResponse(200, { fallbackTeacher }, "balance"));
  }

  return res.status(200).json(new ApiResponse(200, { newTeacher }, "balance"));
});

const withdrawAmount = asyncHandler(async (req, res) => {
  const teacherId = req.teacher._id;
  const amount = req.body.amount;

  const teacher = await Teacher.findById(teacherId);
  if (!teacher) return res.status(404).json({ message: "Teacher not found" });

  if (teacher.Balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  teacher.Balance -= amount;
  teacher.WithdrawalHistory.push({ amount });
  await teacher.save();

  const newTeacher = await Teacher.findById(teacherId);

  return res.status(200).json(new ApiResponse(200, { newTeacher }, "balance"));
});

export { coursePayment, coursePaymentConfirmation, teacherAmount, withdrawAmount};