const jwtSecret = require('../../common/config/env.config.js').jwt_secret,
    jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uuid = require('uuid');
const cookie = require('cookie');
const UsersController = require('../../users/controllers/users.controller');

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');
        res.setHeader('Set-Cookie', cookie.serialize('auth_Token', {accessToken: token, refreshToken: refresh_token}));
        // res.status(201).send({accessToken: token, refreshToken: refresh_token});
        res.writeHead(200, {
            "Set-Cookie": `token=${token}; HttpOnly`,
            "Access-Control-Allow-Credentials": "true"
        }).send();
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

exports.refresh_token = (req, res) => {
    try {
        req.body = req.jwt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(201).send({id: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};
