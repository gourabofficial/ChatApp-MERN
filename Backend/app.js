import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/mongodb.js';
connectDB();


const app = express();
const PORT = process.env.PORT ||5000;

app.get('/', (req, res) => {
  res.send("Hari bol");
});

app.listen(PORT ,()=>{console.log(`Server Started! , ${PORT}`)});