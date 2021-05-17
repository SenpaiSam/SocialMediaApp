const UsersController = require('./controllers/users.controller');
const PostsController = require('./controllers/posts.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const path = require('path');
const multer = require("multer");
// const fs = require('fs')

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
    app.get('/users/searchname/:search', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        UsersController.listByName
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
    app.get('/posts/user/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PostsController.listById
    ]);
    app.get('/post/:postId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PostsController.getById
    ]);
    app.patch('/post/:postId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        PostsController.patchById
    ]);
    app.delete('/post/:postId/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        PostsController.removeById
    ]);

    // COMMENT
    app.post('/post/:postId/comment/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PostsController.createComment
    ]);
    app.delete('/post/:postId/comment/:commentId/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        PostsController.removeCommentById
    ]);

    // IMPRESSUM
    app.get('/impressum', (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/impressum.html"));
    });

    // POLICY
    app.get('/policy', (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/policy.html"));
    });

    // ABOUT
    app.get('/about', (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/about.html"));
    });

    // get Image
    app.get('/data/postimage/:imagename', (req, res) => {
        res.sendFile(path.join(__dirname, "/../postimage/", req.params.imagename));
    });

    // get Image
    // app.get('/data/userimage/:imagename', (req, res) => {
    //     let imagepath = path.join(__dirname, "/../userimages/", req.params.imagename);
    //     console.log("exist: " + imagepath)
    //     if(fs.existsSync(imagepath)) {
    //         res.sendFile(imagepath);
    //     } else {
    //         res.status(200).send();
    //     }
    // });

    // Admin Tool
    app.get('/admin', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN)
    ], (req, res) => {
        if(req.cookies['auth'] != null) {
            res.sendFile(path.join(__dirname+'/../public/admin.html'));
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

    // UNFOLLOW user 
    app.post('/user/:userId/unfollow/:followerid', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        UsersController.unfollowUser
    ]);


    // Like post 
    app.post('/post/:userId/like/:postId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PostsController.likePost
    ]);

    // Unlike post
    app.post('/post/:userId/dislike/:postId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PostsController.dislikePost
    ]);


    // User Profile ?id=
    app.get('/user', (req, res) => {
        if(req.cookies['auth'] != null) {
            res.sendFile(path.join(__dirname+'/../public/user.html'));
        } else {
            res.redirect(req.protocol + '://' + req.get('host'));
        }
    });

    app.get('/notifications', (req, res) => {
        if(req.cookies['auth'] != null) {
            res.sendFile(path.join(__dirname+'/../public/notifications.html'));
        } else {
            res.redirect(req.protocol + '://' + req.get('host') + '/login');
        }
    });


    app.get('/login', (req, res) => {
        if(req.cookies['auth'] != null) {
            res.redirect(req.protocol + '://' + req.get('host'));
        } else {
            res.sendFile(path.join(__dirname+'/../public/login.html'));
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
            res.redirect(req.protocol + '://' + req.get('host') + '/global');
            // res.sendFile(path.join(__dirname+'/../public/ulife.html'));
        } else {
            res.redirect(req.protocol + '://' + req.get('host') + '/login');
        }
    });

    app.get('/global', (req, res) => {
        if(req.cookies['auth'] != null) {
            res.sendFile(path.join(__dirname+'/../public/ulife.html'));
        } else {
            res.redirect(req.protocol + '://' + req.get('host') + '/login');
        }
    });

    app.get('/profile', (req, res) => {
        if(req.cookies['auth'] != null) {
            res.sendFile(path.join(__dirname+'/../public/profile-settings.html'));
        } else {
            res.redirect(req.protocol + '://' + req.get('host') + '/login');
        }
    });

    
    app.post('/postimageupload', upload.single("postimg"), (req, res) => {
            // console.log(req.file, req.body)
            res.status(200).send("File uploaded!");
        }
    );

    app.post('/userimageupload', upload.single("userimg"), (req, res) => {
        // console.log(req.file, req.body)
        res.status(200).send("File uploaded!");
    });
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "userimg") { 
            cb(null, `${__dirname}/../public/userimages`)
        } else if(file.fieldname === "postimg") {
            cb(null, `${__dirname}/../public/postimages`)
        }
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`)
    }
});
const upload = multer({storage});