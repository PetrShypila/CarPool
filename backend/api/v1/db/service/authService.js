import  * as userService from './usersService';

export function authenticate(req, res, next) {

  userService.findUserByName(req.body.username).then(user => {

    // check user exist and password matches
    if (user == null || user.password !== req.body.password) {
      res.status(401).json({ success: false, message: 'Authentication failed. Wrong username or password.' });
    } else {
      req.session.user = user;
      req.session.save((err) => {

        if(err) {
          next({error: "Error while saving user into the session", status: 500});
        } else {
          res.redirect('/map'); // Also doesn't work
          //res.status(200).json({});
        }
      });

    }
  }).catch(error => {
    next({message: "Database handling error", status: 500, error});
  });
}

// Access rights
export function authorize(req, res, next) {

  let {user} = req.session;

  if (user) {
    if(req.url === '/') {
      res.redirect('/map');
    } else {
      next();
    }
  } else {
    if(req.url === '/') {
      res.redirect('/login');
    } else {
      next({status: 401, message:"Unautharized"});
    }
  }
}
