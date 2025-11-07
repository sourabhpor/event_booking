import mangoose from "mongoose";

const userSchema = new mangoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["ORGANIZER", "CUSTOMER"],
      default: "CUSTOMER",
    },
  },
  {
    timestamps: true,
  }
);
export default mangoose.model("User", userSchema);
