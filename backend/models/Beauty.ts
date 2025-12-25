import mongoose, { Schema, Document } from "mongoose";

export interface IBeauty extends Document {
  name: string;
  desc: string;
  emoji: string;
  price:String;
}

const beautySchema: Schema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  emoji: { type: String },
  price:{type:String},
});

// Specify the exact collection name in MongoDB
export default mongoose.model<IBeauty>("Beauty", beautySchema, "beauty");
