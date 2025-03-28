import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRouts.js';
import messageRoutes from './routes/messageRoutes.js'

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/mongodb.js';
connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser());


// routes
app.use('/api/users', userRoutes);
app.use('/api/message', messageRoutes);



app.get('/', (req, res) => {
  res.send("Hari bol");
});

app.listen(PORT ,()=>{console.log(`Server Started! , ${PORT}`)});