const Feedback = require('../models/feedbackModel');


exports.saveFeedbackController = async (req, res) => {
    const { username, email, message } = req.body;

    try {
        const newFeedback = new Feedback({
            username,
            email,
            message
        });

        await newFeedback.save();

        res.status(201).json({ message: 'Feedback saved successfully' });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ error: 'Failed to save feedback' });
    }
};
