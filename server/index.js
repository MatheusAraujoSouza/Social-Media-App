import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postsRoutes from './infrastructure/routes/postsRoutes.js';
import userRoutes from './infrastructure/routes/usersRoutes.js';
import auth from "./infrastructure/middleware/auth.js";

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(auth);
app.use(postsRoutes);
app.use(userRoutes);

const mongoURI = `${process.env.API_MONGO_URI}`;
console.log(`The mongo uri is : ${mongoURI}`)

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const port = process.env.API_PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});