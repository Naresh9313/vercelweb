import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    ename: {
      type: String,
      required: true,
    },
    eimage: {
      type: String,
    },
    edate: {
      type: String,
      required: true,
    },
    evenues: {
      type: String,
      required: true,
    },
    eprice: {
      type: String,
      required: true,
    },
    elocation: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      default: 100,
    },
    seatsSold: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default mongoose.model('Event', eventSchema);
