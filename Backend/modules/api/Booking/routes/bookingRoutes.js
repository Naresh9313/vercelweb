import express from 'express';
import {attendeeDashboard,bookingEvent,cancelBooking,checkInAttendee,eventAttendees,} from '../controller/bookingController.js';
import { authMiddleware, verifyRole } from "../../../../middleware/authMiddleware.js";

const bookingRoutes = express.Router();

bookingRoutes.get('/eventBooking',authMiddleware,verifyRole("User"),bookingEvent);
bookingRoutes.put('/cancel',authMiddleware,verifyRole("User"),cancelBooking);
bookingRoutes.get('/dashboard',authMiddleware,verifyRole("Organization"),attendeeDashboard);
bookingRoutes.post('/check-in',authMiddleware,verifyRole("Organization"), checkInAttendee);
bookingRoutes.get('/event-attendees',authMiddleware,verifyRole("Organization"),eventAttendees);

export default bookingRoutes;
