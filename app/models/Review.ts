import mongoose, { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
  userName: String,
  userEmail: String,
  userImage: String,
  reviewText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Review = models.Review || model("Review", ReviewSchema);
export default Review;