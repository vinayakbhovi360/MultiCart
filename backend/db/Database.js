import mongoose from "mongoose";

const connectDatabase = async () => {
  console.log(process.env.DB_URL);
  try {
    const db = await mongoose.connect(process.env.DB_URL);
    // console.log(process.env.DB_URL)
    console.log(`mongodb connected with server :${db.connection.host}`);
  } catch (err) {
    console.log("something went wrong " + err);
  }
};

export default connectDatabase;
