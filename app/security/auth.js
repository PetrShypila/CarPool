import  UserService from '../actions/services/usersService';

function login(req, res) {
  UserService.loginUser(req.body.username, req.body.password).then(response => {
    switch(response.status) {
      case 200:
        req.session.user = response.data;
        req.session.save(()=> {
          res.redirect('/home');
        });
        break;
      case 401:
      case 404:
      case 500:
        res.status(response.status).end(); break;
      default:
        res.status(response.status).send("Unexpected error."); break;
    }
  }).catch(error => {
    res.status(500).json(error);
  });
}

function signup(req, res) {
  UserService.signupUser(req.body).then(response => {
    switch(response.status) {
      case 201:
        req.session.user = response.data;
        req.session.save(()=> {
          res.redirect('/home');
        });
        break;
      case 500:
      case 409:
        res.status(response.status).end(); break;
      default:
        res.status(response.status).send("Unexpected error."); break;
    }
  }).catch(error => {
    res.status(500).json(error);
  });

}

export default {
  login,
  signup
};
