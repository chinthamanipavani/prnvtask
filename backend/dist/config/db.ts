import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://pavani:pavani5462@cluster0.j7in1ia.mongodb.net/prnv"); 
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
