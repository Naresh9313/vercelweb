import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './database/db.js';
import cors from 'cors';
import userRoutes from './modules/api/auth/routes/authRoutes.js';
import eventRoutes from './modules/api/Event/routes/eventRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import bookingRoutes from './modules/api/Booking/routes/bookingRoutes.js';


dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: 'https://liveweb-jkan.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);


app.use('/auth', userRoutes);
app.use('/event', eventRoutes);
app.use('/booking', bookingRoutes);

app.get("/", (req, res) => {
  res.send("Vercel Backend Working!");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(process.env.PORT, () => {
  console.log(`Server Is Running On ${process.env.PORT}`.bgCyan.white);
});

connectDB;
