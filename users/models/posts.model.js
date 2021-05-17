const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId;

const postSchema = new Schema({
    postById: String,
    postTime: Date,
    repost: Boolean,
    // repostByProfileName: String,
    // repostContent: String,
    repostPostId: String,
    postContent: String,
    postImage: Boolean,
    postLikes: Array,
    // postReposts: Array,
    postComments: Array,
});

postSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
postSchema.set('toJSON', {
    virtuals: true
});

postSchema.findById = function (cb) {
    return this.model('Posts').find({id: this.id}, cb);
};

const Post = mongoose.model('Posts', postSchema);


exports.findByCreatorId = (id) => {
    return Post.find({postById: id});
};

exports.findById = (id) => {
    // if(!mongoose.Types.ObjectId.isValid(id)) {
    //     console.log("id not valid");return;
    // }

    return new Promise((resolve, reject) => {
        Post.findById(id)
        .then((result) => {
            if(result == null || result == undefined)
            {
                reject(result);
            } else { 
                result = result.toJSON();
                // delete result._id;
                delete result.__v;
                resolve(result);
            }
        });
    });
};

exports.createPost = (postData) => {
    const user = new Post(postData);
    return user.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Post.find().sort({'_id': -1})
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, posts) {
                if (err) {
                    reject(err);
                } else {
                    resolve(posts);
                }
            })
    });
};

exports.listById = (perPage, page, userId) => {
    return new Promise((resolve, reject) => {
        Post.find({postById: userId}).sort({'_id': -1})
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, posts) {
                if (err) {
                    reject(err);
                } else {
                    resolve(posts);
                }
            })
    });
};

exports.patchPost = (id, postData) => {
    return Post.findOneAndUpdate({
        _id: id
    }, postData);
};

exports.removeById = (postId) => {
    return new Promise((resolve, reject) => {
        Post.deleteMany({_id: postId}, (err) => {
            if (err) {
                reject(err);
            } else {
                Post.deleteMany({repostPostId: postId,postContent: null}, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(err);
                    }
                });
                resolve(err);
            }
        });
    });
};

exports.addlikePost = (id, postid) => {
    // return Promise.all([Post.findOneAndUpdate({
    //     _id: postid
    // }, {$push: {postLikes: {id}}}),
    // User.findOneAndUpdate({
    //     _id: id //Get Post Creator
    // }, {$push: {notifications: {userid: id, action: 'like',postid: postid, message: null, timestamp: new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/London"}))}}})]
    // );
    return Post.findOneAndUpdate({
        _id: postid
    }, {$push: {postLikes: id}});
};

exports.removelikePost = (id, postid) => {
    return Post.findOneAndUpdate({
        _id: postid
    }, {$pull: {postLikes: id}});
};

exports.createComment = (content, postid) => {
    return Post.findOneAndUpdate({
        _id: postid
    }, {$push: {postComments: content}});
};

exports.removeComment = (postId, commentId) => {
    return Post.findOneAndUpdate({
        _id: postId
    }, {$pull: {postComments: {_id: new ObjectId(commentId)}}});
};