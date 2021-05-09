const UsersController = require('./controllers/users.controller');
const PostsController = require('./controllers/posts.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const path = require('path');
const { nextTick } = require('process');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/users', [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(PAID),
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


    // Get Posts
    app.post('/post/:userid', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PostsController.insert
    ]);
    app.get('/posts', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PostsController.list
    ]);
    app.get('/post/:postId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PostsController.getByIddeleteNull
    ]);
    app.patch('/post/:postId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        PostsController.patchById
    ]);
    app.delete('/post/:postId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        PostsController.removeById
    ]);

    // Admin Tool
    app.get('/admin', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
    ], (req, res) => {
        if(req.cookies['auth'] != null) {
            res.sendFile(path.join(__dirname+'../../public/admin.html'));
        } else {
            res.redirect(req.protocol + '://' + req.get('host') + '/login');
        }
    });

    // PUBLIC user data
    app.get('/users/public/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        UsersController.getByIdUserData
    ]);

    // FOLLOW user 
    app.post('/user/:userId/follow/:followerid', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        UsersController.followUser
    ]);

    // User Profile ?id=
    app.get('/user', (req, res) => {
        if(req.cookies['auth'] != null) {
            res.sendFile(path.join(__dirname+'../../public/user.html'));
        } else {
            res.redirect(req.protocol + '://' + req.get('host'));
        }
    });

    app.get('/notifications', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE)
    ], (req, res) => {
        if(req.cookies['auth'] != null) {
            res.sendFile(path.join(__dirname+'../../public/notifications.html'));
        } else {
            res.redirect(req.protocol + '://' + req.get('host') + '/login');
        }
    });


    app.get('/login', (req, res) => {
        if(req.cookies['auth'] != null) {
            res.redirect(req.protocol + '://' + req.get('host'));
        } else {
            res.sendFile(path.join(__dirname+'../../public/login.html'));
        }
    });

    app.get('/logout', (req, res)=> {
        if(req.cookies['auth'] != null) {
            res.clearCookie('auth');
            res.clearCookie('userid');
            res.redirect(req.protocol + '://' + req.get('host') + '/login');
        } else {
            res.redirect(req.protocol + '://' + req.get('host') + '/login');
        }
    });

    app.get('/', (req, res) => {
        if(req.cookies['auth'] != null) {
            res.sendFile(path.join(__dirname+'../../public/ulife.html'));
        } else {
            res.redirect(req.protocol + '://' + req.get('host') + '/login');
        }
    });

    app.get('/profile', (req, res) => {
        if(req.cookies['auth'] != null) {
            res.sendFile(path.join(__dirname+'../../public/profile-settings.html'));
        } else {
            // console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
            res.redirect(req.protocol + '://' + req.get('host') + '/login');
        }
    });
};