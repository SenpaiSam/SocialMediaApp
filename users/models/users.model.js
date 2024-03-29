const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    profileName: String,
    email: String,
    password: String,
    // userImage: String,
    phone: Number,
    permissionLevel: Number,
    verified: Boolean,
    registerDate: Date,
    birthday: Date,
    bio: String,
    location: String,
    website: String,
    follower: Array,
    follow: Array,
    notifications: Array
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('Users').find({id: this.id}, cb);
};

const User = mongoose.model('Users', userSchema);


exports.findByEmail = (email) => {
    return User.find({email: email});
};

exports.findById = (id) => {
    // if(!mongoose.Types.ObjectId.isValid(id)) {
    //     console.log("id not valid");return;
    // }
    return User.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.password;
            delete result.__v;
            return result;
        });
};

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    delete users.password;
                    resolve(users);
                }
            })
    });
};

exports.patchUser = (id, userData) => {
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

exports.listByName = (search) => {
    let data = [];
    return User.find({$or: [{userName: { $regex: String(search) , $options: "i" }},{profileName: { $regex: String(search) , $options: "i" }}]}) //, profileName: { $regex: String(search) , $options: "i" }
        .then((result) => {
            if(result != null || result != undefined) {
                for (let index = 0; index < result.length; index++) {
                    data.push({"_id": String(result[index]._id), "userName": result[index].userName, "profileName": result[index].profileName});   
                }
                return data;
            }
        }) // https://docs.mongodb.com/manual/reference/operator/query/regex/
};

exports.checkEmailAvailable = (emailtocheck) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: `${emailtocheck}` }, (err, result) => {
            if(result == null) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.checkNameAvailable = (nametocheck) => {
    return new Promise((resolve, reject) => {
        User.findOne({ name: `${nametocheck}` }, (err, result) => {
            if(result == null) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.addfollowUser = (id, followerid) => {
    return Promise.all([User.findOneAndUpdate({
        _id: id
    }, {$push: {follow: followerid}}),
    User.findOneAndUpdate({
        _id: followerid
    }, {$push: {follower: id, notifications: {userid: id, action: 'like', message: null, timestamp: new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/London"}))}}})]);
};

exports.removefollowUser = (id, followerid) => {
    return Promise.all([User.findOneAndUpdate({
        _id: id
    }, {$pull: {follow: followerid}}),
    User.findOneAndUpdate({
        _id: followerid
    }, {$pull: {follower: id}})]);
};