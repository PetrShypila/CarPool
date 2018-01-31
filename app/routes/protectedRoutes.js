import path from 'path';
import express from 'express';

import MarkersService from '../actions/services/markersService';
import UsersService from '../actions/services/usersService';
import security from '../security';

const protectedRouter = express.Router();

protectedRouter.get('/logout', security.protectedAccess, security.auth.logout);
protectedRouter.get('/profile', security.protectedAccess, (req, res) => (res.sendFile(path.join( __dirname, '../view/index.html'))));
protectedRouter.get('/home', security.protectedAccess, (req, res) => (res.sendFile(path.join( __dirname, '../view/index.html'))));

protectedRouter.get('/api/v1/activeUser', security.protectedAccess, (req, res) => (res.json(req.session.user)));
protectedRouter.get('/api/v1/users', security.protectedAccess, UsersService.getAllUsers);

protectedRouter.get('/api/v1/markers', security.protectedAccess, MarkersService.getMarkers);
protectedRouter.post('/api/v1/updateUserMarkers', security.protectedAccess, MarkersService.updateUserMarkers);

export default protectedRouter;
