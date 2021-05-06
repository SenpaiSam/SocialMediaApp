const UsersController = require('./controllers/users.controller');
const ProjectController = require('./controllers/project.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const path = require('path');
const cookieParser = require('cookie');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/users', [
        UsersController.insert
    ]);
    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        UsersController.list
    ]);
    app.get('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ]);
    app.patch('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patchById
    ]);
    app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById
    ]);
    app.get('/login', (req, res) => {
        if (!req.cookies.token) {
            return res.status(401).send();  
        } 
        res.sendFile(path.join(__dirname+'../../public/login.html'));
    });
    app.get('/logout', (req, res)=>{
        res.clearCookie('userData');
        res.send('user logout successfully');
    });

    app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname+'../../public/ulife.html'));
        }
    );
    app.get('/profile', (req, res) => {
            res.sendFile(path.join(__dirname+'../../public/profile-settings.html'));
        }
    );

    app.post('/projects', [
        ProjectController.insert
    ]);
    app.get('/projects', [
        ProjectController.list
    ]);
    app.get('/projects/:projectId', [
        ProjectController.getById
    ]);
    app.patch('/projects/:projectId', [
        ProjectController.patchById
    ]);
    app.delete('/projects/:projectId', [
        ProjectController.removeById
    ]);

    // app.get('/profile', function (req, res) {
    //     // Prepare output in JSON format
    //     response = {
    //        first_name:req.query.first_name,
    //        last_name:req.query.last_name
    //     };
    //     console.log(response);
    //     res.end(JSON.stringify(response));
    //  });



};