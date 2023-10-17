import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
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
