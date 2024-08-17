const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    media: [{
        type: Schema.Types.ObjectId,
        ref: 'Media',
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    shares: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
