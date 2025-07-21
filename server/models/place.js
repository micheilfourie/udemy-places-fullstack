import mongoose from "mongoose";

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

export default mongoose.model("Place", placeSchema);
