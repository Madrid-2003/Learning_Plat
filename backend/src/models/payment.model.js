// import mongoose from "mongoose";

// const paymentSchema = new mongoose.Schema({
//   razorpay_order_id: {
//     type: String,
//     required: true,
//   },
//   razorpay_payment_id: {
//     type: String,
//     required: true,
//   },
//   razorpay_signature: {
//     type: String,
//     required: true,
//   },
//   courseID: {
//     type:mongoose.Schema.Types.ObjectId,
//     ref: "course",
//     require:true,
//   },
//   studentID: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'student',
//     require:true,
//   }
// });

//  export const payment = mongoose.model("payment", paymentSchema);




import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  payu_txn_id: {
    type: String,
    required: true,
     unique: true,  
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    require: true,
  },
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    require: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'failure', 'pending'],
    default: 'pending'
  }
}, { timestamps: true });

export const payment = mongoose.model("payment", paymentSchema);