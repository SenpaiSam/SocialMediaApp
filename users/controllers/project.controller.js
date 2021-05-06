const projectModel = require('../models/project.model');
// const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
// const config = require('../../common/config/env.config');

exports.insert = (req, res) => {
    projectModel.createProject(req.body)
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
    projectModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    projectModel.findById(req.params.projectId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {   
    projectModel.patchProject(req.params.projectId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.removeById = (req, res) => {
    if(req.params.projectId != req.jwt.projectId){
        projectModel.removeById(req.params.projectId)
            .then((result)=>{
                res.status(204).send({});
            });
    }
};