const mongoose = require('mongoose');
const { Schema } = mongoose;

const mediaSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        // required: true,
    },
});

const Media = mongoose.model('Media', mediaSchema);
module.exports = Media;
