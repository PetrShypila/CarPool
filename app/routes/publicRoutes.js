import path from 'path';
import express from 'express';
import security from '../security';

const publicRouter = express.Router();

publicRouter.get('/', security.publicAccess, (req, res) => (res.sendFile(path.join( __dirname, '../view/index.html'))));
publicRouter.get('/login', security.publicAccess, (req, res) => (res.sendFile(path.join( __dirname, '../view/index.html'))));
publicRouter.get('/signup', security.publicAccess, (req, res) => (res.sendFile(path.join( __dirname, '../view/index.html'))));

publicRouter.get('/favicon.ico', security.publicAccess);
publicRouter.post('/login', security.publicAccess, security.auth.login);
publicRouter.post('/signup', security.publicAccess, security.auth.signup);

export default publicRouter;
