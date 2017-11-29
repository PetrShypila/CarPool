import jwt from 'jsonwebtoken';

export function generateToken(user) {

  let u = {
    name: user.name,
    username: user.username,
    admin: user.admin,
    _id: user._id.toString()
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}
