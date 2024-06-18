const mongoose = require('mongoose');

const refereeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the User model
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    experienceYears: { type: Number, default: 0 },
    matchesOfficiated: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    comments: [{ comment: String, commenter: mongoose.Schema.Types.ObjectId }],
    contact: {
        email: { type: String },
        phone: { type: String },
        address: { type: String }
    }
}, { timestamps: true });

const Referee = mongoose.model('Referee', refereeSchema);

module.exports = Referee;
