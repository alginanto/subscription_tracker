import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name:{
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [2, "Name must be at least 2 characters"],
        maxlength: [100, "Name must be less than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "EUR", "GBP", "INR"], 
        default: "INR",},
    frequency: {
      type: String,
      required: [true, "Frequency is required"],
      enum: ["monthly", "yearly"], 
        default: "monthly",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["entertainment", "utilities", "food", "health", "other"], 
        default: "other",
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
