import mongoose from "mongoose";

const asttendSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  gender: {
    type: String,
  },
});
const EventSchema = new mongoose.Schema(
  {
    eventImg: {
      type: String,
    },
    userfullname: {
      type: String,
    },
    title: {
      type: String,
    },
    details: {
      type: String,
    },
    eventtype: {
      type: Array,
    },
    address: {
      type: String,
    },
    spots: {
      type: Number,
      default: 0,
    },
    file: {
      type: String,
    },
    date: {
      type: String,
    },
    userId: {
      type: String,
    },

    attendees: [asttendSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);

/*"title":"hiejdjd",
	"details":"hahhdhdheaha",
	"eventtype":"oenddline",
	"address":"1el",
	"spots":"12",
	"date":"12--12e-12"*/
