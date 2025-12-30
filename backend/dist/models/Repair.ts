import mongoose, { Schema, Document } from "mongoose";

export interface IHomeRepair extends Document {
  name: string;
  desc: string;
  emoji: string;
  price:string;
}

const homeRepairSchema: Schema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  emoji: { type: String },
  price: { type: String }
});

export default mongoose.model<IHomeRepair>("HomeRepair", homeRepairSchema, "repair");
