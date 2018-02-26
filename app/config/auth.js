export default {
  key: "X-Api-Key",
  val: "3yr3472ytv734vt894ucy3y8q43t7347vwt",
  loginUrl: process.env.TEST ? "http://localhost:3000/login" : "https://cpoolrauth.herokuapp.com/login",
  signupUrl: process.env.TEST ? "http://localhost:3000/signup" : "https://cpoolrauth.herokuapp.com/signup"
};
