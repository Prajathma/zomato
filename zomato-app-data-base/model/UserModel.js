// import mongoose
const mongoose = require('mongoose');


// create mongoose
const UserSchema = new mongoose.Schema({
    id: { type: Number },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    gender: { type: String },
    address: { type: String },
    mobile: { type: Number },
    password: { type: String },
});

// create a model

const UserModel = mongoose.model('user', UserSchema, 'users'); // name  , schema , collectionName

module.exports = UserModel;