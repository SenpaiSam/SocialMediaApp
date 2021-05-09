const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postById: String,
    postTime: Date,
    repost: Boolean,
    // repostByProfileName: String,
    // repostContent: String,
    repostPostId: String,
    postContent: String,
    postImage: String,
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
        Post.find()
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
                resolve(err);
            }
        });
    });
};