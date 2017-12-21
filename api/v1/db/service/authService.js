import jwt from 'jsonwebtoken';
import  * as userService from '../service/usersService';

const AUTH_HEADER = 'x-access-token';

export function authenticate(req, res) {

  userService.findUserByName(req.body.login).then(user => {

    // check if password matches
    if (user.password !== req.body.password) {
      res.json({ success: false, message: 'Authentication failed. Wrong password.' });
    } else {

      // if user is found and password is right
      // create a token with only our given payload
      // we don't want to pass in the entire user since that has the password
      const payload = {
        username: user.username
      };
      let token = jwt.sign(payload, 'superSecret', {
        expiresIn: "24h"
      });

      // return the information including token as JSON
      res.set(AUTH_HEADER, token);
      res.json({
        success: true,
        message: 'Enjoy your token!'
      });

    }
  }).catch(error => {
    res.status(500);
    res.send({error: "Database handling error"});
  });
}

export function authorize(req, res, next) {
  // check header or url parameters or post parameters for token
  let token = req.headers[AUTH_HEADER];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
}
