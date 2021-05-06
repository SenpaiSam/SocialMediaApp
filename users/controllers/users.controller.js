const UserModel = require('../models/users.model');
// const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
// const config = require('../../common/config/env.config');
const crypto = require('crypto');

exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    req.body.phone = 0;
    req.body.registerDate = 0;
    req.body.birthday = 0;
    req.body.bio = '';
    req.body.location = '';
    req.body.website = '';

    UserModel.checkEmailAvailable(req.body.email)
        .then(() => {
            res.status(406).send({email: "not available"});
        }).catch(() => {
            // res.status(201).send({account: "created"}); 
            UserModel.createUser(req.body)
                .then((result) => {
                    res.status(201).send({id: result._id});
                });
    });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }
    // console.log("Permission changed!");
    if (req.body.permissionLevel) {
        console.log("Permission changed!");
        // if(PermissionMiddleware.minimumPermissionLevelRequired(config.permissionLevels.ADMIN)){
        //     console.log("kein Admin!");
        //     res.status(403).send({permission: "no permission (admin needed)"});
        //     return;
        // }
    }
    // console.log(req.body);
    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.removeById = (req, res) => {
    if(req.params.userId != req.jwt.userId){
        UserModel.removeById(req.params.userId)
            .then((result)=>{
                res.status(204).send({});
            });
    }
};