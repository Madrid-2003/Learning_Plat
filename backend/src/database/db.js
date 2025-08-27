// import mongoose from "mongoose";

// const db = async() => {
//     try{
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/eLearning`)
//         console.log(`\n MongoDB connected !! DB HOST :: ${connectionInstance.connection.host}`)
//     } catch (error){
//         console.log("Mongodb connection error", error);
//         process.exit(1)
//     }
// }



// export default db

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // make sure this is at the top

const db = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`\nMongoDB connected !! DB HOST :: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Mongodb connection error", error);
    process.exit(1);
  }
};

export default db;
