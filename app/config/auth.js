export default {
  key: "X-Api-Key",
  val: "3yr3472ytv734vt894ucy3y8q43t7347vwt",
  loginUrl: process.env.DEV ? "http://localhost:4000/login" : "https://cpoolrauth.herokuapp.com/login",
  signupUrl: process.env.DEV ? "http://localhost:4000/signup" : "https://cpoolrauth.herokuapp.com/signup"
};
