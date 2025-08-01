const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: false },
    password: { type: String, required: false },
    profileImage: { type: String, default: null },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
    friendRequests: [
        {
            friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            direction: { type: String, enum: ['sent', 'received'] }
        }
    ],

    // 👇 Bunlar Google kullanıcıları için eklendi
    googleId: { type: String, default: null },
    authType: { type: String, enum: ['local', 'google'], default: 'local' },

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
