import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postsRoutes from './infrastructure/routes/postsRoutes.js';
import userRoutes from './infrastructure/routes/usersRoutes.js';
import auth from "./infrastructure/middleware/auth.js";
import container from './app.js';
const Appsettings = container.resolve('AppSettingsLoader');

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(auth);
app.use(postsRoutes);
app.use(userRoutes);

const mongoURI = `${Appsettings.appSettings.MONGO_URI}`;
console.log(`The mongo uri is : ${mongoURI}`)

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const port = Appsettings.appSettings.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});