const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: [true, "Please project name is required"],
    },

    description: {
      type: String,
      required: [true, "Please give detailed description about the project"],
    },

    images: {
      type: String,
      required: [true, "Please upload images of the project"],
    },

    location: {
      type: String,
      required: [true, "Please indicate the exact location of the project"],
    },

    price: {
      type: Number,
      default: 0,
    },

    estateDeveloper: {
      type: Schema.Types.ObjectId,
      ref: "EstateDeveloper",
      // required: [true, "Please provide the Project Developer"],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Buyer",
      },
    ],
  },

  { timestamps: true }
);

module.exports = model("Project", projectSchema);
