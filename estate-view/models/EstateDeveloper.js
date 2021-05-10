const { Schema, model } = require("mongoose");

const estateDeveloperSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },

    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },

    companyName: {
      type: String,
      required: [true, "company name is required."],
    },
    registrationId: {
      type: String,
      required: [true, "Please provide your Registration Number"],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("EstateDeveloper", estateDeveloperSchema);
