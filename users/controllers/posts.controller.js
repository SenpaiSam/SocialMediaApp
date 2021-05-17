const PostModel = require('../models/posts.model');
// const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
// const config = require('../../common/config/env.config');
const crypto = require('crypto');
const mongoose = require('mongoose');

exports.insert = (req, res) => {
    req.body.postTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/London"}));
    req.body.postReposts = 0;

    PostModel.createPost(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
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

    PostModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.listById = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }

    PostModel.listById(limit, page, req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getById = (req, res) => {
    PostModel.findById(req.params.postId)
        .then((result) => {
            res.status(200).send(result);
        }).catch(() => {res.status(204).send();});//400
};

// exports.getByIddeleteNull = (req, res) => {
//     PostModel.findById(req.params.postId)
//         .then((result) => {
//             res.status(200).send(result);
//         }).catch(() => {
//             res.status(200).send();//400
//         });
// };

exports.patchById = (req, res) => {
    PostModel.patchUser(req.params.postId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};
exports.removeById = (req, res) => {
    if(req.params.userId == req.jwt.userId){
        PostModel.removeById(req.params.postId)
            .then((result)=>{
                res.status(204).send({});
            });
    }
};

exports.likePost = (req, res) => {
    new Promise((resolve, reject) => {
        PostModel.findById(req.params.postId)
        .then((result) => {
            for (let index = 0; index < result.postLikes.length; index++) {
                if(result.postLikes[index] == req.params.userId) {
                    return reject();
                }
            }
            resolve();
        })
    }).then(() => {
        PostModel.addlikePost(req.params.userId, req.params.postId)
        .then(() => {
            res.status(200).send({});
        });}
    ).catch(() => {
        res.status(304).send({});
    });
}

exports.dislikePost = (req, res) => {
    new Promise((resolve, reject) => {
        PostModel.findById(req.params.postId)
        .then((result) => {
            for (let index = 0; index < result.postLikes.length; index++) {
                if(result.postLikes[index] == req.params.userId) {
                    resolve();
                }
            }
            reject();
        })
    }).then(() => {
        PostModel.removelikePost(req.params.userId, req.params.postId)
        .then(() => {
            res.status(200).send({});
        });}
    ).catch(() => {
        res.status(304).send({});
    });
}

exports.createComment = (req, res) => {
    req.body._id = mongoose.Types.ObjectId();
    req.body.commentTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/London"}));
    req.body.userid = req.params.userId;
    req.body.commentinpostid = req.params.postId;

    PostModel.createComment(req.body, req.params.postId)
        .then((result) => {
            res.status(201).send({id: result._id});
    });
};

exports.removeCommentById = (req, res) => {
    if(req.params.userId == req.jwt.userId) {
        PostModel.removeComment(req.params.postId, req.params.commentId)
            .then((result)=>{
                res.status(204).send();
            });
    }
};