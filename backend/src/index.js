// import dotenv from "dotenv"
// import db from './database/db.js';
// import {app} from './app.js'
// dotenv.config({
//     path: './.env'
// })

// console.log(`${process.env.DB_NAME}`);
// app.get("/",(req,res)=>{
//     res.send("Welcome to the e-Learning Platform");
// })

// db()
// .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
//     })
// })
// .catch((err) => {
//     console.log(" mongodb connection failed !!! ", err);
// })
// src/index.js
import dotenv from "dotenv"
import db from './database/db.js';
import { app } from './app.js'

dotenv.config({
    path: './.env'
})

// Establish database connection immediately when the function starts
// This is a good practice for Vercel's serverless environment
db();

app.get("/", (req, res) => {
    res.send("Welcome to the e-Learning Platform");
})

// Export the Express app instance directly for Vercel
export default app;