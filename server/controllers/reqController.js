const { Requests } = require('../modules/modules');
const ApiError = require('../error/ApiError');

class RequestController {
    async create(req, res) {
        const { feedback_id, discount_id, service_id, status_id, start_time, end_time, price, client_id } = req.body;
        const request = await Requests.create({
            feedback_id, discount_id, service_id, status_id, start_time, end_time, price, client_id
        });
        return res.json(request);
    }

    async getAll(req, res) {
        const requests = await Requests.findAll();
        return res.json(requests);
    }

    async getById(req, res, next) {
        const { id } = req.params;
        const request = await Requests.findOne({ where: { id } });
        if (!request) {
            return next(ApiError.notFound('Request not found'));
        }
        return res.json(request);
    }
}

module.exports = new RequestController();