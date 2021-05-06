const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const postSchema = new Schema({
    createdbyuserid: Number,
    creationtimestamp: Date,
    content: String,
    image: String,
    likes: String,
    reposts: String,
    comments: String
});


postSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
postSchema.set('toJSON', {
    virtuals: true
});

postSchema.findById = function (cb) {
    return this.model('posts').find({id: this.id}, cb);
};

const posts = mongoose.model('posts', postSchema);


exports.findByName = (name) => {
    return posts.find({name: name});
};
exports.findById = (id) => {
    return posts.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createProject = (projectData) => {
    const project = new posts(projectData);
    return project.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        posts.find()
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

exports.patchProject = (id, projectData) => {
    return posts.findOneAndUpdate({
        _id: id
    }, projectData);
};

exports.removeById = (projectId) => {
    return new Promise((resolve, reject) => {
        posts.deleteMany({_id: projectId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

