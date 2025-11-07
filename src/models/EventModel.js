import mangoose from "mongoose";

const eventSchema = new mangoose.Schema(
  {
    userId: {
      type: mangoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    bookingId: {
      type: String,
      unique: true,
    },
    totalPaid: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "CONFIRMED",
    },
  },
  {
    timestamps: true,
  }
);
export default mangoose.model("Event", eventSchema);
