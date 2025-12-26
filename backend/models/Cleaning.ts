import mongoose, { Schema, Document } from "mongoose";

export interface ICleaning extends Document {
  name: string;
  desc: string;
  emoji: string;
  price:String;
}

const cleaningSchema: Schema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  emoji: { type: String },
  price:{type: String},
});

export default mongoose.model<ICleaning>("Cleaning", cleaningSchema, "home");
