import express from 'express';
import dotenv from 'dotenv';

const app = express()
dotenv.config();

const portNumber = process.env.PORT


app.listen(portNumber, () => {
  console.log(`server running on ${portNumber}`)
})