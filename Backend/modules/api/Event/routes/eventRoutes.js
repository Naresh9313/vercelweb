import express from 'express';
import {addEvent,deleteEvent,getEvent,updateEvent,} from '../controller/eventController.js';
import { authMiddleware } from '../../../../middleware/authMiddleware.js';
import { upload } from '../../../../middleware/multer.js';
import { verifyRole } from '../../../../middleware/authMiddleware.js';

const eventRoutes = express.Router();


eventRoutes.post('/addEvent',upload.single('eimage'),authMiddleware,verifyRole("Organization"),addEvent);
eventRoutes.get('/getEvent',authMiddleware,verifyRole("User", "Organization"),getEvent);
eventRoutes.put('/updateEvent',authMiddleware,verifyRole("Organization"),updateEvent);
eventRoutes.delete('/deleteEvent',authMiddleware,verifyRole("Organization"), deleteEvent);

export default eventRoutes;
