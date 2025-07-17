import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
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
      default: "INR",
    },
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
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
      //   enum: ["credit_card", "debit_card", "paypal", "bank_transfer"],
      //     default: "credit_card",
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["active", "inactive", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Start date cannot be in the future",
      },
      default: Date.now,
    },
    renewalDate: {
      type: Date,
      required: [true, "Renewal date is required"],
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
  },
  { timestamps: true }
);
//Auto-calculate renewal date based on frequency
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriod[this.frequency]
    );
  }
  //Auto-update renewal date on update
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
