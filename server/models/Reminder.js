const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    message: { type: String, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    date: { type: Date, required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
}, { timestamps: true });

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
