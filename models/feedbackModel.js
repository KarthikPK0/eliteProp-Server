const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
