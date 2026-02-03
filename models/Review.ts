import mongoose, { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
  userEmail: { type: String, required: true },
  userName: String,
  userImage: String,
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Review = models.Review || model("Review", ReviewSchema);
export default Review;