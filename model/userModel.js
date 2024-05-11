const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    earnings: {
        type: Number,
        default: 0
    }
})

const user = mongoose.model("Users",UserSchema)

module.exports = user