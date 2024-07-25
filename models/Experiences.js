import { Schema, model } from "mongoose";

const experienceSchema = new Schema(
  {
    role: {
      type: String,
    //   required: true,
    },
    company: {
      type: String,
    //   required: true,
    },
    startDate: {
      type: Date,
    //   required: true,
    },
    endDate: {
      type: Date,
    //   required: true,
    },
    description: {
      type: String,
    //   required: true,
    },
    area: {
      type: String,
    //   required: true,
    }
  },
  {
    // Opzioni dello schema:
    collection: "experience", // Specifica il nome della collezione nel database MongoDB
  }
);

const Experience = model("Experience", experienceSchema);
export default Experience;