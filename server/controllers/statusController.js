const { Statuses } = require('../modules/modules');
const ApiError = require('../error/ApiError');

class StatusController {
    async create(req, res) {
        const { name, description } = req.body;
        const status = await Statuses.create({ name, description });
        return res.json(status);
    }

    async getAll(req, res) {
        const statuses = await Statuses.findAll();
        return res.json(statuses);
    }

    async getById(req, res, next) {
        const { id } = req.params;
        const status = await Statuses.findOne({ where: { id } });
        if (!status) {
            return next(ApiError.notFound('Status not found'));
        }
        return res.json(status);
    }
}

module.exports = new StatusController();