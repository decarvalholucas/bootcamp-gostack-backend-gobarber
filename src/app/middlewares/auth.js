import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // Not use promisify
    // jwt.verify(token, authConfig.secret, (err, res) => {
    //   if (err) return console.log(err);
    //   return console.log(res);
    // });
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
