import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    eventtype: {
      type: Array,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    spots: {
      required: true,
      type: Number,
      default: 0,
    },
    file: {
      type: String,
  
    },
    date: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },

    attendess: [
      {
        name: {
          type: String,
        },
        emailaddres: {
          type: String,
          unique: true,
        },
        gender: [Array],
      },
    ],
  },

  { timestamps: true }
);

export default mongoose.model("Events", EventsSchema);
