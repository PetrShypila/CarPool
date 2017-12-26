// Filter for pages which should be
// shown for user who isn't logged in
export default (req, res, next) => {
  if(req.session.user) {
    res.redirect('/home');
  } else {
    next();
  }
};
