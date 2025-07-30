const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    subject: String,
    id: String,
    to: String,
    from: String,
    message: String,
    date: String,
    vs: String
}, {_id: false});

const UserSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true },
    name: String,
    password: String,
    emails: [EmailSchema]
});

module.exports = mongoose.model('User', UserSchema);
