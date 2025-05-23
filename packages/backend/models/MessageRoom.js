    const mongoose = require("mongoose");

    const MessageRoomSchema = new mongoose.Schema({
        roomId: { type: String, required: true, unique: true },
        roomType: { type: String, enum: ["private", "group"], required: true },
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        groupName: String,
        groupPhoto: String,
        messages: [
            {
                sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                content: String,
                messageType: { type: String, enum: ["text", "image", "video", "file"], default: "text" },
                createdAt: { type: Date, default: Date.now },
                seenBy: [
                    {
                        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                        seenAt: { type: Date, default: Date.now }
                    }
                ]
            }
        ],

    }, { timestamps: true });

    module.exports = mongoose.model("MessageRoom", MessageRoomSchema);
