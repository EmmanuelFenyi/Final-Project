const { Schema, model } = require("mongoose");

const buyerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },

    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Buyer", buyerSchema);
