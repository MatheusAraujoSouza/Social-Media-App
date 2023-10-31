import jwt from 'jsonwebtoken';
import container from '../../app.js';
const Appsettings = container.resolve('AppSettingsLoader');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    jwt.verify(token, Appsettings.appSettings.JWT_SECRET, (err, decodedData) => {
      if (err) {
        return res.status(401).json({ message: 'Token verification failed' });
      }

      req.userId = decodedData.id;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default auth;
