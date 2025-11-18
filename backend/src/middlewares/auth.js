import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const isArtist = (req, res, next) => {
  if (req.user.type !== 'artista') {
    return res.status(403).json({ error: 'Access denied. Artist only.' });
  }
  next();
};

export const isCliente = (req, res, next) => {
  if (req.user.type !== 'cliente') {
    return res.status(403).json({ error: 'Access denied. Client only.' });
  }
  next();
};
