import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/prnv"); // <- Make sure this is correct
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
