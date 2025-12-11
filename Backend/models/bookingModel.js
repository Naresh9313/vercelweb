// // import mongoose from 'mongoose';

// // const bookingSchema = new mongoose.Schema(
// //   {
// //     userId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'User',
// //       required: true,
// //     },
// //     eventId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: 'Event',
// //       required: true,
// //     },
// //     tickets: {
// //       type: Number,
// //       default: 1,
// //     },
// //     status: {
// //       type: String,
// //       enum: ['confirmed', 'waitlisted', 'cancelled'],
// //       default: 'confirmed',
// //     },
// //   },
// //   { timestamps: true },
// // );

// // export default mongoose.model('Booking', bookingSchema);
// import mongoose from 'mongoose';

// const bookingSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     eventId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Event',
//       required: true,
//     },
//     tickets: {
//       type: Number,
//       default: 1,
//     },
//     status: {
//       type: String,
//       enum: ['confirmed', 'waitlisted', 'cancelled'],
//       default: 'confirmed',
//     },
//     attendanceStatus: {
//       type: String,
//       enum: ['pending', 'checked-in', 'checked-out'],
//       default: 'pending',
//     },

//     qrCode: {
//       type: String,
//     },
//   },
//   { timestamps: true },
// );

// export default mongoose.model('Booking', bookingSchema);
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    tickets: {
      type: Number,
      default: 1,
      min: 1,
    },
    status: {
      type: String,
      enum: ["confirmed", "waitlisted", "cancelled"],
      default: "confirmed",
    },
    qrCode: {
      type: String,
    },
    qrCodeData: {
      type: String, 
    },
    checkedIn: {
      type: Boolean,
      default: false,
    },
    checkInTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("Booking", bookingSchema);

export default bookingModel;
