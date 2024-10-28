const { Feedback } = require('../modules/tables/feedback');
const ApiError = require('../error/ApiError.js');

class FeedbackController {
    async create(req, res) {
        const { rating, text } = req.body;
        const feedback = await Feedback.create({ rating, text });
        return res.json(feedback);
    }

    async getAll(req, res) {
        const feedbacks = await Feedback.findAll();
        return res.json(feedbacks);
    }

    async getById(req, res, next) {
        const { id } = req.params;
        const feedback = await Feedback.findOne({ where: { id } });
        if (!feedback) {
            return next(ApiError.notFound('Feedback not found'));
        }
        return res.json(feedback);
    }
}

module.exports = new FeedbackController();
