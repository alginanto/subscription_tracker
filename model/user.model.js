import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please fill a valid email address",
      ],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: 2,
      maxLength: 50,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
    // subscriptions: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Subscription",
    //   },
    // ],
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
