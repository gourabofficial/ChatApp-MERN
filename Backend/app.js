import express from 'express';
import userRoutes from './routes/userRouts.js';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/mongodb.js';
connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

// routes

app.use('/api/users', userRoutes);



app.get('/', (req, res) => {
  res.send("Hari bol");
});

app.listen(PORT ,()=>{console.log(`Server Started! , ${PORT}`)});