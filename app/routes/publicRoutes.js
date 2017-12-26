import path from 'path';
import express from 'express';
import security from '../security';

const publicRouter = express.Router();

publicRouter.get('/', security.publicAccess, (req, res) => (res.sendFile(path.join( __dirname, '../view/index.html'))));
publicRouter.get('/login', security.publicAccess, (req, res) => (res.sendFile(path.join( __dirname, '../view/index.html'))));
publicRouter.get('/signup', security.publicAccess, (req, res) => (res.sendFile(path.join( __dirname, '../view/index.html'))));

publicRouter.post('/login', security.auth.login, security.protectedAccess, (req, res) => (res.redirect('/home')));
publicRouter.post('/signup', security.auth.signup, security.protectedAccess, (req, res) => (res.redirect('/login')));

export default publicRouter;
