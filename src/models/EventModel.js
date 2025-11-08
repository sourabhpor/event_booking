import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    city: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    date: {
      type: Date,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "CANCELLED"],
      default: "DRAFT",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", eventSchema);
