import path from 'path';
import express from 'express';

import MarkerService from '../actions/services/markerService';
import UserService from '../actions/services/userService';
import ConnectionService from '../actions/services/connectionService';
import security from '../security';

const protectedRouter = express.Router();

protectedRouter.get('/logout', security.protectedAccess, security.auth.logout);
protectedRouter.get('/profile', security.protectedAccess, (req, res) => (res.sendFile(path.join( __dirname, '../view/index.html'))));
protectedRouter.get('/home', security.protectedAccess, (req, res) => (res.sendFile(path.join( __dirname, '../view/index.html'))));

protectedRouter.put('/api/v1/updateProfile', security.protectedAccess, UserService.updateUser, MarkerService.updateUserMarkers);
protectedRouter.get('/api/v1/activeUser', security.protectedAccess, (req, res) => (res.json(req.session.user)));
protectedRouter.get('/api/v1/users', security.protectedAccess, UserService.getAllUsers);

protectedRouter.get('/api/v1/markers', security.protectedAccess, MarkerService.getMarkers);
protectedRouter.post('/api/v1/updateUserMarkers', security.protectedAccess, MarkerService.updateUserMarkers);

protectedRouter.post('/api/v1/createConnection', security.protectedAccess, ConnectionService.createConnection);
protectedRouter.get('/api/v1/connections', security.protectedAccess, ConnectionService.getConnections);

export default protectedRouter;
